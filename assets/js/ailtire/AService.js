/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AAction, AScenario, AText, AUsecase,A3DGraph, ASelectedHUD} from './index.js';

export default class AService {
    constructor(config) {
        this.config = config;
    }

    static default = {
        fontSize: 20,
        height: 30,
        width: 15,
        depth: 15
    }

    static calculateBox(node) {
        let height = AService.default.height;
        let depth = AService.default.depth;
        let width = AService.default.width;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: depth, r: radius};
    }

    static view3D(node, type) {
        let color = node.color || "#cc6688";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = 3.14 / 2;
        const opacity = node.opacity || 1;
        const size = AService.calculateBox(node);
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

        const stack = new THREE.CylinderGeometry(size.w / 2, size.d, size.h, AService.default.fontSize);
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        // only show the name of the service not the complete prefix.
        let [ename, stname, sname] = node.name.split(/\./);
        let label = AText.view3D({text: sname, color: "#ffffff", width: 80, size: 20});
        label.position.set(0, 0, size.d);
        obj.add(label);
        label = AText.view3D({text: `${ename}.${stname}`, color: "#ffffff", width: 80, size: 10});
        label.position.set(0, 15, size.d);
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
        node.expandLink = node.expandLink || `deployment/get?id=${node.id}`;
        node.expandView = AService.handle;
        node.getDetail = AService.getDetail;

        return obj;
    }

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AService.showDetail(results);
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
        records.push({recid: i++, name: 'Name', value: result.name, detail: result.name});
        records.push({recid: i++, name: 'Image', value: result.image, detail: result.image});
        let idetails = getDetails(result.interface);
        if (result.interface) {
            records.push({
                recid: i++,
                name: 'Interface',
                value: Object.keys(result.interface).length,
                detail: idetails.join('|')
            });
        }
        if (result.networks) {
            records.push({
                recid: i++,
                name: 'Networks',
                value: Object.keys(result.networks).length,
                detail: `Network^${Object.keys(result.networks).join('|Network,')}`
            });
        }
        w2ui['objlist'].records = records;
        w2ui['objlist'].refresh();
        ASelectedHUD.update('Service', records);
    }

    static viewDeep3D(obj) {

    }

    static handle(results) {

    }
}

function getDetails(objs) {
    let items = [];
    for (let name in objs) {
        items.push(`${name}^${objs[name].path}:${objs[name].port}`);
    }
    return items;
}
