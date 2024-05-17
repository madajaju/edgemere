/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AAction, AAttribute, AImage, AInterface, ANetwork, AService, AText, AVolume, A3DGraph, ASelectedHUD} from './index.js';

export default class AStack {
    constructor(config) {
        this.config = config;
    }

    static default = {
        fontSize: 20,
        height: 30,
        width: 30,
        depth: 15
    }

    static calculateBox(node) {
        let fontSize = node.fontSize || AStack.default.fontSize;
        let height = AStack.default.height * 2;
        let depth = AStack.default.depth * 2;
        let width = AStack.default.width * 2;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth))/2;
        return {w: width, h: height, d: depth, r: radius};
    }

    static view3D(node, type) {
        let color = node.color || "#aa4455";
        let fontSize = node.fontSize || AStack.default.fontSize;
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = Math.PI / 2;
        const locations = [
            {x: 0, y: 0, z: 0},
            {x: -AStack.default.width / 2, y: -AStack.default.height, z: AStack.default.depth / 2},
            {x: AStack.default.width / 2, y: -AStack.default.height, z: AStack.default.depth / 2},
            {x: 0, y: -AStack.default.height, z: -AStack.default.depth},
        ]
        const opacity = node.opacity || 0.5;
        const size = AStack.calculateBox(node);

        const group = new THREE.Group();
        for (let i = 0; i < locations.length; i++) {
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
            const stack = new THREE.CylinderGeometry(7.5, 15, 30, 20);
            let obj = new THREE.Mesh(stack, material);
            obj.position.set(locations[i].x, locations[i].y, locations[i].z);
            group.add(obj);
        }

        let label = AText.view3D({text: node.name, color: "#ffffff", width: size.w, size: fontSize});
        label.position.set(0, 0, size.d);
        group.add(label);

        group.position.set(node.x, node.y, node.z);
        if (node.rotate) {
            if (node.rotate.x) {
                group.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if (node.rotate.y) {
                group.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if (node.rotate.z) {
                group.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        group.aid = node.id;
        node.box = size.r;
        node.expandView = AStack.handle;
        node.expandLink = `deployment/get?id=${node.id}`;
        node.getDetail = AStack.getDetail;

        return group;
    }

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AStack.showDetail(results);
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
        records.push({recid: i++, id: 'id', value: result.id, detail: result.id});
        records.push({recid: i++, name: 'name', value: result.name, detail: result.name});
        let services = getDetails(result.services);
        records.push({recid: i++, name: 'Services', value: services.length, detail: services.join('|')});
        let interfaces = getDetails(result.interface);
        records.push({recid: i++, name: 'Interface', value: interfaces.length, detail: interfaces.join('|')});
        let networks = getDetails(result.networks);
        records.push({recid: i++, name: 'Networks', value: networks.length, detail: networks.join('|')});
        let vols = getDetails(result.volumes);
        records.push({recid: i++, name: 'Volumes', value: vols.length, detail: vols.join('|')});
        let cfgs = getDetails(result.configs);
        records.push({recid: i++, name: 'Configs', value: cfgs.length, detail: cfgs.join('|')});

        w2ui['objlist'].records = records;
        // Clear the detail list
        w2ui['objdetail'].clear();
        w2ui['objlist'].onClick = function (event) {
            w2ui['objdetail'].clear();
            let record = this.get(event.recid);
            let drecords = [];
            let k = 0;
            let values = record.detail.split('|');
            for (let i in values) {
                let value = values[i];
                k++;
                drecords.push({recid: k, name: record.name, value: value});
            }
            w2ui['objdetail'].add(drecords);
            window.graph.selectNodeByID(event.recid);
        }
        ASelectedHUD.update("Stack", records);
        w2ui['objlist'].refresh();
    }

    static viewBig3D(node, type) {
        let color = node.color || "#aa4455";
        let fontSize = node.fontSize || AStack.default.fontSize;
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let w = 100;
        let h = 100;
        let d = 100;
        if (node.cube) {
            w = node.cube.x;
            h = node.cube.y;
            d = node.cube.z;
        }
        let opacity = node.opacity || 1;

        let geometry = new THREE.BoxGeometry(w, h, d);
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
        // Find the Model Element and show it here.
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
        let label = AText.view3D({text: node.name, color: "#ffffff", width: w, size: fontSize});
        // label.applyMatrix4(new THREE.Matrix4().makeScale(w/100, w/100, w/100));
        label.position.set(0, (h / 2) - fontSize, (d / 2) + 2);
        retval.add(label)
        if (typeof node.box !== 'string') {
            node.box = node.box || Math.sqrt(d * d + h * h + w * w);
        } else {
            node.box = null;
        }
        node.expandLink = `deployment/get?id=${node.id}`;
        node.getDetail = AStack.getDetail;
        return retval;
    }

    static viewDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        const theta = 3.14 / 2;
        let color = obj.color || "#dd88aa";
        obj.fontSize = 30;
        let size = AStack.calculateDeepBox(obj);

        const cube = {
            x: size.w,
            y: size.h,
            z: size.d
        }
        data.nodes[obj.id] = {
            id: obj.id,
            name: obj.name + "\n" + obj.id,
            view: AStack.viewBig3D,
            expandView: AStack.handle,
            expandLink: `deployment/get?id=${obj.id}`,
            getDetail: AStack.getDetail,
            fontSize: obj.fontSize,
            fx: 0, fy: 0, fz: 0,
            box: "None",
            cube: cube,
            color: color,
            opacity: 0.5
        };
        let inodes = {};
        let srnodes = {};
        let imnodes = {};
        let vnodes = {};

        for (let sname in obj.interface) {
            let inter = obj.interface[sname];
            data.nodes["I-" + sname] = {
                id: "I-" + sname,
                name: sname,
                view: AInterface.view3D,
            }
            inodes["I-" + sname] = data.nodes["I-" + sname];

            let service = obj.interface[sname].service;


            let view = AService.view3D;
            let expandView = AService.handle;
            if (service.type === 'stack' || service.type === 'Stack') {
                view = AStack.view3D;
                expandView = AStack.handle;
            }
            data.nodes[service.id] = {
                id: service.id,
                name: service.id,
                view: view,
                expandView: expandView,
                expandLink: `deployment/get?id=${service.id}`,
                rotate: {y: theta}
            };
            srnodes[service.id] = data.nodes[service.id];
            data.links.push({target: service.id, source: "I-" + sname, value: 0.1, width: 2.0});
            let image = service.image;
            data.nodes[`Img-${image}`] = {
                id: `Img-${image}`,
                name: image.replace(/:/, '\n'),
                view: AImage.view3D,
                rotate: {y: 2 * theta},
            };
            imnodes[`Img-${image}`] = data.nodes[`Img-${image}`];
            data.links.push({target: service.id, source: `Img-${image}`, value: 0.1, width: 2.0});

            for (let vname in service.volumes) {
                let vtest = service.volumes[vname];
                let volume = {};
                if(!vtest.hasOwnProperty('source')) {
                    [volume.source, volume.target] = vtest.split(':');
                } else {
                    volume = vtest;
                }
                data.nodes[volume.source] = {
                    id: volume.source,
                    name: volume.target,
                    view: AVolume.view3D,
                    rotate: {x: theta},
                };
                vnodes[volume.source] = data.nodes[volume.source];
                data.links.push({target: service.id, source: volume.source, value: 2, width: 2.0});
            }
            for (let nname in service.networks) {
                data.links.push({target: `Net-${nname}`, source: service.id, value: 0.1, width: 2.0});
            }
        }

        layoutRowColumn(data.nodes[obj.id], inodes, size.interface, "top");
        layoutRowColumn(data.nodes[obj.id], srnodes, size.services, "right");
        layoutRowColumn(data.nodes[obj.id], imnodes, size.images, "back");
        layoutRowColumn(data.nodes[obj.id], vnodes, size.volumes, "bottom");

        let nnodes = {};
        for (let nname in obj.networks) {
            let network = obj.networks[nname];
            data.nodes[`Net-${nname}`] = {
                id: `Net-${nname}`, name: nname, view: ANetwork.view3D,
                rotate: {y: -theta}
            };
            nnodes[`Net-${nname}`] = data.nodes[`Net-${nname}`];
        }
        layoutRowColumn(data.nodes[obj.id], nnodes, size.networks, "left");

        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.showLinks();

        window.graph.toolbar.setToolBar([
            {
                type: 'button', id: 'images', text: 'Images', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => {
                        window.graph.graph.cameraPosition(
                            {x: 0, y: 0, z: -1000}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => {
                        window.graph.graph.zoomToFit(1000)
                    }, 1500);
                }
            },
            {
                type: 'button', id: 'volumes', text: 'Volumes', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => {
                        window.graph.graph.cameraPosition(
                            {x: 0, y: -1000, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => {
                        window.graph.graph.zoomToFit(1000)
                    }, 1500);
                }
            },
            {
                type: 'button', id: 'interface', text: 'Interface', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => {
                        window.graph.graph.cameraPosition(
                            {x: 0, y: 1000, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => {
                        window.graph.graph.zoomToFit(1000)
                    }, 1500);
                }
            },
            {
                type: 'button', id: 'services', text: 'Services', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => {
                        window.graph.graph.cameraPosition(
                            {x: 1000, y: 0, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => {
                        window.graph.graph.zoomToFit(1000)
                    }, 1500);
                }
            },
            {
                type: 'button', id: 'network', text: 'Network', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => {
                        window.graph.graph.cameraPosition(
                            {x: -1000, y: 0, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => {
                        window.graph.graph.zoomToFit(1000)
                    }, 1500);
                }
            },
        ])

    }

    static handle(result) {
        AStack.viewDeep3D(result, 'new');
        AStack.showDetail(result);
    }

    static calculateDeepBox(node) {
        let fontSize = node.fontSize || AStack.default.fontSize;
        let fontWidth = fontSize * Math.max(node.name.length, node.id.length);
        let sbox = AStack.calculateGroupBox(node.services, AService.calculateBox); // right ZY
        let ibox = AStack.calculateGroupBox(node.interface, AInterface.calculateBox); // top XZ
        let vbox = AStack.calculateGroupBox(node.volumes, AVolume.calculateBox); // bottom XZ
        let nbox = AStack.calculateGroupBox(node.networks, ANetwork.calculateBox); // left ZY

        // Capture all of the images
        let images = [];
        for (let i in node.services) {
            let image = node.services[i];
            images.push({name: image.image});
        }
        let imbox = AStack.calculateGroupBox(images, AImage.calculateBox); // back XY

        const wnum = Math.max(100, fontWidth, ibox.box.w, vbox.box.w, imbox.box.w);
        const hnum = Math.max(100, sbox.box.h, nbox.box.h, imbox.box.h);
        const dnum = Math.max(100, sbox.box.w, nbox.box.w, ibox.box.h, vbox.box.h);

        const radius = Math.max(Math.sqrt(wnum ** 2 + hnum ** 2), Math.sqrt(hnum ** 2 + dnum ** 2), Math.sqrt(wnum ** 2 + dnum ** 2));
        return {
            w: wnum,
            h: hnum,
            d: dnum,
            r: radius,
            services: sbox,
            interface: ibox,
            volumes: vbox,
            networks: nbox,
            images: imbox
        };
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
}

function getDetails(objs) {
    let items = [];
    let inum = 0;
    for (let j in objs) {
        let item = objs[j];
        inum++;
        let name = item.name || j;
        items.push(`<span onclick="expandObject('${item.link}');">${name}</span>`);
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
        }  else if (direction === 'right') {
            let offset = {
                w: Math.max(parentNode.cube.z / (size.box.cols + 1), size.stats.w.max) * 1.10,
                h: Math.max(parentNode.cube.y / (size.box.rows + 1), size.stats.h.max) * 1.10
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
