import {AAction, AAttribute, AStateNet, AText} from './index.js';


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

    static view3D(node, type) {
        let color = node.color || "orange";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let w = 100;
        let h = 100;
        let d = 20;
        if (node.cube) {
            w = node.cube.w;
            h = node.cube.h;
            d = node.cube.d;
        }
        let opacity = node.opacity || 1;

        let geometry = new THREE.BoxGeometry(w, h, d);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            depthTest: true,
            depthWrite: true,
            flatShading: true,
            vertexColors: true,
            reflectivity: 1,
            refractionRatio: 1,
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
        let label = AText.view3D({text: node.name, color: "#ffffff", width: w, size: 20 * (w / 100)});
        // label.applyMatrix4(new THREE.Matrix4().makeScale(w/100, w/100, w/100));
        label.position.set(0, (h / 2) - 20, (d / 2) + 1);
        retval.add(label)
        if (typeof node.box !== 'string') {
            node.box = node.box || Math.sqrt(d * d + h * h + w * w);
        } else {
            node.box = null;
        }
        node.expandLink = `model/get?id=${node.id}`;
        node.expandView = AModel.viewDeep3D;
        return retval;
    }

    static viewDeep3D(cls, mode) {
        let data = {nodes: {}, links: []};
        let atnum = Object.keys(cls._attributes).length; // XZ on the tp of the Model
        let acnum = Object.keys(cls.methods).length; //  YZ on right of the Model
        let asnum = Object.keys(cls._associations).length; // YZ on left of the Model
        let snum = 0; // XZ on the bottom of the Model.
        if (cls.statenet) {
            snum = Object.keys(cls.statenet).length;
        }
        let xnum = Math.max(acnum, snum * 3);
        let ynum = Math.max(acnum, asnum * 3);
        let znum = Math.max(acnum, atnum, asnum * 3, snum * 3);

        let xfactor = Math.round(Math.sqrt(xnum) + 0.5);
        let yfactor = Math.round(Math.sqrt(ynum) + 0.5);
        let zfactor = Math.round((znum / xfactor) + 0.5);

        const theta = 3.14 / 2;
        let model3d = {w: xfactor * 100 + 50, h: yfactor * 100 + 25, d: zfactor * 100 + 50};
        let bbox = {
            parent: cls.id,
            x: {min: -model3d.w / 2 + 20, max: model3d.w / 2 - 20},
            y: {min: -model3d.h / 2 + 20, max: model3d.h / 2 - 20},
            z: {min: -model3d.d / 2 + 20, max: model3d.d / 2 - 20},
        }

        data.nodes[cls.id] = {
            id: cls.id,
            name: cls.name,
            cube: model3d,
            opacity: 0.5,
            fx: 0,
            fy: 0,
            fz: 0,
            box: "None",
            view: AModel.view3D,
            expandView: AModel.viewDeep3D,
            expandLink: `model/get?id=${cls.id}`
        };

        let prevID = cls.id;
        let col = 0;
        let row = 0;
        let arbox = {
            parent: prevID,
            x: {min: bbox.x.min + 70, max: bbox.x.min + 70},
            y: {min: bbox.y.max + 80, max: bbox.y.max + 80},
            z: {min: bbox.z.max - 60, max: bbox.z.max - 60},
        }
        for (let aname in cls._associations) {
            let assoc = cls._associations[aname];
            let clsid = assoc.type;
            if (!data.nodes.hasOwnProperty(clsid)) {
                data.nodes[clsid] = {
                    id: clsid,
                    name: clsid,
                    view: AModel.view3D,
                    expandView: AModel.viewDeep3D,
                    expandLink: `model/get?id=${clsid}`,
                    rbox: {
                        parent: cls.id,
                        x: {min: bbox.x.min - 200, max: bbox.x.min - 200},
                        y: {min: bbox.y.min + 20, max: bbox.y.max - 20},
                        z: {min: bbox.z.min + 40, max: bbox.z.max - 40}
                    },
                    rotate: {y: -theta}
                };
            }
            // data.links.push({target:clsid, source: cls.id, value: 0.1, name: aname, arrow: 20, relpos: 1, curve: 0.1 });
            data.nodes[`Assoc${clsid}`] = {
                id: `Assoc${clsid}`,
                name: `${aname} : ${assoc.type}`,
                view: AAttribute.view3D,
                color: 'magenta',
                rbox: arbox,
                rotate: {x: -theta}
            };
            if (clsid !== cls.id) {
                data.links.push({target: clsid, source: `Assoc${clsid}`, width: 3.0, value: 0.0, color: 'magenta'});
            }
            prevID = `Assoc${clsid}`;
            row++;
            if (row < yfactor) {
                arbox = {
                    parent: prevID, x: {min: 0, max: 0}, // Col
                    y: {min: 0, max: 0}, z: {min: -80, max: -80}, // Row
                }

            } else {
                row = 0;
                col++;
                arbox = {
                    parent: cls.id,
                    x: {min: bbox.x.min + 70 + (col * 120), max: bbox.x.min + 70 + (col * 120)},
                    y: {min: bbox.y.max + 80, max: bbox.y.max + 80},
                    z: {min: bbox.z.max - 60, max: bbox.z.max - 60},
                }
            }
        }

        for (let aname in cls._attributes) {
            let attr = cls._attributes[aname];
            let clsid = cls.id + aname
            data.nodes[clsid] = {
                id: clsid, name: `${aname} : ${attr.type}`, view: AAttribute.view3D, rbox: arbox, rotate: {x: -theta}
            };
            prevID = clsid;
            row++;
            if (row < yfactor) {
                arbox = {
                    parent: prevID, x: {min: 0, max: 0}, // Col
                    y: {min: 0, max: 0}, z: {min: -80, max: -80}, // Row
                }

            } else {
                row = 0;
                col++;
                arbox = {
                    parent: cls.id,
                    x: {min: bbox.x.min + 70 + (col * 120), max: bbox.x.min + 70 + (col * 120)},
                    y: {min: bbox.y.max + 80, max: bbox.y.max + 80},
                    z: {min: bbox.z.max - 60, max: bbox.z.max - 60},
                }
            }
        }

        prevID = cls.id;
        col = 0;
        row = 0;
        arbox = {
            parent: prevID,
            x: {min: bbox.x.max + 40, max: bbox.x.max + 40},
            y: {min: bbox.y.max - 40, max: bbox.y.max - 40},
            z: {min: bbox.z.max - 60, max: bbox.z.max - 60},
        }
        for (let mname in cls.methods) {
            data.nodes[`${cls.id}-${mname}`] = {
                id: `${cls.id}-${mname}`,
                name: mname,
                view: AAction.view3D,
                rbox: arbox,
                rotate: {x: -theta, z: -theta, y: theta}
            };
            prevID = `${cls.id}-${mname}`;
            row++;
            if (row < yfactor) {
                arbox = {
                    parent: prevID, x: {min: 0, max: 0}, // Col
                    y: {min: -100, max: -100}, // Row
                    z: {min: 0, max: 0},
                }
            } else {
                row = 0;
                col++;
                arbox = {
                    parent: cls.id,
                    x: {min: bbox.x.max + 40, max: bbox.x.max + 40},
                    y: {min: bbox.y.max - 40, max: bbox.y.max - 40},
                    z: {min: bbox.z.max - 60 - (col * 150), max: bbox.z.max - 60 - (col * 150)},
                }
            }
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        // State Net it if exists.
        if (cls.statenet) {
            let mode = {
                id: cls.id, ibox: {
                    parent: cls.id,
                    x: {min: bbox.x.max - 5, max: bbox.x.max - 5},
                    y: {min: bbox.y.min - 40, max: bbox.y.min - 40},
                    z: {min: bbox.z.min + 5, max: bbox.z.max - 5}
                }, rbox: {
                    parent: cls.id,
                    x: {min: bbox.x.min + 10, max: bbox.x.max - 10},
                    y: {min: bbox.y.min - 40, max: bbox.y.min - 40},
                    z: {min: bbox.z.min + 5, max: bbox.z.max - 5}
                }, rotate: {x: theta}, mode: 'add'
            };
            AStateNet.viewDeep3D(cls.statenet, mode);
        }
        window.graph.graph.cameraPosition({x: 0, y: 0, z: 1000}, // new position
            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
            3000  // ms transition duration.
        );
        window.graph.showLinks();

        window.graph.toolbar.setToolBar([{
            type: 'button', id: 'states', text: 'States', img: 'w2ui-icon-search', callback: (event) => {
                window.graph.graph.cameraPosition({x: 0, y: 0, z: 1000}, // new position
                    {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                    1000);
                setTimeout(() => {
                    window.graph.graph.cameraPosition({x: 0, y: -1000, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000);
                }, 500);
                setTimeout(() => {
                    window.graph.graph.zoomToFit(1000)
                }, 1500);
            }
        }, {
            type: 'button', id: 'attributes', text: 'Attributes', img: 'w2ui-icon-search', callback: (event) => {
                window.graph.graph.cameraPosition({x: 0, y: 0, z: 1000}, // new position
                    {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                    1000);
                setTimeout(() => {
                    window.graph.graph.cameraPosition({x: 0, y: 1000, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000);
                }, 500);
                setTimeout(() => {
                    window.graph.graph.zoomToFit(1000)
                }, 1500);
            }
        }, {
            type: 'button', id: 'methods', text: 'Method', img: 'w2ui-icon-search', callback: (event) => {
                window.graph.graph.cameraPosition({x: 0, y: 0, z: 1000}, // new position
                    {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                    1000);
                setTimeout(() => {
                    window.graph.graph.cameraPosition({x: 1000, y: 0, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000);
                }, 500);
                setTimeout(() => {
                    window.graph.graph.zoomToFit(1000)
                }, 1500);
            }
        }, {
            type: 'button', id: 'associations', text: 'Associations', img: 'w2ui-icon-search', callback: (event) => {
                window.graph.graph.cameraPosition({x: 0, y: 0, z: 1000}, // new position
                    {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                    1000);
                setTimeout(() => {
                    window.graph.graph.cameraPosition({x: -1000, y: 0, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000);
                }, 500);
                setTimeout(() => {
                    window.graph.graph.zoomToFit(1000)
                }, 1500);
            }
        },]);
    }

    static objectList(result) {
        let myForm = AModel.viewList(result);
        // Preload the detail with all of the model information.
        let detail = AModel.createDetail(result);

        $('#objlist').w2render(myForm.name);
        myForm.refresh();

        AModel.processObjectsForGraph(result, 'new');
    }

    static expandObject(link) {
        $.ajax({
            url: link, success: AModel.processObjectShow
        });
    }

    static processObjectShow(result) {
        if (!w2ui['objlist']) {
            $('#objlist').w2grid({name: 'objlist'});
        }
        if (!w2ui['objdetail']) {
            $('#objdetail').w2grid({
                name: 'objdetail', header: 'Details', show: {header: true, columnHeaders: false}, columns: [{
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
        }

        let records = [];
        let cols = [{field: 'name', size: "20%", resizeable: true, text: "Name", sortable: true}, {
            field: 'value',
            size: "80%",
            resizeable: true,
            text: "Value",
            sortable: true
        },];
        let rec = result.record;
        let i = 0;
        for (let j in result.columns) {
            i++;
            let attr = rec[j];
            let ritem;
            if (attr) {
                if (attr.count) {
                    // set the non-detaul value to the count
                    // Now set the detail value
                    let values = [];
                    for (let k in attr.values) {
                        let mvalue = attr.values[k];
                        if (mvalue.link) {
                            values.push(`<span onclick="expandObject('${mvalue.link}');">${mvalue.name}</span>`);
                        } else {
                            values.push(mvalue.name);
                        }
                    }
                    ritem = {recid: rec.id, name: j, value: attr.count, detail: values.join(', ')};
                } else {
                    if (result.columns[j].cardinality === 1) {
                        ritem = {
                            recid: rec.id,
                            name: j,
                            value: rec[j].name,
                            detail: `<span onclick="expandObject('${rec[j].link}');">${rec[j].name}</span>`
                        };
                    } else {
                        ritem = {recid: rec.id, name: j, value: rec[j].name, detail: rec[j].name};
                    }
                }
                records.push(ritem);
            }
        }
        w2ui['objlist'].columns = cols;
        w2ui['objlist'].records = records;
        // Clear the detail list
        w2ui['objdetail'].clear();
        w2ui['objlist'].refresh();
        let retval = {records: {}, columns: result.columns};
        retval.records[result.record.id] = result.record;
        AModel.processObjectsForGraph(retval, 'new');
    }

    static processObjectsForGraph(objs, mode) {
        let data = {nodes: {}, links: []};
        for (let i in objs.records) {
            let rec = objs.records[i];
            data.nodes[rec.id] = {
                id: rec.id, name: rec.name.name, group: rec.type, level: rec.package, view: rec.type + '3D'
            }
            // Now add the nodes of the associations
            // Go through the cols and get the associations
            for (let j in objs.columns) {
                let col = objs.columns[j];
                let colname = col.name.toLowerCase();
                // this checks if it was an association
                if (rec[colname] && col.hasOwnProperty('cardinality')) {
                    let obj = rec[colname];
                    if (col.cardinality === 1) {
                        data.nodes[obj.id] = {
                            id: obj.id, name: obj.name, group: obj.type, level: col.package, view: obj.type + '3D'
                        };
                        if (col.owner || col.composition) {
                            data.links.push({
                                source: rec.id, target: obj.id, value: 0.1
                            });
                        } else {
                            data.links.push({
                                source: obj.id, target: rec.id, value: 0.1
                            });
                        }
                    } else {
                        for (let k in obj.values) {
                            let aobj = obj.values[k];
                            data.nodes[aobj.id] = {
                                id: aobj.id,
                                name: aobj.name,
                                group: aobj.type,
                                level: col.package,
                                view: aobj.type + '3D'
                            };
                            if (col.owner || col.composition) {
                                data.links.push({
                                    source: rec.id, target: aobj.id, value: 5
                                });
                            } else {
                                data.links.push({
                                    target: rec.id, source: aobj.id, value: 5
                                });
                            }
                        }
                    }
                }
            }
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
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

    static viewList(results) {
        let myForm = AModel.createList(results);
        myForm.results = results;
        let records = [];
        for (let i in results.records) {
            let rec = results.records[i];
            let color = AModel.scolor[`${rec.state.toLowerCase()}`];
            let ritem = {
                recid: rec.id,
                state: rec.state,
                statedetail: rec.state,
                "w2ui": {"style": {0: `background-color: ${color}`}}
            };
            for (let j in results.columns) {
                let attr = rec[j];
                let colname = j;

                if (attr) {
                    if (attr.count) {
                        // set the non-detaul value to the count
                        ritem[j] = attr.count;

                        // Now set the detail value
                        let values = [];
                        for (let k in attr.values) {
                            let mvalue = attr.values[k];
                            if (mvalue.link) {
                                values.push(`<span onclick="AModel.expandObject('${mvalue.link}');">${mvalue.name}</span>`);
                            } else {
                                values.push(mvalue.name);
                            }
                        }
                        ritem[j + 'detail'] = values.join(', ');
                    } else {
                        ritem[colname] = rec[j].name;
                        ritem[j + 'detail'] = rec[j].name;
                    }
                }
            }
            records.push(ritem);
        }
        myForm.add(records);
        myForm.refresh();
        return myForm;
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

    static createList(results) {
        let modelName = results.name + 'List';
        let modelDetail = results.name + 'Detail';
        if (w2ui[modelName]) {
            return w2ui[modelName];
        }
        if (!results.columns) {
            results.columns = []
        }
        let size = `${100 / Object.keys(results.columns).length + 1}%`;
        let cols = [{field: 'state', size: size, resizeable: true, text: 'State', sortable: true}];
        for (let i in results.columns) {
            cols.push({
                field: results.columns[i].name.toLowerCase(),
                size: size,
                resizeable: true,
                text: results.columns[i].name,
                sortable: true
            });
        }

        $().w2grid({
            name: modelName, modelName: results.name, columns: cols, show: {
                header: true,
                columnHeaders: true,
                toolbar: true,
                toolbarSave: true,
                toolbarAdd: true,
                toolbarEdit: true,
                toolbarDelete: true
            }, onAdd: (event) => {
                let myForm = w2ui[event.target];
                let editForm = AModel.viewEdit({
                    name: myForm.results.name, columns: myForm.results.columns, record: null
                });
                AModel.popup(editForm);
            }, onEdit: (event) => {
                let myForm = w2ui[event.target];
                let items = myForm.getSelection();
                let record;
                for (let i in myForm.results.records) {
                    if (myForm.results.records[i].id === items[0]) {
                        record = myForm.results.records[i];
                        break;
                    }
                }
                $.ajax({
                    url: `${record.type}?id=${record.id}`, success: function (results) {
                        let editForm = AModel.viewEdit({
                            name: myForm.results.name, columns: myForm.results.columns, record: results.record
                        });
                        AModel.popup(editForm);
                    }, failure: function (results) {
                        console.error("AJAX Failed:", results);
                    }
                });
                console.log("Fired AJAX");
            }, onSave: (event) => {
                console.log("Save");
            }, onDelete: (event) => {
                let items = w2ui[modelName].getSelection();
                AModel.viewEdit(items[0]);
            }, onSelect: (event) => {
                let myForm = w2ui[event.target];
                myForm.selected = event.recid;
                let record = myForm.get(event.recid);
                let drecords = [];
                let k = 0;
                for (let name in record) {
                    if (name.includes('detail')) {
                        k++;
                        let aname = name.replace('detail', '');
                        drecords.push({recid: k, name: aname, value: record[name]});
                    }
                }
                let detailForm = AModel.viewDetail({name: myForm.modelName, id: event.recid}, drecords)
                // myForm.select(event.recid);
                window.graph.selectNodeByID(event.recid);
            }
        });
        return w2ui[modelName];
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
        let setURL = selectedObject.link.replace('get', 'set');
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
                    ClassicEditor.create(document.querySelector('#documentation'), { })
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
    handle(result) {
        AModel.viewDeep3D(result, 'new');
        let records = [];
        AModel.viewDetail({name: result.name}, result);
        if (!result.name) {
            AModel.viewList({name: result.name});
        } else {
            AModel.viewList(result);
        }
        AModel.viewEdit({name: result.name}, result);
    }
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
