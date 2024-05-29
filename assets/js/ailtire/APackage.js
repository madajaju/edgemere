/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AUsecase, AModel, AText, AInterface, AHandler, A3DGraph, ASelectedHUD} from './index.js';

export default class APackage {
    constructor(config) {
        this.config = config;
    }

    es

    static showList(panel, parent) {
        $.ajax({
            url: 'package/list',
            success: function (results) {
                console.log(results);
                let packageList = getPackageNodes(results);
                w2ui[panel].add(parent, packageList);
            }
        });
    }

    static default = {
        fontSize: 20,
        height: 200,
        width: 200,
        depth: 20
    }


    static calculateBox(node) {
        let fontSize = node.fontSize || APackage.default.fontSize;
        let width = node.name.length * fontSize / 2;
        let height = APackage.default.height;
        let depth = APackage.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: depth, r: radius};
    }

    static view3D(node, type) {
        let color = node.color || "#00aaff";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let size = APackage.calculateBox(node);
        let fontSize = node.fontSize || APackage.default.fontSize;
        let shape = node.cube || {x: size.w, y: size.h, z: size.d};
        let opacity = node.opacity || 1;
        let geometry = new THREE.BoxGeometry(shape.x, shape.y, shape.z);
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
        const box = new THREE.Mesh(geometry, material);

        let label = AText.view3D({
            text: node.name.replace(/\s/g, '\n'),
            color: "#ffffff",
            width: shape.x,
            size: fontSize
        });
        let labelhieght = node.name.split(/\s/).length * fontSize;
        label.position.set(0, (shape.y / 2) - labelhieght, shape.z / 2 + 4);
        box.add(label);
        if (node.x && node.y && node.z) {
            box.position.set(node.x, node.y, node.z);
        }
        if (node.rotate) {
            if (node.rotate.x) {
                box.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if (node.rotate.y) {
                box.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if (node.rotate.z) {
                box.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        box.aid = node.id;
        node.expandLink = node.expandLink || `package/get?id=${node.id}`;
        node.expandView = node.expandView || APackage.handle;
        node.getDetail = APackage.getDetail;
        node.box = node.box || size.r;
        return box;
    }

    static viewDeep3D(pkg, mode) {
        const theta = Math.PI / 2; // 90 degrees
        let data = {nodes: {}, links: []};
        const size = APackage.calculateDeepBox(pkg);
        pkg.size = size;

        window.graph.clearObjects();

        let package3d = {x: size.w, y: size.h, z: size.d};
        let bbox = {
            parent: pkg.shortname,
            x: {min: (-package3d.x / 2), max: (package3d.x / 2)},
            y: {min: (-package3d.y / 2), max: (package3d.y / 2)},
            z: {min: (-package3d.z / 2), max: (package3d.z / 2)}
        }

        data.nodes[pkg.shortname] = {
            id: pkg.shortname,
            name: pkg.name,
            description: pkg.description,
            cube: package3d,
            fontSize: 30,
            fx: 0,
            fy: 0,
            fz: 0,
            box: 1, // Make it so items can get really close to the parent package.
            view: APackage.view3D,
            expandView: APackage.handle,
            expandLink: `package/get?id=${pkg.shortname}`,
            getDetail: APackage.getDetail,
            opacity: 0.5,
            color: pkg.color
        };
        let inodes = [];
        for (let iname in pkg.interface) {
            let name = iname.replace(pkg.prefix, '');
            let node = {
                id: iname,
                name: name,
                description: pkg.interface[iname].description,
                view: AInterface.view3D,
                orientation: {x: 0, y: 2, z: 0}
            };
            data.nodes[iname] = node;
            inodes.push(node);
        }
        layoutRowColumn(data.nodes[pkg.shortname], inodes, size.interface, "top");

        let hnodes = [];
        for (let hname in pkg.handlers) {
            let handler = pkg.handlers[hname];
            let node = {
                id: hname,
                name: handler.name,
                description: pkg.handlers[hname].description,
                view: AHandler.view3D,
                orientation: {x: 1, y: 0, z: 0}
            };

            data.nodes[hname] = node;
            hnodes.push(node);
            for (let h in handler.handlers) {
                let hand = handler.handlers[h];
                if (hand.action) {
                    let aname = hand.action.replace('/' + pkg.shortname, pkg.prefix);
                    // window.graph.addLink({source:hname, target: aname, color: 'magenta'});
                    data.links.push({source: hname, target: aname, color: '#ffffbb', value: 0.1, width: 5});
                }
            }
        }
        layoutRowColumn(data.nodes[pkg.shortname], hnodes, size.handlers, "right");

        let ucnodes = [];
        for (let uname in pkg.usecases) {
            let uc = pkg.usecases[uname];

            let node = {
                id: uname, name: uc.name,
                description: uc.description,
                fontSize: 15,
                view: AUsecase.view3D,
                rotate: {x: theta},
                orientation: {x: 0, y: -1, z: 0}
            }
            data.nodes[uname] = node;
            ucnodes.push(node);
            if (uc.method) {
                data.links.push({
                    source: uname,
                    target: pkg.prefix + '/' + uc.method,
                    color: '#ffffbb',
                    value: 0.1,
                    width: 5
                });
            }
        }
        layoutRowColumn(data.nodes[pkg.shortname], ucnodes, size.usecases, "bottom");

        let cnodes = [];
        for (let cname in pkg.classes) {
            let cls = pkg.classes[cname];
            let node = {
                id: cname, name: cls.name,
                description: cls.description,
                rbox: {
                    parent: pkg.shortname, x: bbox.x, y: bbox.y,
                    z: {min: bbox.z.min - 50, max: bbox.z.min - 50}
                },
                rotate: {y: 2 * theta},
                view: AModel.view3D,
                orientation: {x: 0, y: 0, z: -1}
            }
            data.nodes[cname] = node;
            cnodes.push(node);
        }
        layoutRowColumn(data.nodes[pkg.shortname], cnodes, size.classes, "back");
        let spnodes = [];
        for (let pname in pkg.subpackages) {
            let spkg = pkg.subpackages[pname];
            let node = {
                id: pname,
                name: spkg.name,
                description: spkg.description,
                rotate: {y: -theta},
                color: spkg.color,
                view: APackage.view3D,
                orientation: {x: -1, y: 0, z: 0}
            }
            data.nodes[pname] = node;
            spnodes.push(node);
        }

        layoutRowColumn(data.nodes[pkg.shortname], spnodes, size.subpackages, "left");

        for (let pname in pkg.depends) {
            let spkg = pkg.depends[pname];
            let node = {
                id: pname,
                name: spkg.name,
                description: spkg.description,
                rbox: {
                    parent: pkg.shortname,
                    y: {min: bbox.y.max, max: bbox.y.max * 2},
                    z: bbox.z,
                    fx: bbox.x.min - 150,
                },
                color: spkg.color,
                rotate: {y: -theta},
                view: APackage.view3D,
                orientation: {x: -1, y: 0, z: 0}
            }
            data.nodes[pname] = node;
            data.links.push({source: pkg.shortname, target: pname, color: '#ffffbb', value: 1.0, width: 2});
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        let distance = Math.max(Math.sqrt((size.w / 2) ** 2 + (size.h / 2) ** 2) * 2, size.d * 2);
        window.graph.graph.cameraPosition(
            {x: 0, y: 0, z: distance}, // new position
            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
            3000  // ms transition duration.
        );
        window.graph.showLinks();
        _setGraphToolbar(pkg);
    }

    static handle(result) {
        APackage.viewDeep3D(result, 'new');
        APackage.showDetail(result);
    }
    static handle2d(result, object, div) {
        _setGraphToolbar(object);
        div.innerHTML = result;
    }

    static handleList(result) {
        APackage.viewDeep3D(result, 'new');
        APackage.showListDetail(result);
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

    static calculateDeepBox(pkg) {
        let ibox = APackage.calculateGroupBox(pkg.interface, AInterface.calculateBox); // XZ
        let hbox = APackage.calculateGroupBox(pkg.handlers, AHandler.calculateBox); // YZ
        let ubox = APackage.calculateGroupBox(pkg.usecases, AUsecase.calculateBox); // XY
        let cbox = APackage.calculateGroupBox(pkg.classes, AModel.calculateBox); // XY
        let pbox = APackage.calculateGroupBox(pkg.subpackages, APackage.calculateBox); // XZ
        let dbox = APackage.calculateGroupBox(pkg.depends, APackage.calculateBox); // YZ

        /* X is always the width, Y is height with X, Y is width with Z, Z is always h */
        let fontWidth = pkg.name.length * APackage.default.fontSize / 2;
        const wnum = Math.max(ibox.box.w, ubox.box.w, cbox.box.w, 100, fontWidth);
        const hnum = Math.max(hbox.box.w, ubox.box.h, cbox.box.h, dbox.box.h, pbox.box.h, 100);
        const dnum = Math.max(ibox.box.h, hbox.box.h, pbox.box.w, dbox.box.w, 100);

        const radius = Math.max(Math.sqrt(wnum ** 2 + hnum ** 2), Math.sqrt(hnum ** 2 + dnum ** 2), Math.sqrt(wnum ** 2 + dnum ** 2));
        return {
            w: wnum * 1.10, h: hnum * 1.10, d: dnum * 1.10, r: radius,
            interface: ibox,
            handlers: hbox,
            usecases: ubox,
            classes: cbox,
            subpackages: pbox,
            depends: dbox
        }
    }

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                APackage.showDetail(results);
            }
        });
    }

    static showDetail(result) {
        let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, label: "Value", sortable: true},
        ];
        w2ui['objlist'].columns = cols;
        let i = 0;
        records.push({recid: i++, name: 'name', value: result.name, detail: result.name});
        records.push({recid: i++, name: 'Abbv Name', value: result.shortname, detail: result.shortname});
        records.push({recid: i++, name: 'Description', value: result.description, detail: result.description});
        records.push({recid: i++, name: 'Color', value: result.color, detail: result.color});
        records.push({recid: i++, name: 'Prefix', value: result.prefix, detail: result.prefix});
        let classdetails = getDetails(result.classes, (name, obj) => {
            return name;
        });
        records.push({recid: i++, name: 'Classes', value: classdetails.length, detail: classdetails.join('|')});
        let spkgs = getDetails(result.subpackages, (name, obj) => {
            return name;
        });
        records.push({recid: i++, name: 'Sub Packages', value: spkgs.length, detail: spkgs.join('|')});
        let interfaces = getDetails(result.interface, (name, obj) => {
            return name;
        });
        records.push({recid: i++, name: 'Interfaces', value: interfaces.length, detail: interfaces.join('|')});
        let handlers = getDetails(result.handlers, (name, obj) => {
            return name;
        });
        records.push({recid: i++, name: 'Handlers', value: handlers.length, detail: handlers.join('|')});
        let usecases = getDetails(result.usecases, (name, obj) => {
            return name;
        });
        records.push({recid: i++, name: 'Use Cases', value: usecases.length, detail: usecases.join('|')});

        w2ui['objlist'].records = records;
        // Clear the detail list
        w2ui['objdetail'].clear();

        w2ui['objlist'].onClick = function (event) {
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
                drecords.push({recid: k, id: id, name: name, value: value});

            }
            w2ui['objdetail'].onClick = (event) => {
                let records = w2ui['objdetail'].records;
                let record = undefined;
                for (let i in records) {
                    let rec = records[i];
                    if (`${rec.recid}` === `${event.recid}`) {
                        record = records[i];
                        break;
                    }
                }
                window.graph.selectNodeByID(record.id, true);
            };
            w2ui['objdetail'].add(drecords);
            window.graph.selectNodeByID(event.recid);
        }
        ASelectedHUD.update('Package', records);
        w2ui['objlist'].refresh();
    }

    static showListDetail(result) {
        let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, label: "Value", sortable: true},
        ];
        w2ui['objlist'].columns = cols;
        let i = 0;
        records.push({recid: i++, name: 'name', value: result.name, detail: result.name});
        records.push({recid: i++, name: 'Abbv Name', value: result.shortname, detail: result.shortname});
        records.push({recid: i++, name: 'Description', value: result.description, detail: result.description});
        records.push({recid: i++, name: 'Color', value: result.color, detail: result.color});
        records.push({recid: i++, name: 'Prefix', value: result.prefix, detail: result.prefix});
        let classdetails = getDetails(result.classes);
        records.push({recid: i++, name: 'Classes', value: classdetails.length, detail: classdetails.join('|')});
        let spkgs = getDetails(result.subpackages);
        records.push({recid: i++, name: 'Sub Packages', value: spkgs.length, detail: spkgs.join('|')});
        let interfaces = getDetails(result.interface);
        records.push({recid: i++, name: 'Interfaces', value: interfaces.length, detail: interfaces.join('|')});
        let handlers = getDetails(result.handlers);
        records.push({recid: i++, name: 'Handlers', value: handlers.length, detail: handlers.join('|')});
        let usecases = getDetails(result.usecases);
        records.push({recid: i++, name: 'Use Cases', value: usecases.length, detail: usecases.join('|')});

        w2ui['objlist'].records = records;
        // Clear the detail list
        w2ui['objdetail'].clear();

        w2ui['objlist'].onClick = function (event) {
            let record = this.get(event.recid);
            w2ui['objdetail'].header = `${record.name} Details`;
            w2ui['objdetail'].show.columnHeaders = true;
            w2ui['objdetail'].clear();
            let drecords = [];
            let k = 0;
            let values = record.detail.split('|');
            for (let i in values) {
                let [name, value] = values[i].split('^');
                if (!value) {
                    value = name;
                    name = record.name;
                }
                k++;
                drecords.push({recid: k, name: name, value: value});
            }
            w2ui['objdetail'].add(drecords);
            window.graph.selectNodeByID(event.recid);
        }
        w2ui['objlist'].refresh();
    }

    static editDocs(results, setURL) {
        let editForm = getEditForm(results, setURL);
        w2popup.open({
            height: 850,
            width: 850,
            title: `Edit ${results.name}`,
            body: '<div id="editPackageDocDialog" style="width: 100%; height: 100%;"></div>',
            showMax: true,
            onToggle: function (event) {
                $(w2ui.editPackageDialog.box).hide();
                event.onComplete = function () {
                    $(w2ui.PackageDialog.box).show();
                    w2ui.PackageDialog.resize();
                }
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                    $('#editPackageDocDialog').w2render(editForm.name);
                    w2ui.PackageEditTabs.click('docs');
                }
            }
        })
    }
}

function getEditForm(record, setURL) {
    if (!w2ui['PackageEditGeneral']) {
        $().w2layout({
            name: 'PackageEditGeneral',
            panels: [
                {type: 'left', size: 150, resizable: true, minSize: 35},
                {type: 'main', overflow: 'hidden'}
            ],
            onRender: (event) => {
                if (event.target === 'PackageEditGeneral') {
                    if (w2ui.PackageEditGeneral.record) {
                        w2ui.PackageEditGeneral.record = {};
                    }
                }
            }
        });
    }
    if (!w2ui['PackageEditTabs']) {
        $().w2sidebar({
            name: 'PackageEditTabs',
            flatButton: true,
            nodes: [
                {id: 'docs', text: 'Docs', selected: true},
                {id: 'interfaces', text: 'Interfaces'},
                {id: 'handlers', text: 'Handlers'},
                {id: 'models', text: 'Models'},
                {id: 'subpackages', text: 'Sub Packages'},
                {id: 'usecases', text: 'Use Cases'},
                {id: 'workflows', text: 'Workflows'},
            ],
            onClick(event) {
                switch (event.target) {
                    case 'docs':
                        w2ui['PackageEditGeneral'].html('main', w2ui.PackageEditDoc);
                        break;
                    case 'models':
                        w2ui['PackageEditGeneral'].html('main', w2ui.PackageEditModels);
                        break;
                    case 'usecases':
                        w2ui['PackageEditGeneral'].html('main', w2ui.PackageEditUseCases);
                        break;
                    case 'interfaces':
                        w2ui['PackageEditGeneral'].html('main', w2ui.PackageEditInterfaces);
                        break;
                    case 'handlers':
                        w2ui['PackageEditGeneral'].html('main', w2ui.PackageEditHandlers);
                        break;
                    case 'subpackages':
                        w2ui['PackageEditGeneral'].html('main', w2ui.PackageEditSubPackages);
                        break;
                    case 'workflows':
                        w2ui['PackageEditGeneral'].html('main', w2ui.PackageEditWorkflows);
                        break;
                }
            }
        });
    }
    _createPackageEditDoc(record, setURL);
    _createPackageEditModels(record, setURL);
    _createPackageEditUseCases(record, setURL);
    _createPackageEditInterfaces(record, setURL);
    _createPackageEditHandlers(record, setURL);
    _createPackageEditSubPackages(record, setURL);
    _createPackageEditWorkflows(record, setURL);

    w2ui['PackageEditDoc'].record = record;
    w2ui['PackageEditModels'].record = record;
    w2ui['PackageEditUseCases'].record = record;
    w2ui['PackageEditInterfaces'].record = record;
    w2ui['PackageEditHandlers'].record = record;
    w2ui['PackageEditSubPackages'].record = record;
    w2ui['PackageEditWorkflows'].record = record;

    w2ui['PackageEditGeneral'].saveURL = setURL;
    w2ui.PackageEditGeneral.html('left', w2ui.PackageEditTabs);
    w2ui.PackageEditGeneral.html('main', w2ui.PackageEditDoc);
    return w2ui['PackageEditGeneral'];
}

function _createPackageEditDoc(record, setURL) {
    if (!w2ui.PackageEditDoc) {
        $().w2form({
            name: 'PackageEditDoc',
            saveURL: setURL,
            style: 'border: 0px; background-color: transparent;overflow:hidden; ',
            fields: [
                {
                    field: 'name',
                    type: 'text',
                    required: true,
                    readonly: true,
                    html: {
                        attr: 'style="width: 450px;',
                        caption: 'Name'
                    }
                },
                {
                    caption: 'Description',
                    field: 'description',
                    type: 'textarea',
                    html: {
                        attr: 'style="width: 450px; height: 50px;"',
                        caption: "Description" +
                            "<br><button class=AIButton id='packagegenerateDescription'></button>"
                    }
                },
                {
                    field: 'document',
                    type: 'textarea',
                    html: {
                        attr: 'style="width: 450px; height: 500px;"',
                        caption: "Details" +
                            "<br><button class=AIButton id='packagegenerateDocumentation'></button>"
                    }
                },
            ],
            onRender: (event) => {
                setTimeout(function () {
                    let textArea = document.querySelector("#document");
                    w2ui.PackageEditDoc.editors = {document: {}};
                    ClassicEditor.create(textArea)
                        .catch(error => {
                            console.log(error)
                        })
                        .then(editor => {
                            w2ui.PackageEditDoc.editors.document = editor;
                        });
                }, 10);
            },
            actions: {
                Save: function () {
                    let url = this.saveURL;
                    let newRecord = {};
                    for(let i in this.fields) {
                       newRecord[this.fields[i].field] = this.record[this.fields[i].field]
                        if(this.editors[this.fields[i].field]) {
                            newRecord[this.fields[i].field] = this.editors[this.fields[i].field].getData();
                        }
                    }

                    $.ajax({
                        url: url, data: newRecord, success: function (results) {
                            alert("Saved");
                            // w2popup.close();
                        }, failure: function (results) {
                            console.error(results);
                        }
                    });
                },
                Reset: function () {
                    this.clear();
                },
                cancel: {
                    caption: "Cancel", style: 'background: pink;', onClick(event) {
                        w2popup.close();
                    },
                },
            }
        });
        $(document).ready(function () {
            $(document).on('click', "#packagegenerateDescription", function () {
                let clsid = w2ui.PackageEditDoc.record.name;
                let url = `package/generate?target=Description&id=${clsid}`;
                w2ui.PackageEditDoc.lock('description', true);
                w2ui.PackageEditDoc.refresh();
                $('html').css('cursor', 'wait');
                $.ajax({
                    url: url,
                    success: function (results) {
                        $('html').css('cursor', 'auto');
                        w2ui.PackageEditDoc.unlock('description', true);
                        w2ui.PackageEditDoc.record.description = results;
                        w2ui.PackageEditDoc.refresh();
                        w2ui.PackageEditTabs.click('docs');
                    },
                    failure: function (results) {
                        console.error(results);
                    }
                });
            });
            $(document).on('click', "#packagegenerateDocumentation", function () {
                let clsid = w2ui.PackageEditDoc.record.name;
                let url = `package/generate?target=Documentation&id=${clsid}`;
                w2ui.PackageEditDoc.lock('Generating...', true);
                w2ui.PackageEditDoc.refresh();
                $('html').css('cursor', 'wait');
                $.ajax({
                    url: url,
                    success: function (results) {
                        w2ui.PackageEditDoc.unlock('document', true);
                        w2ui.PackageEditDoc.record.document = results;
                        w2ui.PackageEditDoc.refresh();
                        $('html').css('cursor', 'auto');
                        w2ui.PackageEditTabs.click('docs');
                    },
                    failure: function (results) {
                        console.error(results);
                    }
                });
            });
        })
    }
}

function _createPackageEditModels(record, setURL) {
    if (!w2ui.PackageEditModels) {
        $().w2grid({
            name: 'PackageEditModels',
            header: 'Models',
            show: {
                header: true,
                columnHeaders: true,
                toolbar: true,
                toolbarSave: true,
                toolbarAdd: true,
                toolbarEdit: true,
                toolbarDelete: true
            },
            toolbar: {
                items: [
                    {id: 'generate', type: 'button', img: 'aibutton'}
                ],
                onClick(event) {
                    if (event.target === 'generate') {
                        let clsid = w2ui.PackageEditModels.record.name;
                        let url = `package/generateModels?id=${clsid}`;
                        w2ui.PackageEditModels.lock('Generating...', true);
                        w2ui.PackageEditModels.refresh();
                        $('html').css('cursor', 'wait');
                        $.ajax({
                            url: url,
                            success: function (results) {
                                w2ui.PackageEditModels.unlock();
                                w2ui.PackageEditModels.record.usecases = results;
                                $('html').css('cursor', 'auto');
                                w2ui.PackageEditTabs.click('usecases');
                            },
                            failure: function (results) {
                                console.error(results);
                            }
                        });
                    }
                }
            },
            onAdd: (event) => {
            },
            onSave: (event) => {
                let changes = w2ui['ModelEditStateNet'].getChanges();
                let records = w2ui['ModelEditStateNet'].records
                for (let i in changes) {
                    let change = changes[i];
                    let rec = null;
                    for (let j in records) {
                        if (records[j].recid === change.recid) {
                            rec = records[j];
                            break;
                        }
                    }
                    // Just updating the episode
                    if (rec.id) {
                        let url = `episode/save?id=${rec.id}`;
                        for (let i in change) {
                            if (i === "date") {
                                url += `&releaseDate=${change[i]}`;
                            } else {
                                url += `&${i}=${change[i]}`;
                            }
                        }
                        $.ajax({
                            url: url,
                            success: function (results) {
                                console.log("results", results);
                            }
                        });
                    } else {
                    }
                }
            },
            onEdit: (event) => {
                // Open the Episode Edit Dialog

                let record = w2ui['ModelEditStateNet'].records[event.recid];
                if (record.recid != event.recid) {
                    for (let i in w2ui.ModelEditStateNet.records) {
                        if (w2ui.ModelEditStateNet.records[i].recid === event.recid) {
                            record = w2ui.ModelEditStateNet.records[i];
                            break;
                        }
                    }
                }
                record._id = record.id;
//                EpisodeView.openDialog(record, "PodcastEdit");
            },
            onDelete: (event) => {
                let selected = w2ui['ModelEditStateNet'].getSelection();
                console.log("Delete", selected);
            },
            onRender: (event) => {
                let records = [];
                let count = 0;
                for (let name in w2ui.PackageEditModels.record.classes) {
                    let usecase = w2ui.PackageEditModels.record.classes[name];
                    records.push({
                        recid: count++,
                        name: usecase.name,
                        description: usecase.description,
                    });
                }
                w2ui.PackageEditModels.records = records;
                w2ui.PackageEditModels.sort('name', 'desc');
                setTimeout(function () {
                    w2ui.PackageEditModels.refreshBody();
                }, 10);
            },
            onSelect: (event) => {
                let selected = null;
                for (let i in w2ui.ModelEditStateNet.records) {
                    let record = w2ui.ModelEditStateNet.records[i];
                    if (record.recid === parseInt(event.recid)) {
                        selected = record;
                    }
                }
                // Now set the toolbar with the right states.
            },
            columns: [
                {
                    field: 'name',
                    caption: 'Name',
                    size: '30%',
                    resizable: true,
                    editable: {type: 'text'},
                    sortable: true,
                },
                {
                    field: 'description',
                    caption: 'Description',
                    size: '70%',
                    resizable: true,
                    editable: {type: 'text'},
                    sortable: true,
                },

            ]
        });
    }
}

function _createPackageEditUseCases(record, setURL) {
    let config = {
        name: "PackageEditUseCases",
        title: "Use Cases",
        generateURL: 'package/generate?target=UseCases',
        tab: 'usecases',
        saveURL: "package/save",
        attribute: 'usecases',
        columns: [
            {
                field: 'name',
                caption: 'Name',
                size: '30%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => { return value.name; }
            },
            {
                field: 'actors',
                caption: 'Actors',
                size: '15%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => { return Object.keys(value.actors).join(', '); }
            },
            {
                field: 'scenarios',
                caption: 'Scenarios',
                size: '5%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => { return Object.keys(value.scenarios).length; }
            },
            {
                field: 'description',
                caption: 'Description',
                size: '50%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => { return value.description; }
            },

        ]
    }
    _createCharacteristicGrid(config);
}

function _createPackageEditInterfaces(record, setURL) {
    let config = {
        name: "PackageEditInterfaces",
        title: "Interface",
        generateURL: 'package/generate?target=Interfaces',
        tab: 'interface',
        saveURL: "package/save",
        attribute: 'interface',
        columns: [
            {
                field: 'friendly',
                caption: 'Name',
                size: '15%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => {
                    return value.friendlyName;
                }
            },
            {
                field: 'name',
                caption: 'Path',
                size: '25%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => {
                    return name;
                }
            },
            {
                field: 'description',
                caption: 'Description',
                size: '60%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => {
                    return value.description;
                }
            },

        ]
    };
    _createCharacteristicGrid(config);
}

function _createPackageEditHandlers(record, setURL) {
    let config = {
        name: "PackageEditHandlers",
        title: "Handlers",
        generateURL: 'package/generate?target=Handlers',
        tab: 'handlers',
        saveURL: "package/save",
        attribute: 'handlers',
        columns: [
            {
                field: 'name',
                caption: 'Event',
                size: '20%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => {
                    return name;
                }
            },
            {
                field: 'emitter',
                caption: 'Emitter',
                size: '20%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => {
                    return value.emitter?.name || "N/A";
                }
            },
            {
                field: 'handlers',
                caption: 'Handlers',
                size: '60%',
                resizable: true,
                editable: false,
                sortable: false,
                fn: (name, value) => {
                    let handlers = [];
                    for(let i in value.handlers) {
                        if(value.handlers[i].action) {
                            handlers.push(value.handlers[i].action);
                        } else { handlers.push("Custom")}
                    }
                    return handlers.join(',');
                }
            },

        ]
    };
    _createCharacteristicGrid(config);
}

function _createPackageEditSubPackages(record, setURL) {
        let config = {
            name: "PackageEditSubPackages",
            title: "Sub Packages",
            generateURL: 'package/generate?target=SubPackages',
            tab: 'subpackages',
            saveURL: "package/save",
            attribute: 'subpackages',
            columns: [
                {
                    field: 'name',
                    caption: 'Name',
                    size: '20%',
                    resizable: true,
                    editable: {type: 'text'},
                    sortable: true,
                    fn: (name, value) => {
                        return value.name;
                    }
                },
                {
                    field: 'short',
                    caption: 'Short',
                    size: '10%',
                    resizable: true,
                    editable: {type: 'text'},
                    sortable: true,
                    fn: (name, value) => {
                        return value.shortname;
                    }
                },
                {
                    field: 'description',
                    caption: 'Description',
                    size: '60%',
                    resizable: true,
                    editable: {type: 'text'},
                    sortable: true,
                    fn: (name, value) => {
                        return value.description;
                    }
                },

            ]
        };
        _createCharacteristicGrid(config);
}
function _createPackageEditWorkflows(record, setURL) {
    let config = {
        name: "PackageEditWorkflows",
        title: "Workflows",
        generateURL: 'package/generate?target=Workflows',
        tab: 'workflows',
        saveURL: "package/save",
        attribute: 'workflows',
        columns: [
            {
                field: 'name',
                caption: 'Name',
                size: '30%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => {
                    return name;
                }
            },
            {
                field: 'description',
                caption: 'Description',
                size: '70%',
                resizable: true,
                editable: {type: 'text'},
                sortable: true,
                fn: (name, value) => {
                    return value.description;
                }
            },

        ]
    };
    _createCharacteristicGrid(config);
}
function _createCharacteristicGrid(config) {
    if (!w2ui[config.name]) {
        $().w2grid({
            name: config.name,
            header: config.title,
            show: {
                header: true,
                columnHeaders: true,
                toolbar: true,
                toolbarSave: true,
                toolbarAdd: true,
                toolbarEdit: true,
                toolbarDelete: true
            },
            toolbar: {
                items: [
                    {id: 'generate', type: 'button', img: 'aibutton'}
                ],
                onClick(event) {
                    if (event.target === 'generate') {
                        let clsid = w2ui[config.name].record.name;
                        let url = `${config.generateURL}&id=${clsid}`;
                        w2ui[config.name].lock('Generating...', true);
                        w2ui[config.name].refresh();
                        $('html').css('cursor', 'wait');
                        $.ajax({
                            url: url,
                            success: function (results) {
                                w2ui[config.name].unlock();
                                w2ui[config.name].record = results;
                                $('html').css('cursor', 'auto');
                                w2ui.PackageEditTabs.click(config.tab);
                            },
                            failure: function (results) {
                                console.error(results);
                            }
                        });
                    }
                }
            },
            onAdd: (event) => {
            },
            onSave: (event) => {
                let changes = w2ui[config.name].getChanges();
                let records = w2ui[config.name].records;
                for (let i in changes) {
                    let change = changes[i];
                    let rec = null;
                    for (let j in records) {
                        if (records[j].recid === change.recid) {
                            rec = records[j];
                            break;
                        }
                    }
                    // Just updating the episode
                    if (rec.id) {
                        let url = `${config.saveURL}?id=${rec.id}`;
                        for (let i in change) {
                            url += `&${i}=${change[i]}`;
                        }
                        $.ajax({
                            url: url,
                            success: function (results) {
                                console.log("results", results);
                            }
                        });
                    } else {
                    }
                }
            },
            onEdit: (event) => {
                // Open the Episode Edit Dialog
                let records = w2ui[config.name].records;
                let rec = null;
                for (let j in records) {
                    if (records[j].recid === change.recid) {
                        rec = records[j];
                        break;
                    }
                }
            },
            onDelete: (event) => {
                let selected = w2ui[config.name].getSelection();
                console.log("Delete", selected);
            },
            onRender: (event) => {
                let records = [];
                let count = 0;
                for (let name in w2ui[config.name].record[config.attribute]) {
                    let value = w2ui[config.name].record[config.attribute][name];
                    let record = {
                        recid: count++
                    };
                    for(let i in config.columns) {
                        let col = config.columns[i];
                        record[col.field] = col.fn(name,value);
                    }
                    records.push(record);
                }
                w2ui[config.name].records = records;
                w2ui[config.name].sort('name', 'desc');
                setTimeout(function () {
                    w2ui[config.name].refreshBody();
                }, 10);
            },
            columns: config.columns,
        });
    }
}

function getDetails(objs, idfn) {
    let items = [];
    let inum = 0;
    for (let j in objs) {
        let item = objs[j];
        inum++;
        let name = item.name || j;
        let id = name;
        if (idfn) {
            id = idfn(j, item)
        }
        items.push(`${id}^${name}^${item.description}`);
    }
    return items;
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
        } else if (direction === 'left') {
            let offset = {
                w: Math.max(parentNode.cube.z / (size.box.cols + 1), size.stats.w.max) * 1.10,
                h: Math.max(parentNode.cube.y / (size.box.rows + 1), size.stats.h.max) * 1.10
            }
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.min - size.stats.d.max,
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


function _setGraphToolbar(object) {
    const distance = 1750;
    window.graph.toolbar.setToolBar([
        {
            type: 'button', id: 'classes', text: 'Classes', img: 'w2ui-icon-search',
            onClick: (event) => {
                // 3D stuff;
                window.graph.graph.cameraPosition(
                    {x: 0, y: -0, z: -distance}, // new position
                    {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                    1000
                );
                // 2D Stuff
                let div = document.getElementById('preview2d');
                div.innerHTML = "Fetching UML diagram";
                $.ajax({
                    url: object.link2d +"&diagram=Logical",
                    success: (results) => {
                        div.innerHTML = results;
                    },
                    error: (req, text, err) => {
                        console.error(text);
                    }
                });
            }
        },
        {
            type: 'button', id: 'subpackage', text: 'Sub Packages', img: 'w2ui-icon-search',
            onClick: (event) => {
                window.graph.graph.cameraPosition(
                    {x: 0, y: -distance, z: 0}, // new position
                    {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                    1000
                );
                // 2D Stuff
                let div = document.getElementById('preview2d');
                div.innerHTML = "Fetching UML diagram";
                $.ajax({
                    url: object.link2d +"&diagram=SubPackage",
                    success: (results) => {
                        let div = document.getElementById('preview2d');
                        div.innerHTML = results;
                    },
                    error: (req, text, err) => {
                        console.error(text);
                    }
                });
            }
        },
        {
            type: 'button', id: 'interface', text: 'Interface', img: 'w2ui-icon-search',
            onClick: (event) => {
                window.graph.graph.cameraPosition(
                        {x: 0, y: distance, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                // 2D
                let div = document.getElementById('preview2d');
                div.innerHTML = "Fetching UML diagram";
                $.ajax({
                    url: object.link2d +"&diagram=ScenarioMapping",
                    success: (results) => {
                        div.innerHTML = results;
                    },
                    error: (req, text, err) => {
                        console.error(text);
                    }
                });
            }
        },
        {
            type: 'button', id: 'handlers', text: 'Handlers', img: 'w2ui-icon-search',
            onClick: (event) => {
                window.graph.graph.cameraPosition(
                    {x: distance, y: 0, z: 0}, // new position
                    {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                    1000
                );
                // 2D
                let div = document.getElementById('preview2d');
                div.innerHTML = "Fetching UML diagram";
                $.ajax({
                    url: object.link2d +"&diagram=Handlers",
                    success: (results) => {
                        div.innerHTML = results;
                    },
                    error: (req, text, err) => {
                        console.error(text);
                    }
                });
            }
        },
        {
            type: 'button', id: 'usecases', text: 'UseCases', img: 'w2ui-icon-search',
            onClick: (event) => {
                window.graph.graph.cameraPosition(
                    {x: 0, y: -distance, z: 0}, // new position
                    {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                    1000
                );
                // 2D
                let div = document.getElementById('preview2d');
                div.innerHTML = "Fetching UML diagram";
                $.ajax({
                    url: object.link2d +"&diagram=UseCases",
                    success: (results) => {
                        div.innerHTML = results;
                    },
                    error: (req, text, err) => {
                        console.error(text);
                    }
                });
            }
        },
        {
            type: 'button', id: 'dependents', text: 'Dependents', img: 'w2ui-icon-search',
            onClick: (event) => {
                window.graph.graph.cameraPosition(
                    {x: -distance, y: 0, z: 0}, // new position
                    {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                    1000
                );
                // 2D
                let div = document.getElementById('preview2d');
                div.innerHTML = "Fetching UML diagram";
                $.ajax({
                    url: object.link2d +"&diagram=SubPackage",
                    success: (results) => {
                        div.innerHTML = results;
                    },
                    error: (req, text, err) => {
                        console.error(text);
                    }
                });
            }
        },
    ]);
}
function getPackageNodes(pkg) {
    let sitems = [];
    for (let pname in pkg.subpackages) {
        let spkg = pkg.subpackages[pname];
        let spkgi = {
            id: spkg.shortname,
            text: spkg.name,
            img: 'icon-folder',
            link: `package/get?id=${pname}`,
            link2d: `package/uml?id=${pname}`,
            view: 'package'
        };
        if (spkg.subpackages) {
            let spkgs = getPackageNodes(spkg);
            spkgi.nodes = spkgs;
            spkgi.count = spkgs.length;
        }
        sitems.push(spkgi);
    }
    for (let cname in pkg.classes) {
        let cls = pkg.classes[cname];
        let citem = {
            id: cls.name,
            text: cls.name,
            img: 'icon-page',
            link: `model/get?id=${cname}`,
            link2d: `model/uml?id=${cname}`,
            view: 'model'
        };
        sitems.push(citem);
    }
    return sitems;
}
