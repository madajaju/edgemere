import {AUsecase, AModel, AText, AInterface, AHandler, A3DGraph, ASelectedHUD} from './index.js';

export default class APackage {
    constructor(config) {
        this.config = config;
    }

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
                orientation: {x:0,y:2, z:0}
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
                orientation: {x:1,y:0, z:0}
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
                orientation: {x:0,y:-1, z:0}
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
                orientation: {x:0,y:0, z:-1}
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
                orientation: {x:-1,y:0, z:0}
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
                orientation: {x:-1,y:0, z:0}
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

        window.graph.toolbar.setToolBar([
            {
                type: 'button', id: 'classes', text: 'Classes', img: 'w2ui-icon-search',
                onClick: (event) => {
                    let distance = Math.sqrt((size.w ) ** 2 + (size.h) ** 2) * 2;
                    window.graph.graph.cameraPosition(
                        {x: 0, y: -0, z: -distance}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                }
            },
            {
                type: 'button', id: 'subpackage', text: 'Sub Packages', img: 'w2ui-icon-search',
                onClick: (event) => {
                    let distance = Math.sqrt((size.w) ** 2 + (size.d ) ** 2) * 2;
                    window.graph.graph.cameraPosition(
                        {x: 0, y: -distance, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                }
            },
            {
                type: 'button', id: 'interface', text: 'Interface', img: 'w2ui-icon-search',
                onClick: (event) => {
                    let distance = Math.sqrt((size.w) ** 2 + (size.d ) ** 2) * 2;
                    window.graph.graph.cameraPosition(
                        {x: 0, y: distance, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                }
            },
            {
                type: 'button', id: 'handlers', text: 'Handlers', img: 'w2ui-icon-search',
                onClick: (event) => {
                    let distance = Math.sqrt((size.h ) ** 2 + (size.d) ** 2) * 2;
                    window.graph.graph.cameraPosition(
                        {x: distance, y: 0, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                }
            },
            {
                type: 'button', id: 'usecases', text: 'UseCases', img: 'w2ui-icon-search',
                onClick: (event) => {
                    let distance = Math.sqrt((size.w ) ** 2 + (size.h ) ** 2) * 2;
                    window.graph.graph.cameraPosition(
                        {x: 0, y: -distance, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                }
            },
            {
                type: 'button', id: 'dependents', text: 'Dependents', img: 'w2ui-icon-search',
                onClick: (event) => {
                    let distance = Math.sqrt((size.d ) ** 2 + (size.h ) ** 2) * 2;
                    window.graph.graph.cameraPosition(
                        {x: -distance, y: 0, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                }
            },
        ]);
    }

    static handle(result) {
        APackage.viewDeep3D(result, 'new');
        APackage.showDetail(result);
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

function getPackageNodes(pkg) {
    let sitems = [];
    for (let pname in pkg.subpackages) {
        let spkg = pkg.subpackages[pname];
        let spkgi = {
            id: spkg.shortname,
            text: spkg.name,
            img: 'icon-folder',
            link: `package/get?id=${pname}`,
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
            view: 'model'
        };
        sitems.push(citem);
    }
    return sitems;
}
