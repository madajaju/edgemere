/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AText} from './index.js';

export default class AFlowCondition {
    constructor(config) {
        this.config = config;
    }

    static default = {
        fontSize: 15,
        height: 30,
        width: 30,
        depth: 30,
    }

    static calculateBox(node) {
        let height = AFlowCondition.default.fontSize * 2;
        let width = node.name.length * (AFlowCondition.default.fontSize / 1.5);
        let depth = AFlowCondition.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: depth, r: radius};
    }

    static view3D(node, type) {
        let size = AFlowCondition.calculateBox(node);
        let width = size.w;

        let opacity = node.opacity || 0.50;
        let color = node.color || "#66aacc";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
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
        // Only the width is used for the diameter of the geo
        node.width = size.w;
        node.height = size.h;
        node.depth = size.d;

        const geo = new THREE.ConeGeometry(size.h/2, size.h/2);
        let geoObj = new THREE.Mesh(geo, material);
        geoObj.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI/2));
        geoObj.position.set(-(size.w/2 + size.h/4),0,0);
        const geo2 = new THREE.ConeGeometry(size.h/2, size.h/2);
        let geo2Obj = new THREE.Mesh(geo2, material);
        geo2Obj.applyMatrix4(new THREE.Matrix4().makeRotationZ(-Math.PI/2));
        geo2Obj.position.set(size.w/2 + size.h/4 ,0,0);
        const geo3 = new THREE.CylinderGeometry(size.h/2, size.h/2, size.w);
        let geo3Obj = new THREE.Mesh(geo3, material);
        geo3Obj.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI/2));

        const group = new THREE.Group();
        group.add(geoObj);
        group.add(geo2Obj);
        group.add(geo3Obj);
        let label = AText.view3D({text:node.name.replace(/\./g, '\n'), color:"#ffffff", width: size.w, size: AFlowCondition.default.fontSize});
        label.position.set(0,0, (size.h/2)+1);
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
        /*
        node.expandLink = `state/get?id=${node.id}`;
        node.expandView = AState.handle;
        node.getDetail = AState.getDetail;

         */
        return group;
    }

    static getDetail(node) {

    }

    static showDetail(result) {

    }

    static viewDeep3D(statenet, opts) {

    }

    static handle(results, config) {

    }
}

