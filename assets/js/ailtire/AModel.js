/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AAction, AAttribute, AStateNet, AText, AObject, ASelectedHUD} from './index.js';

export default class AModel {
    static scolor = {
        started: "#aaffff",
        create: "#aaffff",
        completed: "#aaffaa",
        failed: "#ffaaaa",
        enabled: "#aaffaa",
        disable: "#aaaaaa",
        rejected: "#ffaaaa",
        accepted: "#aaffff",
        update: "#aaffff",
        needed: "#ffbb44",
        selected: "#aaffaa",
        evaluated: "#ffffaa",
    };
    static default = {
        fontSize: 20,
        height: 150,
        width: 100,
        depth: 20
    }

    constructor(config) {
        this.config = config;
        // AModel.createEdit(config);
        // AModel.createList(config);
        // AModel.createDetail(config);
    }

    static popup(myForm) {
        $().w2popup('open', {
            title: 'Edit',
            body: '<div id="editModelDialog" style="width: 100%; height: 100%;"></div>',
            style: 'padding: 15px 0px 0px 0px',
            width: 600,
            height: 800,
            showMax: true,
            onToggle: function (event) {
                $(w2ui.editModelDialog.box).hide();
                event.onComplete = function () {
                    $(w2ui.editModelDialog.box).show();
                    w2ui.editModelDialog.resize();
                }
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                    $('#editModelDialog').w2render(myForm.name);
                }
            }
        });
    }

    static calculateBox(node) {
        let width = Math.max(node.name.length * AModel.default.fontSize / 2, AModel.default.width);
        let height = AModel.default.height;
        let depth = AModel.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: depth, r: radius};
    }

    static view3D(node, type) {
        let color = node.color || "#00bbaa";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let size = AModel.calculateBox(node);
        let w = size.w;
        let h = size.h;
        let d = size.d;
        if (node.cube) {
            w = node.cube.x;
            h = node.cube.y;
            d = node.cube.z;
        }
        let opacity = node.opacity || 1;

        let geometry = new THREE.BoxGeometry(w, h, d);

        //const material = new THREE.MeshLambertMaterial({color: color, opacity: 1});
        const material = new THREE.MeshPhysicalMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            depthTest: true,
            depthWrite: true,
            alphaTest: 0,
            reflectivity: 0.2,
            thickness: 6,
            metalness: 0,
            side: THREE.DoubleSide
        });

        const retval = new THREE.Mesh(geometry, material);
        retval.aid = node.id;
        // Find the Model Element and show it here.
        let objID = "#" + node.name + '3D';
        let aframeobj = document.querySelector(objID);
        if (!aframeobj) {
            aframeobj = document.querySelector('#default3D');
        }
        let obj3D = aframeobj.object3D.clone();
        // Make the obj3D larger based on the size of the width and height.
        obj3D.applyMatrix4(new THREE.Matrix4().makeScale(w / 100, w / 100, w / 100));
        obj3D.position.set(0, 0, (d / 2) + 10);
        retval.add(obj3D);
        if (node.rotate) {
            if (node.rotate.x) {
                retval.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if (node.rotate.y) {
                retval.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if (node.rotate.z) {
                retval.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        let label = AText.view3D({text: node.name, color: "#ffffff", width: w, size: AModel.default.fontSize});
        // label.applyMatrix4(new THREE.Matrix4().makeScale(w/100, w/100, w/100));
        label.position.set(0, (h / 2) - AModel.default.fontSize, (d / 2) + 2);
        retval.add(label)
        node.box = node.box || size.r;
        node.expandLink = `model/get?id=${node.id}`;
        node.expandView = AModel.handle;
        node.getDetail = AModel.getDetail;
        return retval;
    }

    static viewDeep3D(cls, mode) {
        let data = {nodes: {}, links: []};
        let size = AModel.calculateDeepBox(cls);

        const theta = Math.PI / 2;
        let model3d = {x: size.w, y: size.h, z: size.d};
        let bbox = {
            parent: cls.id,
            x: {min: -model3d.x / 2 + 20, max: model3d.x / 2 - 20},
            y: {min: -model3d.y / 2 + 20, max: model3d.y / 2 - 20},
            z: {min: -model3d.z / 2 + 20, max: model3d.z / 2 - 20},
        }

        data.nodes[cls.id] = {
            id: cls.id,
            name: cls.name,
            cube: model3d,
            description: cls.description,
            opacity: 0.5,
            fx: 0,
            fy: 0,
            fz: 0,
            box: 0.1, // Prevents contention with the collide force.
            view: AModel.view3D,
            expandView: AModel.handle,
            expandLink: `model/get?id=${cls.id}`
        };

        let anodes = [];
        for (let aname in cls._associations) {
            let assoc = cls._associations[aname];
            let clsid = assoc.type;
            if (!data.nodes.hasOwnProperty(clsid)) {
                data.nodes[clsid] = {
                    id: clsid,
                    name: clsid,
                    view: AModel.view3D,
                    expandView: AModel.handle,
                    expandLink: `model/get?id=${clsid}`,
                    rbox: {
                        parent: cls.id,
                        fx: -size.w / 2 - 20,
                        y: {min: -size.h / 2, max: size.h / 2},
                        z: {min: -size.d / 2, max: size.d / 2}
                    },
                    rotate: {y: -theta}
                };
            }
            data.nodes[`Assoc${clsid}`] = {
                id: `Assoc${clsid}`,
                name: `${aname} : ${assoc.type}`,
                view: AAttribute.view3D,
                color: 'magenta',
                rotate: {x: -theta},
                orientation: {x: 0, y: 1, z: 0}
            };
            anodes.push(data.nodes[`Assoc${clsid}`]);
            if (clsid !== cls.id) {
                data.links.push({target: clsid, source: `Assoc${clsid}`, width: 3.0, value: 10, color: '#ff00ff'});
            }
        }

        for (let aname in cls._attributes) {
            let attr = cls._attributes[aname];
            let clsid = cls.id + aname
            data.nodes[clsid] = {
                id: clsid, name: `${aname} : ${attr.type}`, view: AAttribute.view3D, rotate: {x: -theta}, box: 1,
                orientation: {x: 0, y: 1, z: 0}
            };
            anodes.push(data.nodes[clsid]);
        }

        layoutRowColumn(data.nodes[cls.id], anodes, size.attributes, "top");

        let mnodes = [];
        for (let mname in cls.methods) {
            data.nodes[`${cls.id}-${mname}`] = {
                id: `${cls.id}-${mname}`,
                name: mname,
                view: AAction.view3D,
                box: 1,
                rotate: {x: -theta, z: -theta, y: theta},
                orientation: {x: 1, y: 0, z: 0}
            };
            mnodes.push(data.nodes[`${cls.id}-${mname}`]);
        }
        layoutRowColumn(data.nodes[cls.id], mnodes, size.methods, "right");

        // These nodes must be added first. Before the state net.
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        // State Net it if exists.
        if (cls.statenet) {
            let config = {
                id: cls.id, ibox: {
                    parent: cls.id,
                    fx: bbox.x.max - 5,
                    fy: bbox.y.min - 20,
                    fz: bbox.z.max - 5,
                },
                rbox: {
                    parent: cls.id,
                    x: {min: bbox.x.min + 10, max: bbox.x.max - 10},
                    fy: bbox.y.min - 40,
                    z: {min: bbox.z.min + 5, max: bbox.z.max - 5}
                }, rotate: {x: theta}, mode: 'add'
            };
            AStateNet.handle(cls.statenet, config);
        }

        window.graph.graph.cameraPosition({x: 0, y: 0, z: size.d * 2}, // new position
            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
            3000  // ms transition duration.
        );
        window.graph.showLinks();

        window.graph.toolbar.setToolBar([
            {
                type: 'button', id: 'fit', text: 'Show All', img: 'w2ui-icon-zoom',
                onClick: (event) => {
                    window.graph.graph.zoomToFit(1000);
                }
            },
            {
                type: 'button', id: 'states', text: 'States', img: 'w2ui-icon-search', onClick: (event) => {
                    window.graph.graph.cameraPosition({x: 0, y: 0, z: size.d * 2}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000);
                    setTimeout(() => {
                        window.graph.graph.cameraPosition({x: 0, y: -size.h * 2, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000);
                    }, 500);
                    setTimeout(() => {
                        window.graph.graph.zoomToFit(1000)
                    }, 1500);
                }
            }, {
                type: 'button', id: 'attributes', text: 'Attributes', img: 'w2ui-icon-search', onClick: (event) => {
                    window.graph.graph.cameraPosition({x: 0, y: 0, z: size.d * 2}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000);
                    setTimeout(() => {
                        window.graph.graph.cameraPosition({x: 0, y: size.h * 2, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000);
                    }, 500);
                    setTimeout(() => {
                        window.graph.graph.zoomToFit(1000)
                    }, 1500);
                }
            }, {
                type: 'button', id: 'methods', text: 'Method', img: 'w2ui-icon-search', onClick: (event) => {
                    window.graph.graph.cameraPosition({x: 0, y: 0, z: size.d * 2}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000);
                    setTimeout(() => {
                        window.graph.graph.cameraPosition({x: size.w * 2, y: 0, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000);
                    }, 500);
                    setTimeout(() => {
                        window.graph.graph.zoomToFit(1000)
                    }, 1500);
                }
            }, {
                type: 'button',
                id: 'associations',
                text: 'Associations',
                img: 'w2ui-icon-search',
                onClick: (event) => {
                    window.graph.graph.cameraPosition({x: 0, y: 0, z: size.d * 2}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000);
                    setTimeout(() => {
                        window.graph.graph.cameraPosition({x: -size.w * 2, y: size.h * 1.25, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000);
                    }, 500);
                    setTimeout(() => {
                        window.graph.graph.zoomToFit(1000)
                    }, 1500);
                }
            }
        ]);
    }

    static objectList(result) {
        let myForm = AObject.viewList(result);
        // Preload the detail with all of the model information.
        AModel.createDetail(result);

        AModel.processObjectsForGraph(result, 'new');
    }

    static expandObject(link) {
        $.ajax({
            url: link, success: AModel.getDetail
        });
    }

    static viewEdit(result) {
        let form = AModel.createEdit(result);
        form.clear();
        if (result.record) {
            form.record = {};
            for (let name in result.record) {
                let field = result.record[name];
                if (field.hasOwnProperty('id')) {
                    // This is for association cardinality 1.
                    form.record[name] = result.record[name];
                } else if (field.hasOwnProperty('name')) {
                    // This is for attributes.
                    form.record[name] = result.record[name].name;
                } else if (result.record[name].values) {
                    // This is for associations.
                    form.record[name] = result.record[name].values;
                } else {
                    // Catch everything else
                    form.record[name] = field;
                }
            }
        }
        // form.refresh();
        return form;
    }

    static viewDetail(model, records) {
        let myForm = AModel.createDetail(model);
        $('#objdetail').w2render(myForm.name);
        myForm.clear();
        myForm.model = model.name;
        myForm.oid = model.id;
        myForm.add(records);
        myForm.refresh();
    }

    static createEdit(model) {
        let modelName = model.name || 'Model';
        if (!w2ui[model.name + 'Edit']) {
            let fields = [];
            for (let cname in model.columns) {
                let col = model.columns[cname];
                if (col.cardinality) {
                    // this should be getting the list from the server side.
                    if (col.cardinality === 1) {
                        fields.push({
                            field: cname.toLowerCase(), type: 'enum', options: {
                                openOnFocus: true,
                                max: 1,
                                url: `${col.type.toLowerCase()}/list?mode=json`,
                                renderItem: (item) => {
                                    if (item.name.name) {
                                        return item.name.name;
                                    } else {
                                        return item.name;
                                    }
                                },
                                renderDrop: (item) => {
                                    if (item.name.name) {
                                        return item.name.name;
                                    } else {
                                        return item.name;
                                    }
                                },
                                onNew: (event) => {
                                    console.log("++ New Item to be added:", event);
                                    $.extend(event.item, event.item);
                                },
                                compare: function (item, search) {
                                    let re1 = new RegExp(search, 'i');
                                    if (re1.test(item.id)) {
                                        return true;
                                    } else {
                                        return re1.test(item.name.name);
                                    }
                                },
                            }, html: {text: col.name, attr: 'style="width:375px"'}
                        });
                    } else {
                        fields.push({
                            field: cname.toLowerCase(), type: 'enum', options: {
                                url: `${col.type.toLowerCase()}/list?mode=json`, renderItem: (item) => {
                                    if (item.name.name) {
                                        return item.name.name;
                                    } else {
                                        return item.name;
                                    }
                                }, renderDrop: (item) => {
                                    if (item.name.name) {
                                        return item.name.name;
                                    } else {
                                        return item.name;
                                    }
                                }, onNew: (event) => {
                                    $.extend(event.item, {name: {name: event.item.text}});
                                    // Add the item on the server side.
                                }, compare: function (item, search) {
                                    let re1 = new RegExp(search, 'i');
                                    if (re1.test(item.id)) {
                                        return true;
                                    } else {
                                        return re1.test(item.name.name);
                                    }
                                }, openOnFocus: true,
                            }, html: {text: col.name, attr: 'style="width:375px"'}
                        });
                    }
                } else {
                    if (!col.multiline) {
                        let limit = col.limit || 100;
                        fields.push({
                            field: cname.toLowerCase(),
                            limit: limit,
                            type: 'text',
                            required: true,
                            html: {text: col.name, attr: `size="${limit}" style="width:375px"`}
                        });
                    } else {
                        let limit = col.limit || 100;
                        fields.push({
                            field: cname.toLowerCase(),
                            type: 'textarea',
                            required: true,
                            html: {text: col.name, attr: `size="${limit}" style="width:375px; height:150px"`}
                        });
                    }
                }
            }
            $().w2form({
                name: model.name + 'Edit',
                modelType: model.name,
                style: 'border: 0px; background-color: transparent;',
                fields: fields,
                actions: {
                    Save: function () {
                        this.validate();
                        // Create the model.
                        let url = `${this.modelType}/create`;
                        $.ajax({
                            url: url, data: this.record, success: function (results) {
                                console.log(results);
                                // $(w2ui.editModelDialog.box).hide();
                                w2popup.close();
                            }, failure: function (results) {
                                console.error(results);
                            }
                        });
                    }, Reset: function () {
                        this.clear();
                    }, custom: {
                        text: "Cancel", style: 'background: pink;', onClick(event) {
                            w2popup.close();
                        }
                    }
                }
            });
        }
        return w2ui[model.name + 'Edit'];
    }

    static createInfo(results) {
        if (!results.columns) {
            results.columns = []
        }
        let i = 0;
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, label: "Value", sortable: true},
        ];
        let retForm = w2ui['objlist'];
        retForm.modelName = results.name;
        retForm.columns = cols;
        w2ui['objdetail'].clear();
        retForm.onClick = function (event) {
            // this.showDetail(event);
            let record = this.get(event.recid);
            w2ui['objdetail'].header = `${record.name} Details`;
            w2ui['objdetail'].show.columnHeaders = true;
            w2ui['objdetail'].clear();
            let drecords = [];
            let k = 0;
            let values = record.detail.split('|');
            for (let i in values) {

                let [id, name, value] = values[i].split('^');
                if (!name) {
                    value = name;
                    name = record.name;
                }
                k++;
                drecords.push({recid: k, name: name, value: value, id:id});
            }
            w2ui['objdetail'].add(drecords);
            window.graph.selectNodeByID(event.recid);
        };
        w2ui['objdetail'].onClick = (event) => {
            let records = w2ui['objdetail'].records;
            let record = undefined;
            for(let i in records)  {
                let rec = records[i];
                if(`${rec.recid}` === `${event.recid}`) {
                    record = records[i];
                    break;
                }
            }
            window.graph.selectNodeByID(record.id, true);
        };

        retForm.refresh();
        return retForm
    }

    static createDetail(results) {
        let modelName = results.name + 'Detail';
        if (w2ui[modelName]) {
            return w2ui[modelName];
        }

        // Find out the class methods that are object method and put them here.
        // Add any of the methods in the results as actions in the toolbar.
        let toolbar = {
            items: [], tooltip: 'top', onClick: (event) => {
                console.log(event.item.link);
                console.log(event.item.inputs);
                // Pass the object selected in the list from the detail grid into the methodForm
                let parentForm = w2ui[event.item.parentFormName];
                event.item.model = parentForm.model;
                event.item.oid = parentForm.oid;
                let launchMethod = AModel.viewMethodForm(event.item);
                AModel.popup(launchMethod);
            }
        };
        for (let fname in results.methods) {
            let method = results.methods[fname];
            toolbar.items.push({
                type: 'button',
                id: fname,
                tooltip: method.description,
                text: method.name,
                inputs: method.inputs,
                link: method.link,
                parentFormName: modelName
            });
        }

        $().w2grid({
            name: modelName,
            header: results.name + ' Details',
            toolbar: toolbar,
            show: {header: true, toolbar: true, columnHeaders: false},
            columns: [{
                field: 'name',
                text: 'Name',
                size: '100px',
                style: 'background-color: #efefef; border-bottom: 1px solid white; padding-right: 5px;',
                attr: "align=right"
            }, {
                field: 'value', text: 'Value', size: '100%', render: function (record) {
                    return '<div>' + record.value + '</div>';
                }
            }]
        });
        return w2ui[modelName];
    }

    static viewMethodForm(method) {
        let form = AModel.createMethodForm(method);
        form.clear();
        form.oid = method.oid;
        form.model = method.model;
        form.record[method.model.toLowerCase()] = method.oid;
        form[method.model.toLowerCase()] = method.oid;
        form.refresh();
        return form;
    };

    static showList(panel, parent) {
        $.ajax({
            url: 'model/list', success: function (results) {
                let modelList = [];
                let mnames = Object.keys(results).sort();
                for (let i in mnames) {
                    let mname = mnames[i];
                    let model = results[mname];
                    let mItem = {
                        id: mname.toLowerCase(),
                        text: model.name,
                        img: 'icon-page',
                        link: `${mname}/list`,
                        count: model.count,
                        view: 'model'
                    };
                    modelList.push(mItem);
                }
                w2ui[panel].add(parent, modelList);
            }
        });
    }

    static createMethodForm(result) {
        let formName = `${result.link.replace(/\//g, '')}LaunchForm`;
        if (!w2ui[formName]) {
            let fields = [];
            for (let cname in result.inputs) {
                let col = result.inputs[cname];
                if (col.type === 'ref') {
                    // this should be getting the list from the server side.
                    if (col.cardinality && col.cardinality === 1) {
                        fields.push({
                            field: cname.toLowerCase(), type: 'enum', options: {
                                openOnFocus: true,
                                max: 1,
                                url: `${col.model.toLowerCase()}/list?mode=json`,
                                renderItem: (item) => {
                                    if (item.name.name) {
                                        return item.name.name;
                                    } else {
                                        return item.name;
                                    }
                                },
                                renderDrop: (item) => {
                                    if (item.name.name) {
                                        return item.name.name;
                                    } else {
                                        return item.name;
                                    }
                                },
                                onNew: (event) => {
                                    console.log("++ New Item to be added:", event);
                                    $.extend(event.item, event.item);
                                },
                                compare: function (item, search) {
                                    let re1 = new RegExp(search, 'i');
                                    if (re1.test(item.id)) {
                                        return true;
                                    } else {
                                        return re1.test(item.name.name);
                                    }
                                },
                            }, html: {text: col.name, attr: 'style="width:375px"'}
                        });
                    } else {
                        fields.push({
                            field: cname.toLowerCase(), type: 'enum', options: {
                                url: `${col.model.toLowerCase()}/list?mode=json`, renderItem: (item) => {
                                    if (item.name.name) {
                                        return item.name.name;
                                    } else {
                                        return item.name;
                                    }
                                }, renderDrop: (item) => {
                                    if (item.name.name) {
                                        return item.name.name;
                                    } else {
                                        return item.name;
                                    }
                                }, onNew: (event) => {
                                    $.extend(event.item, {name: {name: event.item.text}});
                                    // Add the item on the server side.
                                }, compare: function (item, search) {
                                    let re1 = new RegExp(search, 'i');
                                    if (re1.test(item.id)) {
                                        return true;
                                    } else {
                                        return re1.test(item.name.name);
                                    }
                                }, openOnFocus: true,
                            }, html: {text: col.name, attr: 'style="width:375px"'}
                        });
                    }
                } else {
                    fields.push({
                        field: cname, type: col.type
                    });
                }
            }
            $().w2form({
                name: formName, style: 'border: 0px; background-color: transparent;', fields: fields, actions: {
                    Save: function () {
                        let data = {};
                        this.validate();
                        for (let fname in this.fields) {
                            let field = this.fields[fname];
                            if (field.type === 'enum') {
                                let values = [];
                                for (let i in this.record[field.field]) {
                                    values.push(this.record[field.field][i].text);
                                }
                                data[field.field] = values.join(',');
                            } else if (field.type === 'file') {
                                let scontent = Base64.atob(this.record[field.field][0].content);
                                data[field.field] = scontent;
                            } else {
                                data[field.field] = this.record[field.field];
                            }
                        }
                        let url = result.link;
                        // This is an object method and requires the object oid from the selected in the ListGrid.
                        data[result.model.toLowerCase()] = result.oid;
                        $.ajax({
                            url: url, data: data, success: (results) => {
                                w2popup.close();
                            }, failure: (results) => {
                                console.error(results);
                                w2popup.close();
                            }
                        });
                    }, Reset: () => {
                        this.clear();
                    }, custom: {
                        text: "Cancel", style: 'background: pink;', onClick(event) {
                            w2popup.close();
                        }
                    }
                }
            });

        }
        return w2ui[formName];
    }

    static editDocumentation(results) {
        let text = results.document || "Enter Details Here";
        let setURL = AMainWindow.selectedObject.link.replace('get', 'set');
        let fields = [{field: 'summary', type: 'textarea'}, {field: 'documentation', type: 'textarea'},];
        let editForm = getEditForm(fields, setURL);
        w2popup.open({
            height: 850,
            width: 850,
            title: 'Edit Documentation',
            body: '<div id="editModelDocDialog" style="width: 100%; height: 100%;"></div>',
            showMax: true,
            onToggle: function (event) {
                $(w2ui.editModelDialog.box).hide();
                event.onComplete = function () {
                    $(w2ui.editModelDocDialog.box).show();
                    w2ui.editModelDocDialog.resize();
                }
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                    $('#editModelDialog').w2render(myForm.name);
                }
            }
        });
    }

    static editDocs(results, setURL) {
        let text = results.document || "Enter Details Here";
        let record = {
            summary: results.description, documentation: text
        }
        let editForm = getEditForm(record, setURL);
        w2popup.open({
            height: 850,
            width: 850,
            title: 'Edit Documentation',
            body: '<div id="editModelDocDialog" style="width: 100%; height: 100%;"></div>',
            showMax: true,
            onToggle: function (event) {
                $(w2ui.editModelDialog.box).hide();
                event.onComplete = function () {
                    $(w2ui.editModelDialog.box).show();
                    w2ui.editModelDialog.resize();
                }
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                    $('#editModelDocDialog').w2render(editForm.name);
                    editForm.editors = {documentation: null, summary: null}
                    ClassicEditor.create(document.querySelector('#documentation'), {})
                        .then(editor => {
                            editForm.editors.documentation = editor;
                        });
                    ClassicEditor.create(document.querySelector('#summary'), {})
                        .then(editor => {
                            editForm.editors.summary = editor;
                        });
                }
            }
        })
    }

    static handle(result) {
        AModel.viewDeep3D(result, 'new');
        AModel.showDetail(result);
    }

    static calculateGroupBox(items, fn) {
        let asize = {
            stats: {
                w: {sum: 0, max: 0},
                h: {sum: 0, max: 0},
                d: {sum: 0, max: 0},
                r: {sum: 0, max: 0},
                area: 0,
                num: 0,
            }, set: [],
            box: {w: 0, h: 0, d: 0, rows: 0, cols: 0},
        };

        for (let aname in items) {
            let size = fn({name: items[aname].name});
            asize.set.push(size);
            asize.stats.w.sum += size.w;
            asize.stats.w.max = Math.max(size.w, asize.stats.w.max);
            asize.stats.d.sum += size.d;
            asize.stats.d.max = Math.max(size.d, asize.stats.d.max);
            asize.stats.h.sum += size.h;
            asize.stats.h.max = Math.max(size.h, asize.stats.h.max);
            asize.stats.r.sum += size.r;
            asize.stats.r.max = Math.max(size.w, asize.stats.r.max);
            asize.stats.area += size.w * size.h;
            asize.stats.num++;
        }
        asize.box.rows = Math.round(Math.sqrt(asize.stats.num) + 0.5);
        asize.box.cols = Math.round((asize.stats.num / asize.box.rows) + 0.5);
        asize.box.w = Math.max(Math.sqrt(asize.stats.area), asize.stats.r.max * asize.box.cols);
        asize.box.h = Math.max(Math.sqrt(asize.stats.area), asize.stats.r.max * asize.box.rows);
        return asize;
    }

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AModel.showDetail(results);
            }
        });
    }

    static showDetail(results) {
        let myForm = AModel.createInfo(results);
        myForm.results = results;
        let records = [];
        let i = 0;
        records.push({recid: i++, name: 'name', value: results.name, detail: results.name});
        records.push({recid: i++, name: 'Description', value: results.description, detail: results.description});
        records.push({recid: i++, name: 'Package', value: results.package, detail: results.package});

        let attDetails = getAttributeDetails(results, results._attributes);
        records.push({recid: i++, name: 'Attributes', value: attDetails.length, detail: attDetails.join('|')});
        let assocDetails = getAssocDetails(results, results._associations);
        records.push({recid: i++, name: 'Associations', value: assocDetails.length, detail: assocDetails.join('|')});
        let methodDetails = getMethodDetails(results, results.methods);
        records.push({recid: i++, name: 'Methods', value: methodDetails.length, detail: methodDetails.join('|')});

        myForm.records = records;
        ASelectedHUD.update('Model', records);
        myForm.refresh();
        return myForm;
    }

    static calculateDeepBox(node) {
        let aitems = {};
        for (let name in node._attributes) {
            aitems[name] = {name: `${name} : ${node._attributes[name].type}`}
        }
        ;
        for (let name in node._associations) {
            aitems[name] = {name: `${name} : ${node._associations[name].type}`}
        }
        ;

        let abox = AModel.calculateGroupBox(aitems, AAttribute.calculateBox);
        // let sbox = AStateNet.calculateBox(node.statenet);
        let sbox = {box: {w: 0, h: 0}};
        let mbox = AModel.calculateGroupBox(node.methods, AAction.calculateBox);

        const wnum = Math.max(abox.box.w, sbox.box.w);
        const hnum = mbox.box.h;
        const dnum = Math.max(abox.box.h, sbox.box.h, mbox.box.w);

        const radius = Math.max(Math.sqrt(wnum ** 2 + hnum ** 2), Math.sqrt(hnum ** 2 + dnum ** 2), Math.sqrt(wnum ** 2 + dnum ** 2));
        return {w: wnum, h: hnum, d: dnum, r: radius, attributes: abox, states: sbox, methods: mbox};
    }

}

function getAttributeDetails(cls, attributes) {
    let items = [];
    let i = 0;
    for (let j in attributes) {
        let item = attributes[j];
        i++;
        let name = `${j} : ${item.type}`;
        let id = cls.id + j
        items.push(`${id}^${name}^${item.description}`);
    }
    return items;
}

function getMethodDetails(cls, methods) {
    let items = [];
    let i = 0;
    for (let j in methods) {
        let item = methods[j];
        i++;
        let name = `${j}`;
        let id =`${cls.id}-${j}`;
        items.push(`${id}^${name}^${item.description}`);
    }
    return items;
}

function getAssocDetails(cls, assocs) {
    let items = [];
    let i = 0;
    for (let j in assocs) {
        let item = assocs[j];
        i++;
        let name = `${j}:${item.type}`;
        let id = `Assoc${item.type}`;
        items.push(`${id}^${name}^[${item.cardinality}] - ${item.description}`);
    }
    return items;
}

function getEditForm(record, setURL) {
    if (!w2ui['editModelDoc']) {
        let fields = [{field: 'summary', type: 'textarea',}, {field: 'documentation', type: 'textarea'},];
        $().w2form({
            name: 'editModelDoc',
            saveURL: setURL,
            style: 'border: 0px; background-color: transparent;',
            fields: fields,
            actions: {
                Save: function () {
                    let url = this.saveURL;
                    let newRecord = {
                        summary: this.editors.summary.getData(),
                        documentation: this.editors.documentation.getData()
                    }
                    $.ajax({
                        url: url, data: newRecord, success: function (results) {
                            // $(w2ui.editModelDialog.box).hide();
                            w2popup.close();
                        }, failure: function (results) {
                            console.error(results);
                        }
                    });
                }, Reset: function () {
                    this.clear();
                }, custom: {
                    caption: "Cancel", style: 'background: pink;', onClick(event) {
                        w2popup.close();
                    }
                }
            }
        });
    }
    w2ui['editModelDoc'].record = record;
    w2ui['editModelDoc'].saveURL = setURL;
    return w2ui['editModelDoc'];
}

function layoutRowColumn(parentNode, nodes, size, direction) {
    let prevNode = parentNode;
    let row = 0;
    let col = 0;
    let bbox = {
        x: {min: -parentNode.cube.x / 2, max: parentNode.cube.x / 2},
        y: {min: -parentNode.cube.y / 2, max: parentNode.cube.y / 2},
        z: {min: -parentNode.cube.z / 2, max: parentNode.cube.z / 2},
    }


    for (let i in nodes) {
        let node = nodes[i];
        // Make sure I have the right number of rows.
        if (row >= size.box.rows) {
            row = 0;
            col++;
        }
        if (direction === 'top') {
            let offset = {
                w: Math.max(parentNode.cube.x / (size.box.cols + 1), size.stats.w.max) * 1.10,
                h: Math.max(parentNode.cube.z / (size.box.rows + 1), size.stats.h.max) * 1.10
            }
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.min + offset.w / 2 + (col * offset.w),
                fy: bbox.y.max,
                fz: bbox.z.max - offset.h / 2 - (row * offset.h),
            }
        } else if (direction === 'bottom') {
            let offset = {
                w: Math.max(parentNode.cube.x / (size.box.cols + 1), size.stats.w.max) * 1.10,
                h: Math.max(parentNode.cube.z / (size.box.rows + 1), size.stats.h.max) * 1.10
            }
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.min + offset.w / 2 + (col * offset.w),
                fy: bbox.y.min - 30,
                fz: bbox.z.max - offset.h / 2 - (row * offset.h),
            }
        } else if (direction === 'right') {
            let offset = {
                w: parentNode.cube.z / (size.box.cols + 1),
                h: parentNode.cube.y / (size.box.rows + 1),
            }
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.max,
                fy: bbox.y.max - offset.h / 2 - (row * offset.h),
                fz: bbox.z.max - offset.w / 2 - (col * offset.w),
            }
        } else if (direction === 'back') {
            let offset = {
                w: Math.max(parentNode.cube.x / (size.box.cols + 1), size.stats.w.max) * 1.10,
                h: Math.max(parentNode.cube.y / (size.box.rows + 1), size.stats.h.max) * 1.10
            }
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.max - offset.w / 2 - (col * offset.w),
                fz: bbox.z.min,
                fy: bbox.y.max - offset.h / 2 - (row * offset.h),
            }
        } else if (direction === 'front') {
            let offset = {
                w: Math.max(parentNode.cube.x / (size.box.cols + 1), size.stats.w.max) * 1.10,
                h: Math.max(parentNode.cube.y / (size.box.rows + 1), size.stats.h.max) * 1.10
            }
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.min + offset.w / 2 + (col * offset.w),
                fz: bbox.z.max,
                fy: bbox.y.min + offset.h / 2 + (row * offset.h),
            }
        }
        row++;
    }
    return;
}
