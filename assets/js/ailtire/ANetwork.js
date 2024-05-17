/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AText, A3DGraph, ASelectedHUD, ADevice} from './index.js';
let _networkColors = {};

export default class ANetwork {
    constructor(config) {
        this.config = config;
    }
    static default = {
        fontSize: 20,
        height: 20,
        width: 200,
        depth: 20
    }
    static colors = [
        "#888844",
        "#448888",
        "#884488",
        "#224488",
        "#442288",
        "#888888",
        "#ff4488",
        "#8844ff",
        "#4488ff",
        "#884422",
    ]

    static calculateBox(node) {
        let height = ANetwork.default.height;
        let width = ANetwork.default.width;
        let depth = ANetwork.default.depth;
        let radius = height*2;
        return {w: width, h: height, d:depth,r:radius};
    }
    static getNetworkColor(network) {
        if (_networkColors.hasOwnProperty(network)) {
            return _networkColors[network];
        }
        let length = Object.keys(_networkColors).length;
        _networkColors[network] = ANetwork.colors[length];
        return _networkColors[network];
    }

    static clearNetworkColor() {
        _networkColors = {};
    }

    static view3D(node, type) {
        let color = node.color || "#444444";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = Math.PI / 2;
        const opacity = node.opacity || 1;
        let size = ANetwork.calculateBox(node);

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
        const group = new THREE.Group();

        const stack = new THREE.CylinderGeometry(size.h, size.d, size.w, 20);
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);
        obj.applyMatrix4(new THREE.Matrix4().makeRotationZ(-theta));
        group.add(obj);

        let label = AText.view3D({text: node.name, color: "#ffffff", width: size.d, size: ANetwork.default.fontSize});
        label.position.set(0, 0, size.d+1);
        group.add(label);
        node.scale = node.scale || 1;
        group.scale.set(node.scale,node.scale,node.scale);
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
        node.box = node.box || size.r * node.scale;
        node.expandLink = `network/get?id=${node.id}`;
        node.expandView = ANetwork.handle;
        node.getDetail = ANetwork.getDetail;
        return group;
    }
    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                ANetwork.showDetail(results);
            }
        });
    }
    static showDetail(result) {
        ASelectedHUD.update('Network', []);
    }
    static viewDeep3D(obj) {

    }
    static viewInterfaceDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        window.graph.clearObjects();
        ANetwork.clearNetworkColor();
        let node = ADevice.create3DNode(obj, data, "front");
        node.fx = 0;
        node.fy = 0;
        node.fz = 0;
        let size = ANetwork.calculateBox(node);

        for(let i in obj.networks) {
            let name = obj.networks[i];
            data.nodes[name] = {
                id: name,
                color: ANetwork.getNetworkColor(name),
                name: name,
                view: ANetwork.view3D,
                box: 1,
                rbox: {
                    parent: node.id,
                    fz: -size.r*2,
                    fx: size.r*2,
                    y: {min:-size.r*5, max:size.r*5}
                }
            }
        }
        for(let nname in obj.networkObjects) {
            let nobj = obj.networkObjects[nname];
            for(let dname in nobj.devices) {
                let cnode = ADevice.create3DNode(nobj.devices[dname], data, "front");
                cnode.box = ADevice.calculateBox(cnode).r;
                cnode.rbox = {
                    parent: nname,
                    z: { max: -size.r*2, min: -10000},
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

    }
}

