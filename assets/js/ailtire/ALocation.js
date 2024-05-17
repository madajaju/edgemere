/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AText, ADevice, ASelectedHUD, ANetwork } from './index.js';

export default class ALocation {
    constructor(config) {
        this.config = config;
    }

    static default = {
        fontSize: 20,
        height: 40,
        width: 40,
        depth: 5
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        let height = nameArray.length * ALocation.default.fontSize * 1.2 + ALocation.default.height;
        let width = maxLetters * (ALocation.default.fontSize / 1.2);
        let depth = ALocation.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: ALocation.default.depth, r: radius};
    }

    static showList(panel, parent) {
        $.ajax({
            url: 'physical/location',
            success: function (results) {
                // Set up the links to parent child tree
                for (let name in results) {
                    let image = results[name];
                    let item = {
                        id: name + '-image',
                        text: name,
                        tag: image.name,
                        img: 'icon-page',
                        nodes: [],
                        link: `physical/location?name=${name}`,
                        view: 'image'
                    };
                    w2ui[panel].add(parent, item);
                    if (image.base) {
                        image.base = results[image.base];
                    }
                }
            }
        });
    }

    static view3D(node, type) {
        let color = node.color || "#885544";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = Math.PI / 2;
        const opacity = node.opacity || 1;
        let size = ALocation.calculateBox(node);
        let shape = node.cube || {x: size.w, y: size.h, z: size.d};

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
        const stack = new THREE.BoxGeometry(shape.x, shape.y, shape.z)
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        let label = AText.view3D({
            text: node.name,
            color: "#ffffff",
            width: size.width,
            size: ALocation.default.fontSize
        });
        label.position.set(0, 0, (shape.z/2) + 2);
        obj.add(label);
        node.scale = node.scale || 1;
        obj.scale.set(node.scale,node.scale,node.scale);

        obj.position.set(node.x, node.y, node.z);
        if (node.rotate) {
            if (node.rotate.x) {
                obj.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if (node.rotate.y) {
                obj.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if (node.rotate.z) {
                obj.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        obj.aid = node.id;
        node.box = size.r * node.scale;
        node.expandLink = node.expandLink || `nolink`;
        node.expandView = node.expandView || ALocation.handle;
        node.getDetail = ALocation.getDetail;

        return obj;
    }

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                ALocation.showDetail(results);
            }
        });
    }

    static showDetail(result) {
        let records = [];
        if (!w2ui['objlist']) {
            $('#objlist').w2grid({name: 'objlist'});
        }
        w2ui['objlist'].result = result;
        if (!w2ui['objdetail']) {
            $('#objdetail').w2grid({
                name: 'objdetail',
                header: 'Details',
                show: {header: true, columnHeaders: false},
                columns: [
                    {
                        field: 'name',
                        label: 'Name',
                        size: '100px',
                        style: 'background-color: #efefef; border-bottom: 1px solid white; padding-right: 5px;',
                        attr: "align=right"
                    },
                    {
                        field: 'value', label: 'Value', size: '100%', render: function (record) {
                            return '<div>' + record.value + '</div>';
                        }
                    }
                ]
            });
        }
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
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, label: "Value", sortable: true},
        ];
        w2ui['objlist'].columns = cols;
        let i = 0;
        for (let name in result) {
            if (typeof result[name] === 'string') {
                records.push({recid: i++, name: name, value: result[name], detail: result[name]});
            }
        }
        for (let j in result.devices) {
            let device = result.devices[j];
            records.push({recid: i++, name: "Device", value: device.name, detail: device});
        }
        w2ui['objlist'].onClick = function (event) {
            // this.showDetail(event);
            w2ui['objdetail'].clear();
            let record = this.get(event.recid);
            let drecords = [];
            let k = 0;
            for (let rname in record.detail) {
                k++;
                if (typeof record.detail[rname] === 'string') {
                    drecords.push({recid: k, name: rname, value: record.detail[rname]});
                }
            }
            w2ui['objdetail'].add(drecords)
            window.graph.selectNodeByID(event.recid);
        }
        w2ui['objlist'].records = records;
        ASelectedHUD.update('Location', records);
        w2ui['objlist'].refresh();
    }

    static viewDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        const size = ALocation.calculateDeepBox(obj);
        window.graph.clearObjects();
        ANetwork.clearNetworkColor();
        let node = {
            id: obj.name,
            name: obj.name.replace(/\s/g, '\n'),
            view: ALocation.view3D,
            color: obj.color,
            opacity: 0.5,
            fx: 0,
            fy: 0,
            fz: 0,
            box: 0.1,
            cube: { x: size.w, y: size.h, z: size.d },
            expandView: ALocation.handle,
            expandLink: `nolink`
        };

        data.nodes[node.id] = node;

        // Device Nodes
        let snodes = [];
        for (let name in obj.storage) {
            let nobj = obj.storage[name];
            let cnode = ADevice.create3DNode(nobj, data, "back");
            data.nodes[cnode.id] = cnode;
            snodes.push(cnode);
        }
        _layoutRowColumn(node, snodes, size.storage, "back");

        let cnodes = [];
        for (let name in obj.compute) {
            let nobj = obj.compute[name];
            let cnode = ADevice.create3DNode(nobj, data, "top");
            cnodes.push(cnode);
            // Add the storage connections.
            let ids = cnode.id.split('.');
            for(let i in nobj.disks) {
                let shareID = ids[0] + '.' + nobj.disks[i].volume;
                if(data.nodes.hasOwnProperty(shareID)) {
                    data.links.push({target: cnode.id, source: shareID, width: 1.0, value: 10});
                }
            }
        }
        _layoutRowColumn(node, cnodes, size.compute, "top");

        let nnodes = [];
        for (let name in obj.network) {
            let nobj = obj.network[name];
            let cnode = ADevice.create3DNode(nobj, data, "left");
            data.nodes[cnode.id] = cnode;
            for(let i in nobj.networks) {
                let nname = nobj.networks[i];
                data.nodes[nname] = {
                    id: nname,
                    color: ANetwork.getNetworkColor(nname),
                    name: nname,
                    view: ANetwork.view3D,
                    rotate: {y: Math.PI/2},
                    rbox: {
                        parent: node.id,
                        fz: 0,
                        fx: size.w / 2,
                        y: {min: -size.h / 2, max: size.h / 2}
                    }
                }
            }
            nnodes.push(cnode);
        }
        _layoutRowColumn(node, nnodes, size.network, "left");

        let onodes = [];
        for (let name in obj.other) {
            let nobj = obj.other[name];
            let cnode = ADevice.create3DNode(nobj, data, "back");
            onodes.push(cnode);
        }
        _layoutRowColumn(node, onodes, size.network, "back");
        setTimeout(() => {
            window.graph.graph.zoomToFit(1000)
        }, 4500);
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.showLinks();
    }

    static handle(results) {
        ALocation.viewDeep3D(results, "new");
        ALocation.showDetail(results);
    }

    static _iterateViewDeep3D(obj, parent, nodes, links) {
    }

    static handleList(result) {
        // ALocation.viewList3D(result, 'new');
        // ALocation.showListDetail(result);
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
        asize.box.w = Math.max(Math.sqrt(asize.stats.area), asize.stats.r.max * (asize.box.cols + 0.5));
        asize.box.h = Math.max(Math.sqrt(asize.stats.area), asize.stats.r.max * (asize.box.rows + 0.5));
        return asize;
    }

    static calculateDeepBox(location) {
        location.storage = {};
        location.compute = {};
        location.network = {};
        location.other = {};
        for (let i in location.devices) {
            let device = location.devices[i];
            if (device.kind === 'storage') {
                location.storage[device.id] = device;
            } else if (device.kind === 'compute') {
                location.compute[device.id] = device;
            } else if (device.kind === 'network') {
                location.network[device.id] = device;
            } else {
                location.network[device.id] = device;
            }
        }

        let sbox = ALocation.calculateGroupBox(location.storage, ADevice.calculateBox); // XZ
        let cbox = ALocation.calculateGroupBox(location.compute, ADevice.calculateBox); // XZ
        let nbox = ALocation.calculateGroupBox(location.network, ADevice.calculateBox); // YZ
        let obox = ALocation.calculateGroupBox(location.other, ADevice.calculateBox); // YZ

        /* X is always the width, Y is height with X, Y is width with Z, Z is always h */
        let fontWidth = location.name.length * ALocation.default.fontSize / 2;
        const wnum = Math.max(sbox.box.w, cbox.box.w, 100, fontWidth);
        const hnum = Math.max(nbox.box.h, obox.box.h, 100);
        const dnum = Math.max(sbox.box.h, cbox.box.h, nbox.box.w, obox.box.w, 100);

        const radius = Math.max(Math.sqrt(wnum ** 2 + hnum ** 2), Math.sqrt(hnum ** 2 + dnum ** 2), Math.sqrt(wnum ** 2 + dnum ** 2));
        return {
            w: wnum * 1.10, h: hnum * 1.10, d: dnum * 1.10, r: radius,
            storage: sbox,
            compute: cbox,
            network: nbox,
            other: obox
        }
    }

}

function

getDetails(objs) {
    let items = [];
    let inum = 0;
    for (let name in objs) {
        inum++;
        items.push(name);
    }
    return items;
}

function

_layoutRowColumn(parentNode, nodes, size, direction) {
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
                w: Math.max(parentNode.cube.x / (size.box.cols + 1), size.stats.w.max) * 1.20,
                h: Math.max(parentNode.cube.z / (size.box.rows + 1), size.stats.h.max) * 1.20
            }
            node.rotate = {x:-Math.PI/2};
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.min + offset.w / 2 + (col * offset.w),
                fy: bbox.y.max,
                fz: bbox.z.max - offset.h / 2 - (row * offset.h),
            }
        } else if (direction === 'bottom') {
            let offset = {
                w: Math.max(parentNode.cube.x / (size.box.cols + 1), size.stats.w.max) * 1.20,
                h: Math.max(parentNode.cube.z / (size.box.rows + 1), size.stats.h.max) * 1.20
            }
            node.rotate = {x:Math.PI/2};
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.min + offset.w / 2 + (col * offset.w),
                fy: bbox.y.min - 30,
                fz: bbox.z.max - offset.h / 2 - (row * offset.h),
            }
        } else if (direction === 'right') {
            let offset = {
                w: Math.max(parentNode.cube.z / (size.box.cols + 1), size.stats.w.max) * 1.20,
                h: Math.max(parentNode.cube.y / (size.box.rows + 1), size.stats.h.max) * 1.20
            }
            node.rotate = {y:Math.PI/2};
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.max,
                fy: bbox.y.max - offset.h / 2 - (row * offset.h),
                fz: bbox.z.max - offset.w / 2 - (col * offset.w),
            }
        } else if (direction === 'left') {
            let offset = {
                w: Math.max(parentNode.cube.z / (size.box.cols + 1), size.stats.w.max) * 1.20,
                h: Math.max(parentNode.cube.y / (size.box.rows + 1), size.stats.h.max) * 1.20
            }
            node.rotate = {y:-Math.PI/2};
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.min - size.stats.d.max,
                fy: bbox.y.max - offset.h / 2 - (row * offset.h),
                fz: bbox.z.max - offset.w / 2 - (col * offset.w),
            }
        } else if (direction === 'back') {
            let offset = {
                w: Math.max(parentNode.cube.x / (size.box.cols + 1), size.stats.w.max) * 1.20,
                h: Math.max(parentNode.cube.y / (size.box.rows + 1), size.stats.h.max) * 1.20
            }
            node.rotate = {y:Math.PI};
            node.rbox = {
                parent: prevNode.id,
                fx: bbox.x.max - offset.w / 2 - (col * offset.w),
                fz: bbox.z.min,
                fy: bbox.y.max - offset.h / 2 - (row * offset.h),
            }
        } else if (direction === 'front') {
            let offset = {
                w: Math.max(parentNode.cube.x / (size.box.cols + 1), size.stats.w.max) * 1.20,
                h: Math.max(parentNode.cube.y / (size.box.rows + 1), size.stats.h.max) * 1.20
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
