/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AText, AStack, AService, ALocation, ANetwork, ADevice, A3DGraph, ASelectedHUD} from './index.js';

export default class AEnvironment {
    constructor(config) {
        this.config = config;
    }

    static showList(panel, logical, physical) {
        $.ajax({
            url: 'deployment/list',
            success: function (results) {
                let deploymentList = getDeploymentNodes(results);
                let node = w2ui[panel].get(logical);
                node.data = results;
                node.view = 'deployment'
                w2ui[panel].add(logical, deploymentList);
            }
        });
        $.ajax({
            url: 'deployment/physical',
            success: function (results) {
                let physicalList = getPhysicalNodes(results);
                let node = w2ui[panel].get(physical);
                node.data = results;
                node.view = 'physical'
                w2ui[panel].add(physical, physicalList);
            }
        });
    }

    static default = {
        fontSize: 20,
        height: 100,
        width: 50,
        depth: 20
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        let height = nameArray.length * AEnvironment.default.fontSize;
        let width = maxLetters * AEnvironment.default.fontSize + 10;
        let depth = AEnvironment.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: AEnvironment.default.depth, r: radius};
    }

    static view3D(node, type) {
        let opacity = node.opacity || 1;
        let color = "#ff8866";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let size = AEnvironment.calculateBox(node);
        let geo = new THREE.BoxGeometry(size.w, size.h, size.d);
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

        const retval = new THREE.Mesh(geo, material);
        retval.position.set(node.x, node.y, node.z);
        let name = node.name;
        name.replace('/', '');
        let label = AText.view3D({
            text: name.replace(/\//g, '\n'),
            color: "#ffffff",
            width: size.w,
            size: AEnvironment.default.fontSize
        });
        label.position.set(0, 0, (size.d / 2) + 1);
        retval.add(label)
        node.scale = node.scale || 1;
        retval.scale.set(node.scale,node.scale,node.scale);

        retval.aid = node.id;
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
        node.box = size.r *node.scale;
        node.expandLink = node.expandLink || `env/get?id=${node.id}`;
        node.expandView = node.expandView || AEnvironment.handle;
        node.getDetail = AEnvironment.getDetail;

        return retval;
    }

    static viewList3D(objs) {
        let data = {nodes: {}, links: []};

        window.graph.clearObjects();
        for (let ename in objs.environments) {
            let env = objs.environments[ename];
            data.nodes[ename] = {
                id: ename,
                name: ename,
                view: AEnvironment.view3D,
            };
            for (let sname in env.stacks) {
                let stack = env.stacks[sname];
                stack.id = `${ename}.${sname}`;
                data.nodes[stack.id] = {
                    id: stack.id,
                    name: sname,
                    view: AStack.view3D,
                }
                data.links.push({target: ename, source: stack.id, width: 1.0, value: 10});
            }
        }

        window.graph.setData(data.nodes, data.links);
        window.graph.showLinks();
    }
    static viewPhysicalList3D(objs) {
        let data = {nodes: {}, links: []};
        window.graph.clearObjects();
        window.graph.setData(data.nodes, data.links);
        for (let ename in objs.environments) {
            let env = objs.environments[ename];
            AEnvironment.viewPhysicalDeep3D(env, "add");
        }
        window.graph.showLinks();
    }

    static viewPhysicalDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        let connections = {};
        let node = data.nodes[obj.name] = {
            id: obj.name,
            name: obj.name,
            view: AEnvironment.view3D,
            scale: 5
        };
        // Lock down the location
        if(mode === 'new') {
            node.fx = 0;
            node.fy = 0;
            node.fz = 0;
        } else {
            node.fz = 0;
            node.bbox = {
                y: {min:-10000, max: 4500},
                x: {min: -10000, max: 4500}
            }
        }

        for (let lname in obj.physical.locations) {
            connections[lname] = {};
            let location = obj.physical.locations[lname];
            let lnode = data.nodes[lname] = {
                id: lname,
                name: lname,
                data: location,
                view: ALocation.view3D,
                expandLink: "nolink",
                rotate: {x: - Math.PI/2},
                fy: 5000,
                scale: 5,
                bbox: {
                    x: {min: -10000, max: 750 },
                    z: {min: -10000, max: -250}
                }
            };
            data.links.push({source:lnode, target: obj.name, width: 1.0, value: 10});

            for (let dname in location.devices) {
                let device = location.devices[dname];
                if (device.kind === "network") {
                    for (let i in device.networks) {
                        let nname = device.networks[i];
                        let nnode = data.nodes[nname] = {
                            id: nname,
                            name: nname,
                            view: ANetwork.view3D,
                            color: ANetwork.getNetworkColor(nname),
                            scale: 5,
                            fx: 5000,
                            bbox: {
                                y: {min: -10000, max: 4500},
                                z: {min: -10000, max: -500}
                            },
                            rotate: { y: Math.PI/2}
                        }
                        connections[lname][nname] = nnode;
                    }
                }
                let cnode = ADevice.create3DNode(device, data, "front");
                cnode.bbox = {
                    x: {min: -10000, max: 4500},
                    y: {min: -10000, max: 4500},
                    z: {min: -10000, max: -250 },
                }
                data.links.push({target: cnode.id, source: obj.name, width: 1.0, value: 10 });
                data.links.push({target: cnode.id, source: lname, width: 1.0, value: 10 });
            }
        }
        for(let lname in connections) {
            for(let nname in connections[lname]) {
                data.links.push({target:lname, source:nname, width: 1.0, value: 10});
                data.links.push({source:lname, target: obj.name, width: 1.0, value: 10});
            }
        }

        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
    }

    static viewDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        for (let sname in obj.stacks) {
            let id = obj.stacks[sname].id;
            data.nodes[id] = {
                id: id,
                name: sname,
                view: AStack.view3D,
                group: "deployment",
            }
        }
        for (let sname in obj.stacks) {
            let stack = obj.stacks[sname];
            let stid = stack.id;
            for (let srname in stack.services) {
                let service = stack.services[srname];
                let extendedName = srname;
                // Stacks are unique alread. But Service names might not be. They need to be fully qualified.
                if (service.type === 'stack') {
                    // The service type as a stack is the sidecar container and points to a stack. G
                    // Get the stack from the list of stacks.
                    if (obj.stacks.hasOwnProperty(service.image)) {
                        extendedName = obj.stacks[service.image].id;
                    } else {
                        extendedName = service.image;
                    }
                }
                if (!data.nodes.hasOwnProperty(extendedName)) {
                    data.nodes[extendedName] = {
                        id: extendedName,
                        name: extendedName,
                        view: AService.view3D,
                    }
                }
                data.links.push({target: extendedName, source: stid, value: 30});
            }
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
    }

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AEnvironment.showDetail(results);
            }
        });
    }

    static showDetail(result) {
        let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'services', size: "20%", resizeable: true, label: "Services", sortable: true},
            {field: 'networks', size: "20%", resizeable: true, label: "Networks", sortable: true},
            {field: 'data', size: "20%", resizeable: true, label: "Data", sortable: true},
            {field: 'interface', size: "20%", resizeable: true, caption: "Interface", sortable: true}
        ];
        w2ui['objlist'].columns = cols;
        w2ui['objlist'].show.columnHeaders = true
        w2ui['objlist'].header = result._name;

        for (let sname in result.stacks) {
            let stack = result.stacks[sname];
            if (stack) {
                let rec = {
                    recid: sname,
                    name: sname,
                }
                if (stack.services) {
                    let objs = stack.services;
                    rec.services = Object.keys(objs).length;
                    rec.servicesdetail = "Services|" + getDetails(objs, 'service/get').join(", ");
                }
                if (stack.networks) {
                    let objs = stack.networks;
                    rec.networks = Object.keys(objs).length;
                    rec.networksdetail = "Networks|" + getDetails(objs, 'network/get').join(", ");
                }
                if (stack.data) {
                    let objs = stack.data;
                    rec.data = Object.keys(objs).length;
                    rec.datadetail = "Data|" + getDetails(objs, "data/get").join(", ");
                }
                if (stack.interface) {
                    let objs = stack.interface;
                    rec.interface = Object.keys(objs).length;
                    rec.interfacedetail = "Interface|" + getDetails(objs, "interface/get").join(", ");
                }
                records.push(rec);
            }
        }

        w2ui['objlist'].records = records;
        // Clear the detail list
        w2ui['objdetail'].clear();
        w2ui['objlist'].onClick = function (event) {
            // this.showDetail(event);
            w2ui['objdetail'].clear();
            let record = this.get(event.recid);
            let drecords = [];
            let k = 0;
            for (let rname in record) {
                k++;
                if (rname.includes('detail')) {
                    let [vname, value] = record[rname].split('|');
                    drecords.push({recid: k, name: vname, value: value});
                }
            }
            w2ui['objdetail'].add(drecords)
            window.graph.selectNodeByID(event.recid);
        }
        ASelectedHUD.update('Environment', records);
        w2ui['objlist'].refresh();
    }

    static showListDetail(result) {
        let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'services', size: "20%", resizeable: true, label: "Services", sortable: true},
            {field: 'networks', size: "20%", resizeable: true, label: "Networks", sortable: true},
            {field: 'data', size: "20%", resizeable: true, label: "Data", sortable: true},
            {field: 'interface', size: "20%", resizeable: true, caption: "Interface", sortable: true}
        ];
        w2ui['objlist'].columns = cols;
        w2ui['objlist'].show.columnHeaders = true
        w2ui['objlist'].header = result._name;
        for (let ename in result) {
            let env = result[ename];
            for (let sname in env) {
                let stack = env[sname];
                if (stack) {
                    let rec = {
                        recid: sname,
                        name: sname,
                    }
                    if (stack.services) {
                        let objs = stack.services;
                        rec.services = Object.keys(objs).length;
                        rec.servicesdetail = "Services|" + getDetails(objs, 'service/get').join(", ");
                    }
                    if (stack.networks) {
                        let objs = stack.networks;
                        rec.networks = Object.keys(objs).length;
                        rec.networksdetail = "Networks|" + getDetails(objs, 'network/get').join(", ");
                    }
                    if (stack.data) {
                        let objs = stack.data;
                        rec.data = Object.keys(objs).length;
                        rec.datadetail = "Data|" + getDetails(objs, "data/get").join(", ");
                    }
                    if (stack.interface) {
                        let objs = stack.interface;
                        rec.interface = Object.keys(objs).length;
                        rec.interfacedetail = "Interface|" + getDetails(objs, "interface/get").join(", ");
                    }
                    records.push(rec);
                }
            }
        }

        w2ui['objlist'].records = records;
        ASelectedHUD.update('Environments', records);
        // Clear the detail list
        w2ui['objdetail'].clear();
        w2ui['objlist'].onClick = function (event) {
            // this.showDetail(event);
            w2ui['objdetail'].clear();
            let record = this.get(event.recid);
            let drecords = [];
            let k = 0;
            for (let rname in record) {
                k++;
                if (rname.includes('detail')) {
                    let [vname, value] = record[rname].split('|');
                    drecords.push({recid: k, name: vname, value: value});
                }
            }
            w2ui['objdetail'].add(drecords)
            window.graph.selectNodeByID(event.recid);
        }
        w2ui['objlist'].refresh();
    }

    static handle(result) {
        if (result.physical) {
            AEnvironment.viewPhysicalDeep3D(result, 'new');
        } else {
            AEnvironment.viewDeep3D(result, 'new');
        }
        AEnvironment.showDetail(result);
    }

    static handleList(result) {
        AEnvironment.viewList3D(result, 'new');
        AEnvironment.showListDetail(result);
    }
    static handlePhysicalList(result) {
        AEnvironment.viewPhysicalList3D(result, 'new');
        AEnvironment.showListDetail(result);
    }
}

function getDetails(objs, link) {
    let items = [];
    let inum = 0;
    for (let j in objs) {
        let item = objs[j];
        inum++;
        let iname = item.name || j;
        let nlink = item.link || `${link}?id=${iname}`;
        items.push(`<span onclick="expandObject('${nlink}');">${iname}</span>`);
    }
    return items;
}

function getDeploymentNodes(deployments) {
    let sitems = [];
    for (let ename in deployments.environments) {
        let env = deployments.environments[ename];
        let spkgi = {
            id: ename,
            text: ename,
            img: 'icon-folder',
            view: 'environment',
            link: `env/get?id=${ename}`,
            nodes: []
        };
        if (env.stacks) {
            for (let sname in env.stacks) {
                let stack = env.stacks[sname];
                let citem = {
                    parent: ename,
                    id: stack.id,
                    text: sname,
                    img: 'icon-page',
                    link: `deployment/get?id=${stack.id}`,
                    view: 'stack'
                };
                spkgi.nodes.push(citem);
            }
            spkgi.count = spkgi.nodes.length;
        }
        sitems.push(spkgi);
    }
    return sitems;
}

function getPhysicalNodes(deployments) {
    let sitems = [];
    for (let ename in deployments.environments) {
        let env = deployments.environments[ename];
        let spkgi = {
            id: "P" + ename,
            text: ename,
            img: 'icon-folder',
            view: 'environment',
            data: env,
            // link: `env/physical?id=${ename}`,
            nodes: []
        };
        let litem = {
            parent: "P" + ename,
            id: "P" + ename + ".NoLocation",
            text: "No Location",
            data: {devices: []},
            img: 'icon-folder',
            view: 'location',
            nodes: []
        };
        let locations = {};
        location["P" + ename + ".NoLocation"] = litem;
        spkgi.nodes.push(litem);
        if (env.physical) {
            for (let sname in env.physical.locations) {
                let loc = env.physical.locations[sname];
                loc.name = sname;
                loc.id = "P" + ename + '.' + sname;
                let citem = {
                    parent: "P" + ename,
                    id: "P" + ename + "." + sname,
                    text: sname,
                    data: loc,
                    img: 'icon-folder',
                    view: 'location',
                    nodes: []
                };
                loc.devices = [];
                spkgi.nodes.push(citem);
                locations[loc.id] = citem;
            }
            _connectPhysicalNodes(env.physical);
            for (let sname in env.physical.compute) {
                let compute = env.physical.compute[sname];
                compute.name = sname;
                compute.id = "P" + ename + '.' + sname;
                let citem = {
                    parent: "P" + ename,
                    id: "P" + ename + "." + sname,
                    text: sname,
                    data: compute,
                    img: 'icon-page',
                    view: 'device'
                };
                compute.kind = "compute";
                if (!compute.location) {
                    // locations["P" + ename + ".NoLocation"].nodes.push(citem);
                    // locations["P" + ename + ".NoLocation"].data.devices.push(compute);
                } else {
                    if(!locations["P" + ename + "." + compute.location]) {
                       locations["P" + ename + "." + compute.location] = {
                           parent: "P" + ename,
                           id: "P" + ename + "." + compute.location,
                           text: compute.location,
                           data: {devices: []},
                           img: 'icon-folder',
                           view: 'location',
                           nodes: []
                       }
                    }
                    locations["P" + ename + "." + compute.location].nodes.push(citem);
                    locations["P" + ename + "." + compute.location].data.devices.push(compute);
                }
            }
            for (let sname in env.physical.storage) {
                let storage = env.physical.storage[sname];
                storage.name = sname;
                storage.id = "P" + ename + '.' + sname;
                let citem = {
                    parent: 'P' + ename,
                    id: "P" + ename + "." + sname,
                    text: sname,
                    data: storage,
                    img: 'icon-page',
                    view: 'device'
                };
                storage.kind = "storage";
                if (!storage.location) {
                    // locations["P" + ename + ".NoLocation"].nodes.push(citem);
                    // locations["P" + ename + ".NoLocation"].data.devices.push(storage);
                } else {
                    if(!locations["P" + ename + "." + storage.location]) {
                        locations["P" + ename + "." + storage.location] = {
                            parent: "P" + ename,
                            id: "P" + ename + "." + storage.location,
                            text: storage.location,
                            data: {devices: []},
                            img: 'icon-folder',
                            view: 'location',
                            nodes: []
                        }
                    }
                    if(!locations["P" + ename + "." + storage.location]) {
                        locations["P" + ename + "." + storage.location] = { nodes: [], data: {devices: []}};
                    }
                    locations["P" + ename + "." + storage.location].nodes.push(citem);
                    locations["P" + ename + "." + storage.location].data.devices.push(storage);
                }
            }
            for (let sname in env.physical.network.devices) {
                let device = env.physical.network.devices[sname];
                device.name = sname;
                device.id = "P" + ename + '.' + sname;
                let citem = {
                    parent: 'P' + ename,
                    id: "P" + ename + "." + sname,
                    text: sname,
                    data: device,
                    img: 'icon-page',
                    view: 'device'
                };
                device.kind = "network";
                if (!device.location) {
                    // locations["P" + ename + ".NoLocation"].nodes.push(citem);
                   //  locations["P" + ename + ".NoLocation"].data.devices.push(device);
                } else {
                    if(!locations["P" + ename + "." + device.location]) {
                        locations["P" + ename + "." + device.location] = {
                            parent: "P" + ename,
                            id: "P" + ename + "." + device.location,
                            text: compute.location,
                            data: {devices: []},
                            img: 'icon-folder',
                            view: 'location',
                            nodes: []
                        }
                    }
                    locations["P" + ename + "." + device.location].nodes.push(citem);
                    locations["P" + ename + "." + device.location].data.devices.push(device);
                }
            }
            // Set the counts on the locations
            let count = 0;
            for (let sname in env.physical.locations) {
                count += locations["P" + ename + "." + sname].count = locations["P" + ename + "." + sname].nodes.length;
            }
            spkgi.count = count;
        }
        sitems.push(spkgi);
    }
    return sitems;
}

function _connectPhysicalNodes(environment) {
    // Connect all of the storage with the hosts that mount them.
    for (let cname in environment.compute) {
        let compute = environment.compute[cname];
        for (let dname in compute.disks) {
            let disk = compute.disks[dname];
            if (environment.storage.hasOwnProperty(disk.volume)) {
                disk.volumeObject = environment.storage[disk.volume];
                if (!environment.storage[disk.volume].hasOwnProperty('consumers')) {
                    environment.storage[disk.volume].consumers = {};
                }
                environment.storage[disk.volume].consumers[cname] = compute;
            }
        }
    }
    // Connect all of the network interfaces to the networks
    for (let nname in environment.network.devices) {
        let device = environment.network.devices[nname];
        device.networkObjects = {};
        for (let i in device.networks) {
            let netName = device.networks[i];
            device.networkObjects[netName] = environment.network.networks[netName];
        }
    }
    for (let dname in environment.compute) {
        let compute = environment.compute[dname];
        for (let nname in compute.networks) {
            if (!environment.network.networks[nname].devices) {
                environment.network.networks[nname].devices = {};
            }
            environment.network.networks[nname].devices[dname] = compute;
        }
    }
    for (let dname in environment.storage) {
        let storage = environment.storage[dname];
        for (let nname in storage.networks) {
            if (!environment.network.networks[nname].devices) {
                environment.network.networks[nname].devices = {};
            }
            environment.network.networks[nname].devices[dname] = storage;
        }
    }
}

function _normalizeEnvironment(results) {
    // first in the physical side make sure all of the devices in compute, network and storage have the _modules set
    // to the appropriate deviceType.
    for (let ename in results.environments) {
        let env = results.environments[ename];
        for (let dname in env.physical?.compute) {
            let device = env.physical.compute[dname];
            if (device.type && results.deviceTypes[device.type]) {
                device._module = results.deviceTypes[device.type];
            }
        }
    }
}


