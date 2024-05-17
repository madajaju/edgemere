/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AText, ACompute, AStorage, ANetwork, ASelectedHUD} from './index.js';

export default class ADevice {
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

    static create3DNode(obj, data, location) {

        // Set the correct view
        let view =  ADevice.view3D;
        if( obj.kind === 'storage') {
            view = AStorage.view3D;
        } else if( obj.kind === 'compute') {
            view = ACompute.view3D;
        }
        let cnode = {
            id: obj.id,
            name: obj.name,
            data: obj,
            view: view,
            expandView: ADevice.handle,
        };

        let size = ADevice.calculateBox(cnode);
        if (obj.networks) {
            let nlength = Object.keys(obj.networks).length;
            let offset = size.h / (nlength + 1);
            let currentLoc = -size.h / 2 + offset / 2;
            for (let i in obj.networks) {
                let nname = i;
                if (typeof obj.networks[i] === 'string') {
                    nname = obj.networks[i];
                }
                let nnode = {
                    id: obj.id + nname + "Port",
                    name: nname,
                    description: "Network connection to " + nname,
                    data: obj,
                    color: ANetwork.getNetworkColor(nname),
                    view: ADevice.view3DPort,
                    parentNode: cnode,
                    rbox: {
                        parent: cnode.id,
                        fz: size.d / 2,
                        fx: size.w / 2,
                        fy: currentLoc,
                    }
                }
                if (location === "top") {
                    nnode.rbox = {
                        parent: cnode.id,
                        fz: currentLoc,
                        fx: size.w / 2,
                        fy: size.d / 2,
                    }
                } else if (location === "bottom") {
                    nnode.rbox = {
                        parent: cnode.id,
                        fz: currentLoc,
                        fx: size.w / 2,
                        fy: -size.d / 2,
                    }
                } else if (location === "left") {
                    nnode.rbox = {
                        parent: cnode.id,
                        fy: currentLoc,
                        fz: -size.w / 2,
                        fx: -size.d / 2,
                    }
                } else if (location === "right") {
                    nnode.rbox = {
                        parent: cnode.id,
                        fy: currentLoc,
                        fz: -size.w / 2,
                        fx: size.d / 2,
                    }
                } else if (location === "back") {
                    nnode.rbox = {
                        parent: cnode.id,
                        fz: -size.d / 2,
                        fx: size.w / 2,
                        fy: currentLoc,
                    }
                }
                currentLoc += offset;

                data.nodes[nnode.id] = nnode;
                data.links.push({target: nnode.id, source: cnode.id, width: 1.0, value: 1});
                data.links.push({target: nname, source: nnode.id, width: 1.0, value: 10});
            }
        }
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

        data.nodes[cnode.id] = cnode;
        return cnode;
    }

    static view3DPort(node, type) {
        let color = node.color || "#888888";
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
        let size = {w: 10, h: 10, d: 10, r: 1};
        const stack = new THREE.BoxGeometry(size.w, size.h, size.d)
        let obj = new THREE.Mesh(stack, material);
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
        let size = ADevice.calculateBox(node);
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
        node.box = size.r;
        node.expandView = node.expandView || ADevice.handle;
        node.getDetail = ADevice.getDetail;

        return obj;
    }

    static getDetail(node) {
        if (node.expandLink) {
            $.ajax({
                url: node.expandLink,
                success: (results) => {
                    ADevice.showDetail(results);
                }
            });
        } else {
            ADevice.showDetail(node.data);
        }
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
        for (let j in result.networks) {
            let item = result.networks[j];
            if (typeof item === 'string') {
                item = {name: item}
            } else {
                item.name = j;
            }
            records.push({recid: i++, name: "Network", value: item.name, detail: item});
        }
        for (let j in result.disks) {
            let item = result.disks[j];
            records.push({recid: i++, name: "Disk", value: j, detail: item});
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
        ASelectedHUD.update('Image', records);
        w2ui['objlist'].refresh();
    }

    static viewDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        window.graph.clearObjects();
        let node = {
            id: obj.name + '-image',
            name: obj.name.replace(/\s/g, '\n'),
            view: ADevice.view3D,
            expandView: ADevice.handle,
        };

        data.nodes[node.id] = node;
        ADevice._iterateViewDeep3D(obj, node, data.nodes, data.links);
        for (let name in obj.children) {
            let nobj = obj.children[name];
            let cnode = {
                id: name + '-image',
                name: name.replace(/\s/g, '\n'),
                view: ADevice.view3D,
                expandView: ADevice.handle,
            };
            data.nodes[cnode.id] = cnode;
            data.links.push({source: node.id, target: cnode.id, width: 1.0, value: 10});
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
        if(results.kind === 'storage') {
            AStorage.viewDeep3D(results, "new");
        } else if(results.kind === 'compute') {
            ACompute.viewDeep3D(results, "new");
        } else if(results.kind === 'network') {
            ANetwork.viewInterfaceDeep3D(results, "new");
        } else {
            ADevice.viewDeep3D(results, "new");
        }
        ADevice.showDetail(results);
    }

    static _iterateViewDeep3D(obj, parent, nodes, links) {
        if (obj.base) {
            let node = {
                id: obj.base + '-image',
                name: obj.base.replace(/\s/g, '\n'),
                view: ADevice.view3D,
                expandView: ADevice.handle,
            };
            nodes[node.id] = node;
            links.push({target: parent.id, source: node.id, width: 1.0, value: 10});
            ADevice._iterateViewDeep3D(obj.base, node, nodes, links);
        }
    }

}

function getDetails(objs) {
    let items = [];
    let inum = 0;
    for (let name in objs) {
        inum++;
        items.push(name);
    }
    return items;
}

