/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AText, AService, ADevice, ASelectedHUD, ANetwork} from './index.js';

export default class AStorage {
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
        let size = AStorage.calculateBox(node);
        const stack = new THREE.CylinderGeometry( size.r, size.r, size.d, 64 );
        stack.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        let label = AText.view3D({
            text: node.name,
            color: "#ffffff",
            width: size.width,
            size: ADevice.default.fontSize
        });
        label.position.set(0, 0, (size.d/2) + 1);
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

    static viewDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        window.graph.clearObjects();
        let node = ADevice.create3DNode(obj, data, "front");
        let size = AStorage.calculateBox(node);

        for (let name in obj.consumers) {
            let nobj = obj.consumers[name];
            let cnode = ADevice.create3DNode(nobj,data, "front");
            cnode.rbox = {
                parent: node.id,
                z: {min:-10000, max: 0}
            }
            data.links.push({source: node.id, target: cnode.id, width: 1.0, value: 10});
        }

        for(let i in obj.networks) {
            data.nodes[i] = {
                id: i,
                color: ANetwork.getNetworkColor(i),
                name: i,
                view: ANetwork.view3D,
                rotate: {y: Math.PI/2},
                rbox: {
                    parent: node.id,
                    fx: size.r*2,
                    z: {min: -10000, max:0}
                }
            }
        }

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
        AStorage.viewDeep3D(results, "new");
        ADevice.showDetail(results);
    }

}
