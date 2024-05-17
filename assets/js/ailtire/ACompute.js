/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AText, AStorage, ADevice, ASelectedHUD, ANetwork} from './index.js';

export default class ACompute {
    constructor(config) {
        this.config = config;
    }

    static default = {
        fontSize: 20,
        height: 40,
        width: 40,
        depth: 40,
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        let height = nameArray.length * ADevice.default.fontSize * 1.2 + ADevice.default.height;
        let width = maxLetters * (ADevice.default.fontSize / 1.2);
        let depth = ADevice.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: ADevice.default.depth, r: radius};
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
        let size = ACompute.calculateBox(node);
        let shape = node.cube || {x: size.w, y: size.h, z: size.d};
        const stack = new THREE.BoxGeometry(shape.x, shape.y, shape.z);
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        let label = AText.view3D({
            text: node.name,
            color: "#ffffff",
            width: size.width,
            size: ADevice.default.fontSize
        });
        label.position.set(0, 0, shape.z / 2 + 1);
        obj.add(label);
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
        node.expandView = node.expandView || ADevice.handle;
        node.getDetail = ADevice.getDetail;

        return obj;
    }

    static viewDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        window.graph.clearObjects();
        let size = ACompute.calculateDeepBox(obj);
        let node = {
            id: obj.id,
            name: obj.name,
            data: obj,
            view: ACompute.view3D,
            expandView: ADevice.handle,
            fx: 0,
            fy: 0,
            fz: 0,
            box: 1,
            opacity: 0.5,
            cube: {x: size.w * 2, y: size.h * 2, z: size.d * 2}
        };
        data.nodes[obj.id] = node;
        ACompute._addDescription(node, obj);

        // Mount points
        let mnodes = [];
        for (let name in obj.normalized.mounts) {
            let nobj = obj.normalized.mounts[name];
            let cnode = {
                id: `${node.id}.${name}`,
                name: name,
                view: ACompute.viewMount3D,
            }
            ACompute._addDescription(cnode, nobj);
            data.nodes[cnode.id] = cnode;
            mnodes.push(cnode);
        }
        ACompute._layoutRowColumn(node, mnodes, size.mounts, "left");

        // Shared Disks
        for (let name in obj.disks) {
            let nobj = obj.disks[name];
            if (nobj.volumeObject) {
                let cnode = ADevice.create3DNode(nobj.volumeObject, data, "left");
                cnode.rbox = {
                    parent: node.id,
                    x: {min: -10000, max: - size.w * 1.5 }
                }
                ACompute._addDescription(cnode, nobj);
                data.links.push({source: `${node.id}.${nobj.mount}`, target: cnode.id, width: 1.0, value: 10});
            }
        }

        // Local Disks
        let dnodes = [];
        for (let name in obj.normalized.disks) {
            let nobj = obj.normalized.disks[name];
            let cnode = {
                id: `${node.id}.${name}`,
                view: AStorage.view3D,
                name: name,
            }
            data.nodes[cnode.id] = cnode;
            ACompute._addDescription(cnode, nobj);
            dnodes.push(cnode);
            data.links.push({source: `${node.id}.${nobj.mount}`, target: cnode.id, width: 1.0, value: 10});
        }
        ACompute._layoutRowColumn(node, dnodes, size.storage, "back");

        // networks
        for (let i in obj.networks) {
            data.nodes[i] = {
                id: i,
                color: ANetwork.getNetworkColor(i),
                name: i,
                view: ANetwork.view3D,
                rotate: {y: Math.PI / 2},
                rbox: {
                    parent: node.id,
                    fx: size.r * 2,
                    z: {min: -10000, max: 0}
                }
            }
        }
        let nnodes =[];
        for (let i in obj.normalized.network_interfaces) {
            let ninter = obj.normalized.network_interfaces[i];
            let cnode = {
                id: `${node.id}.${ninter.name}`,
                name: ninter.name,
                data: ninter,
                color: ANetwork.getNetworkColor(ninter.network),
                view: ADevice.view3D,
            }
            ACompute._addDescription(cnode, ninter);
            data.nodes[cnode.id] = cnode;
            nnodes.push(cnode);
            data.links.push({source: `${ninter.network}`, target: cnode.id, width: 1.0, value: 10});

        }
        ACompute._layoutRowColumn(node, nnodes, size.network, "right");

        // memory
        let menodes = [];
        for (let i in obj.normalized.memory) {
            let nobj = obj.normalized.memory[i];
            let cnode = {
                id: `${node.id}.${nobj.name}`,
                name: nobj.name,
                data: nobj,
                color: "#444444",
                view: ADevice.view3D,
            }
            ACompute._addDescription(cnode, nobj);
            data.nodes[cnode.id] = cnode;
            menodes.push(cnode);
        }
        ACompute._layoutRowColumn(node, menodes, size.memory, "bottom");

        // processors
        let pnodes = [];
        for (let i in obj.normalized.processors) {
            let nobj = obj.normalized.processors[i];
            let cnode = {
                id: `${node.id}.${nobj.name}`,
                name: nobj.name,
                data: nobj,
                color: "#444444",
                view: ADevice.view3D,
            }
            ACompute._addDescription(cnode, nobj);
            data.nodes[cnode.id] = cnode;
            pnodes.push(cnode);
        }
        ACompute._layoutRowColumn(node, pnodes, size.processors, "top");

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

    static viewMount3D(node, type) {
        let color = node.color || "#662244";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = Math.PI / 2;
        const opacity = node.opacity || 1;

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
        let size = ACompute.calculateMountBox(node);
        const stack = new THREE.BoxGeometry(size.w, size.h, size.d)
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        let label = AText.view3D({
            text: node.name,
            color: "#ffffff",
            width: size.width,
            size: ADevice.default.fontSize
        });
        label.position.set(0, 0, (size.d / 2) + 1);
        obj.add(label);

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
        node.box = size.r;
        node.expandView = node.expandView || ADevice.handle;
        node.getDetail = ADevice.getDetail;

        return obj;
    }

    static handle(results) {
        ACompute.viewDeep3D(results, "new");
        ADevice.showDetail(results);
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

    static calculateDeepBox(compute) {
        compute.normalized = {
            processors: {},
            memory: {},
            disks: {},
            mounts: {},
            network_interfaces: {}
        };

        if (compute._module) {
            for (let pname in compute._module.processors) {
                let pu = compute._module.processors[pname];
                pu.name = pname;
                compute.normalized.processors[pname] = pu;
            }
        }
        for (let pname in compute.processors) {
            let pu = compute.processors[pname];
            pu.name = pname;
            compute.normalized.processors[pname] = pu;
        }
        if (compute._module) {
            for (let pname in compute._module.memory) {
                let pu = compute._module.memory[pname];
                pu.name = pname;
                compute.normalized.memory[pname] = pu;
            }
        }
        for (let pname in compute.memory) {
            let pu = compute.memory[pname];
            pu.name = pname;
            compute.normalized.memory[pname] = pu;
        }
        if (compute._module) {
            for (let pname in compute._module.disks) {
                let pu = compute._module.disks[pname];
                pu.name = pname;
                if (pu.volume === 'local') {
                    compute.normalized.disks[pname] = pu;
                }
                compute.normalized.mounts[pu.mount] = pu;
            }
        }
        for (let pname in compute.disks) {
            let pu = compute.disks[pname];
            pu.name = pname;
            if (pu.volume === 'local') {
                compute.normalized.disks[pname] = pu;
            }
            compute.normalized.mounts[pu.mount] = pu;
        }
        if (compute._module) {
            for (let pname in compute._module.networks.interfaces) {
                let pu = compute._module.networks.interfaces[pname];
                pu.name = pname;
                compute.normalized.network_interfaces[pname] = pu;
            }
        }
        for (let pname in compute.networks.interfaces) {
            let pu = compute.networks.interfaces[pname];
            pu.name = pname;
            compute.normalized.network_interfaces[pname] = pu;
        }
        for (let nname in compute.networks) {
            if (nname !== "interfaces") {
                // This connects the network to the network interface
                if (compute.normalized.network_interfaces.hasOwnProperty(compute.networks[nname].interface)) {
                    compute.normalized.network_interfaces[compute.networks[nname].interface].network = nname;
                }
            }
        }

        let sbox = ACompute.calculateGroupBox(compute.normalized.disks, ACompute.calculateDiskBox); // XY Back
        let pbox = ACompute.calculateGroupBox(compute.normalized.processors, ACompute.calculateProcessorBox); // XZ top
        let nbox = ACompute.calculateGroupBox(compute.normalized.network_interfaces, ACompute.calculateNetworkBox); // YZ Right
        let mbox = ACompute.calculateGroupBox(compute.normalized.memory, ACompute.calculateMemoryBox); // XZ Bottom
        let mtbox = ACompute.calculateGroupBox(compute.normalized.mounts, ACompute.calculateMountBox); // YZ Left

        /* X is always the width, Y is height with X, Y is width with Z, Z is always h */
        let fontWidth = compute.name.length * ACompute.default.fontSize / 2;
        const wnum = Math.max(sbox.box.w, pbox.box.w, mbox.box.w, 100, fontWidth);
        const hnum = Math.max(sbox.box.h, nbox.box.h, mtbox.box.h, 100);
        const dnum = Math.max(pbox.box.h, nbox.box.w, mbox.box.h, mtbox.box.w, 100);

        const radius = Math.max(Math.sqrt(wnum ** 2 + hnum ** 2), Math.sqrt(hnum ** 2 + dnum ** 2), Math.sqrt(wnum ** 2 + dnum ** 2));
        return {
            w: wnum * 1.10, h: hnum * 1.10, d: dnum * 1.10, r: radius,
            storage: sbox,
            processors: pbox,
            network: nbox,
            memory: mbox,
            mounts: mtbox,
        }
    }

    static calculateDiskBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        let height = nameArray.length * ACompute.default.fontSize * 1.2 + ACompute.default.height;
        let width = maxLetters * (ACompute.default.fontSize / 1.2);
        let depth = ACompute.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: ACompute.default.depth, r: radius};
    }

    static calculateProcessorBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        let height = nameArray.length * ACompute.default.fontSize * 1.2 + ACompute.default.height;
        let width = maxLetters * (ACompute.default.fontSize / 1.2);
        let depth = ACompute.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: ACompute.default.depth, r: radius};
    }

    static calculateNetworkBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        let height = nameArray.length * ACompute.default.fontSize * 1.2 + ACompute.default.height;
        let width = maxLetters * (ACompute.default.fontSize / 1.2);
        let depth = ACompute.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: ACompute.default.depth, r: radius};
    }

    static calculateMemoryBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        let height = nameArray.length * ACompute.default.fontSize * 1.2 + ACompute.default.height;
        let width = maxLetters * (ACompute.default.fontSize / 1.2);
        let depth = ACompute.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: ACompute.default.depth, r: radius};
    }

    static calculateMountBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        let height = nameArray.length * ACompute.default.fontSize * 1.2 + ACompute.default.height;
        let width = maxLetters * (ACompute.default.fontSize / 1.2);
        let depth = ACompute.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: ACompute.default.depth, r: radius};
    }

    static _layoutRowColumn(parentNode, nodes, size, direction) {
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
                node.rotate = {x: -Math.PI / 2};
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
                node.rotate = {x: Math.PI / 2};
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
                node.rotate = {y: Math.PI / 2};
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
                node.rotate = {y: -Math.PI / 2};
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
                node.rotate = {y: Math.PI};
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
    static _addDescription(cnode, obj) {
        cnode.description = "";
        for(let i in obj) {
            let item = obj[i];
            if(typeof item !== 'object') {
                cnode.description += `${i}: ${item}\n`
            } else {
                cnode.description += `${i}:\n`
                for(let j in item) {
                    if(typeof item[j] === 'string') {
                        cnode.description +=  `...${j}: ${item[j]}\n`;
                    } else {
                        cnode.description += `...${j}:`;
                        for(let k in item[j]) {
                            if(typeof item[j][k] === 'string') {
                                cnode.description += `${k}: ${item[j][k]}, `;
                            } else {
                                cnode.description += `${k}:...,`;
                            }
                        }
                        cnode.description += '\n';
                    }
                }
            }
        }
    }
}
