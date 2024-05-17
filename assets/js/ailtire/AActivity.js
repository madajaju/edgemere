/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AText, AWorkFlow, ASelectedHUD, AScenario, AUsecase} from './index.js';

export default class AActivity {
    constructor(config) {
        this.config = config;
    }

    static default = {
        fontSize: 15,
        height: 40,
        width: 40,
        depth: 10,
        corner: 5,
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);

        let height = nameArray.length * AActivity.default.fontSize * 2;
        let width = maxLetters * (AActivity.default.fontSize / 1.5);
        let depth = AActivity.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;

        // Now calculate hieght for the inputs and outputs.
        if(node.object) {
            let inputLength = 0;
            let outputLength = 0;
            if(node.object.inputs) {
                inputLength = Object.keys(node.object?.inputs).length || 0;
            }
            if(node.object.outputs) {
                outputLength = Object.keys(node.object.outputs).length || 0;
            }
            let iolength = Math.max(inputLength, outputLength);
            let ioHeight = iolength * AActivity.default.fontSize * 2; // The font height should be half the size of the normal font. See above.
            height = Math.max(ioHeight * 1.2, height);
        }
        return {w: width, h: height, d: depth, r: radius};
    }
    static viewIO3D(name, object) {
        let node = {
            name: name,
            description: object.description
        }
        let height = AActivity.default.fontSize /  1.5; // 1/3 the normal font size
        let width = node.name.length * (AActivity.default.fontSize / 4.5); // half the normal font size


        let shape = new THREE.BoxGeometry(width, height, AActivity.default.fontSize / 3);

        let opacity = 1;
        let color = node.color || "#006699";
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
        let group = new THREE.Mesh(shape, material);
        let labelText = node.name;
        let label = AText.view3D({
            text: labelText,
            color: "#ffffff",
            width: node.width,
            size: AActivity.default.fontSize /3
        });
        label.position.set(0, 0, (AActivity.default.fontSize/6)* 1.1 );
        label.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
        group.add(label);
        group.width = width;
        group.height = height;
        return group;
    }
    static view3D(node, type) {
        let size = AActivity.calculateBox(node);
        // This is the rounded cube
        let width = size.w;
        let height = size.h
        let halfWidth = width / 2;
        let halfHeight = height / 2;
        let depth = size.d;
        let radius0 = node.radius || (Math.min(Math.min(width, height), depth) * .25);
        let smoothness = Math.max(3, Math.floor(node.smoothness) || 3);

        let shape = new THREE.Shape();
        let eps = AActivity.default.corner;
        let radius = radius0 - 1;

        shape.absarc(-halfWidth + eps, -halfHeight + eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(-halfWidth + eps, halfHeight - radius * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(halfWidth - radius * 2, halfHeight - radius * 2, eps, Math.PI / 2, 0, true);
        shape.absarc(halfWidth - radius * 2, -halfHeight + eps, eps, 0, -Math.PI / 2, true);

        // This is the rounded cube
        let geometry = new THREE.ExtrudeBufferGeometry(shape, {
            depth: depth,
            bevelEnabled: true,
            bevelSegments: smoothness * 2,
            steps: 1,
            bevelSize: radius,
            bevelThickness: radius0,
            curveSegments: smoothness
        });
        node.description = node.detail;
        let opacity = node.opacity || 0.50;
        let color = node.color || "#66ffaa";
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
        let group = new THREE.Mesh(geometry, material);
        let labelText = node.name.replace(/\s/g, '\n');
        let label = AText.view3D({
            text: labelText,
            color: "#ffffff",
            width: node.width,
            size: AActivity.default.fontSize
        });
        label.position.set(0, 0, (depth + radius0) + 2);
        label.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
        group.add(label);

        // Add the specific type of Activity

        if(node.object && node.object.inputs) {
            let yoffset = AActivity.default.fontSize * 1.5;
            let inputs = []
            for (let iname in node.object.inputs) {
                inputs.push(`${iname}: ${node.object.inputs[iname].type} - ${node.object.inputs[iname].description}`);

                let ioNode = AActivity.viewIO3D(iname, node.object.inputs[iname]);
                ioNode.position.set(-(size.w/2 + ioNode.width/2 - AActivity.default.fontSize * 0.5) , size.h / 2 - yoffset, size.d * 1.2);
                group.add(ioNode);
                yoffset += AActivity.default.fontSize;
            }
            node.description = node.description + "\n<b>Inputs:</b>\n  - " + inputs.join('\n  - ');
        }
        if(node.object && node.object.outputs) {
            let outputs = []
            let yoffset = AActivity.default.fontSize * 1.5;
            for (let iname in node.object.outputs) {
                outputs.push(`${iname}: ${node.object.outputs[iname].type} - ${node.object.outputs[iname].description}`);

                let ioNode = AActivity.viewIO3D(iname, node.object.outputs[iname]);
                ioNode.position.set((size.w/2 + ioNode.width/2 - AActivity.default.fontSize * 0.5), size.h / 2 - yoffset, size.d * 1.2);
                group.add(ioNode);
                yoffset += AActivity.default.fontSize;
            }
            node.description = node.description + "\n<b>Outputs:</b>\n  - " + outputs.join('\n  - ');
        }

        let subNode = {
            name: node.name,
            description: node.description,
        }

        node.expandLink = `nolink`;
        node.getDetail = AActivity.getDetail;
        if (node.object) {
            if (node.object.type === "scenario") {
                let item = AScenario.view3D(subNode);
                item.scale.set(0.3, 0.3, 0.3);
                item.position.set(-(size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
                // The Scenario id is UseCase.Scenario This is found in the object.obj.uid field.
                node.expandLink = `scenario/get?id=${node.object.obj.uid}`;
                node.expandView = AScenario.handle;
            } else if (node.object.type === "usecase") {
                let item = AUsecase.view3D(subNode);
                item.scale.set(0.3, 0.3, 0.3);
                item.position.set(-(size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
                node.expandLink = `usecase/get?id=${node.name}`;
                node.expandView = AUsecase.handle;
            } else if (node.object.type === "workflow") {
                let item = AWorkFlow.view3D(subNode);
                item.scale.set(0.3, 0.3, 0.3);
                item.position.set(-(size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
                node.expandLink = `workflow/get?id=${node.name}`;
                node.expandView = AWorkFlow.handle;
            }
            if (node.name === "Init") {
                const materialSphere = new THREE.MeshPhysicalMaterial({
                    color: "#dddddd",
                    transparent: true,
                    opacity: 1,
                    depthTest: true,
                    depthWrite: true,
                    alphaTest: 0,
                    reflectivity: 0.8,
                    metalness: 0.5,
                    clearcoat: 0.9,
                    clearcoatRoughness: 0.3,
                    side: THREE.DoubleSide
                });
                let item = new THREE.Mesh(new THREE.SphereGeometry(15), materialSphere);
                item.position.set((size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
            }
            // Terminal Node
            if(!node.object.next || Object.keys(node.object.next).length === 0) {
                const materialSphere = new THREE.MeshPhysicalMaterial({
                    color: "#bbbbbb",
                    transparent: true,
                    opacity: 1,
                    depthTest: true,
                    depthWrite: true,
                    alphaTest: 0,
                    reflectivity: 0.8,
                    metalness: 0.65,
                    clearcoat: 1,
                    side: THREE.DoubleSide
                });
                const materialSphere2 = new THREE.MeshPhysicalMaterial({
                    color: "#dddddd",
                    transparent: true,
                    opacity: 0.35,
                    depthTest: true,
                    depthWrite: true,
                    alphaTest: 0,
                    reflectivity: 0.34,
                    metalness: 0,
                    clearcoat: 0,
                    side: THREE.DoubleSide
                });
                let item = new THREE.Mesh(new THREE.SphereGeometry(15), materialSphere);
                let item2 = new THREE.Mesh(new THREE.SphereGeometry(20), materialSphere2);
                item.position.set((size.w / 2), size.h / 2, size.d + 1);
                item2.position.set((size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
                group.add(item2);
            }
        }

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
        node.getDetail = AActivity.getDetail;
        return group;
    }

    static getDetail(node) {
        AActivity.showDetail(node);
    }

    static showDetail(result) {
        let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, label: "Value", sortable: true},
        ];
        w2ui['objdetail'].clear();
        w2ui['objdetail'].columns = cols;
        let i = 0;
        records.push({recid: i++, name: 'name', value: result.object.name, detail: result.object.name});
        records.push({
            recid: i++,
            name: 'Description',
            value: result.object.description,
            detail: result.object.description
        });
        records.push({
            recid: i++,
            name: 'Type',
            value: result.object.type,
            detail: result.object.type
        });
        if (result.object.actor) {
            records.push({
                recid: i++,
                name: 'Actor',
                value: result.object.actor,
                detail: result.object.actor
            });
        }
        if (result.object.package) {
            records.push({
                recid: i++,
                name: 'Actor',
                value: result.object.package,
                detail: result.object.package
            });
        }
        // Next Activity
        for (let aname in result.object.next) {
            let next = result.object.next[aname];
            let details = new Array();
            details.push(`name^${aname}`);
            if (next.condition) {
                details.push(`condition^${next.condition.test}[${next.condition.value}]`);
            }

            records.push({recid: i++, name: "Next", value: aname, detail: details.join('|')});
        }

        w2ui['objdetail'].records = records;
        // Clear the detail list

        ASelectedHUD.update('Activity', records);
        w2ui['objdetail'].refresh();
    }

    static viewDeep3D(obj) {

    }

    static handle(results) {

    }
}

