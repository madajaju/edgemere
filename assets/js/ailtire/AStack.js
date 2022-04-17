import {AImage, AInterface, ANetwork, AService, AText, AVolume} from './index.js';

export default class AStack {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let color = node.color || "#00aaaa";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = 3.14 / 2;
        const locations = [
            {x: 0, y: 0, z: 0},
            {x: -15, y: -30, z: 7.5},
            {x: 15, y: -30, z: 7.5},
            {x: 0, y: -30, z: -15},
        ]
        const opacity = node.opacity || 1;

        const group = new THREE.Group();
        for (let i = 0; i < locations.length; i++) {
            const material = new THREE.MeshPhongMaterial({color: color, transparent: true, opacity: opacity});

            const stack = new THREE.CylinderGeometry(7.5, 15, 30, 20);
            let obj = new THREE.Mesh(stack, material);
            obj.position.set(locations[i].x, locations[i].y, locations[i].z);
            group.add(obj);
        }

        let label = AText.view3D({text: node.name, color: "#ffffff", width: 80, size: 20});
        label.position.set(0, 0, 26);
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
        node.box = node.box || 50;
        node.expandView = AStack.viewDeep3D;
        node.expandLink = `deployment/get?id=${node.id}`;

        return group;
    }

    static viewBig3D(node, type) {
        let color = node.color || "#00aaaa";
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
            w = node.cube.w;
            h = node.cube.h;
            d = node.cube.d;
        }
        let opacity = node.opacity || 1;

        let geometry = new THREE.BoxGeometry(w, h, d);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            depthTest: true,
            depthWrite: true,
            flatShading: true,
            vertexColors: true,
            reflectivity: 1,
            refractionRatio: 1,
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
        let label = AText.view3D({text: node.name, color: "#ffffff", width: w, size: 15 * (w / 100)});
        // label.applyMatrix4(new THREE.Matrix4().makeScale(w/100, w/100, w/100));
        label.position.set(0, (h / 2) - 15 * (w / 100), (d / 2) + 1);
        retval.add(label)
        if (typeof node.box !== 'string') {
            node.box = node.box || Math.sqrt(d * d + h * h + w * w);
        } else {
            node.box = null;
        }
        node.expandLink = `deployment/get?id=${node.id}`;
        return retval;
    }

    static viewDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        const theta = 3.14 / 2;


        let yfactor = 1;
        let zfactor = 1;
        let xfactor = 1;
        if (obj.services) {
            yfactor = Math.round(Math.sqrt(Object.keys(obj.services).length) + 0.5);
            zfactor = Math.round((Object.keys(obj.services).length / yfactor) + 0.5);
        }
        if(obj.interface) {
            xfactor = Math.round((Object.keys(obj.interface).length / zfactor) + 0.5);
        }

        const cube = {
            w: xfactor * 120 + 50,
            h: yfactor * 120 + 50,
            d: zfactor * 120 + 50
        }
        data.nodes[obj.id] = {
            id: obj.id,
            name: obj.id,
            view: AStack.viewBig3D,
            expandView: AStack.viewDeep3D,
            expandLink: `deployment/get?id=${obj.id}`,
            fx: 0, fy: 0, fz: 0,
            box: "None",
            cube: cube,
            color: "#00aaaa",
            opacity: 0.5
        };
        let srbox = { // yz plane
            parent: obj.id,
            x: {min: (cube.w / 2) + 20, max: (cube.w / 2) + 20},
            y: {min: (-cube.h / 2) + 40, max: (cube.h / 2) - 40},
            z: {min: (-cube.d / 2) + 40, max: (cube.d / 2) - 40},
        }
        let irbox = { // xz plane
            parent: obj.id,
            x: {min: (-cube.w / 2) + 40, max: (cube.w / 2) - 40},
            y: {min: (cube.h / 2) + 20, max: (cube.h / 2) + 20},
            z: {min: (-cube.d / 2) + 40, max: (cube.d / 2) - 40}
        }
        // Network bounding box
        let nrbox = {
            parent: obj.id,
            x: {min: (-cube.w / 2) - 20, max: (-cube.w / 2) - 20},
            y: {min: (-cube.h / 2) + 10, max: (cube.h / 2) - 10},
            z: {min: -20, max: -20},
        }
        // Volume Box
        let vbox = {
            parent: obj.id,
            x: {min: (-cube.w / 2) + 40, max: (cube.w / 2) - 60},
            y: {min: (-cube.h / 2) - 20, max: (-cube.h / 2) - 20 },
            z: {min: -cube.d, max: 10}
        }
        let imbox = {
            parent: obj.id,
            x: {min: (-cube.w / 2) + 40, max: (cube.w / 2) - 40},
            y: {min: (-cube.h / 2) + 40, max: (cube.h / 2) - 40},
            z: {min: (-cube.d / 2) - 10, max: (-cube.d / 2) -10}
        }
        let inodes = {};
        for (let iname in obj.interface) {
            let inter = obj.interface[iname];
            data.nodes["I-" + iname] = {
                id: "I-" + iname,
                name: inter.path,
                view: AInterface.view3D,
                rbox: irbox,
            }
            inodes["I-" + iname] = data.nodes["I-" + iname];
        }
        matrixLayout(inodes, irbox, {x: xfactor, y: 1, z: zfactor});
        let srnodes = {};
        let imnodes = {};
        let vnodes = {};

        for (let sname in obj.services) {
            let service = obj.services[sname];
            let view = AService.view3D;
            let expandView = AService.viewDeep3D;
            if (service.type === 'stack' || service.type === 'Stack') {
                view = AStack.view3D;
                expandView = AStack.viewDeep3D;
            }
            data.nodes[sname] = {
                id: sname,
                name: sname,
                view: view,
                expandView: expandView,
                expandLink: `deployment/get?id=${sname}`,
                rbox: srbox,
                rotate: {y: theta}
            };
            srnodes[sname] = data.nodes[sname];
            for (let iname in service.interface) {
                data.links.push({target: sname, source: "I-" + iname, value: 0.1, width: 2.0});
            }
            let image = service.image;
            data.nodes[`Img-${image}`] = {
                id: `Img-${image}`,
                name: image.replace(/:/, '\n'),
                view: AImage.view3D,
                rbox: imbox,
                rotate: {y: 2 * theta},
            };
            imnodes[`Img-${image}`] = data.nodes[`Img-${image}`];
            data.links.push({target: sname, source: `Img-${image}`, value: 0.1, width: 2.0});

            for (let vname in service.volumes) {
                let volume = service.volumes[vname];
                data.nodes[volume.source] = {
                    id: volume.source,
                    name: volume.target,
                    view: AVolume.view3D,
                    rbox: vbox,
                    rotate: {x: theta},
                };
                vnodes[volume.source] = data.nodes[volume.source];
                data.links.push({target: sname, source: volume.source, value: 2, width: 2.0});
            }
            for (let nname in service.networks) {
                data.links.push({target: `Net-${nname}`, source: sname, value: 0.1, width: 2.0});
            }
        }
        matrixLayout(srnodes, srbox, {x: 1, y: yfactor, z: zfactor})
        matrixLayout(imnodes, imbox, {x: xfactor, y: yfactor, z: 1})

        let prevID = obj.id;
        let nnodes = {};
        for (let nname in obj.networks) {
            let network = obj.networks[nname];
            data.nodes[`Net-${nname}`] = {
                id: `Net-${nname}`, name: nname, view: ANetwork.view3D,
                rbox: nrbox,
                rotate: {y: -theta}
            };
            nnodes[`Net-${nname}`] = data.nodes[`Net-${name}`];
        }

        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.showLinks();

        window.graph.toolbar.setToolBar( [
            { type: 'button',  id: 'images',  text: 'Images', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout( () => {
                        window.graph.graph.cameraPosition(
                            {x: 0, y: 0, z: -1000}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},1500);
                }
            },
            { type: 'button',  id: 'volumes',  text: 'Volumes', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout( () => {
                        window.graph.graph.cameraPosition(
                            {x: 0, y: -1000, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},1500);
                }
            },
            { type: 'button',  id: 'interface',  text: 'Interface', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout( () => {
                        window.graph.graph.cameraPosition(
                            {x: 0, y: 1000, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},1500);
                }
            },
            { type: 'button',  id: 'services',  text: 'Services', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout( () => {
                        window.graph.graph.cameraPosition(
                            {x: 1000, y: 0, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},1500);
                }
            },
            { type: 'button',  id: 'network',  text: 'Network', img: 'w2ui-icon-search',
                callback: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout( () => {
                        window.graph.graph.cameraPosition(
                            {x: -1000, y: 0, z: 0}, // new position
                            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                            1000
                        );
                    }, 500);
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},1500);
                }
            },
        ])

    }

    handle(result) {
        AStack.viewDeep3D(result, 'new');
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
            // this.showDetail(event);
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
        w2ui['objlist'].refresh();
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

function matrixLayout(nodes, bbox, layout) {

    let prevID = bbox.parent;
    let factors = {
        x: (bbox.x.max - bbox.x.min) / (layout.x + 1),
        y: (bbox.y.max - bbox.y.min) / (layout.y + 1),
        z: (bbox.z.max - bbox.z.min) / (layout.z + 1)
    }
    console.log("LAYOUT:", layout);
    console.log("FACTORS:", factors);
    let sortedK = Object.keys(layout).sort(function (a, b) {
        return layout[b] - layout[a]
    });
    // let count = 0;
    let coords = {x: 0, y: 0, z: 0};
    for (let i in nodes) {
        /*coords[sortedK[0]] = Math.floor(count / (layout[sortedK[1]]*layout[sortedK[2]]));
        coords[sortedK[1]] = Math.floor((count % (layout[sortedK[1]]*layout[sortedK[2]])) / layout[sortedK[2]]);
        coords[sortedK[2]] = (count % (layout[sortedK[0]]*layout[sortedK[2]])) % layout[sortedK[2]];
         */
        // count++;
        let node = nodes[i];
        node.rbox = {
            parent: bbox.parent,
            x: {min: bbox.x.min + (coords.x * factors.x), max: bbox.x.min + (coords.x * factors.x)},
            y: {min: bbox.y.min + (coords.y * factors.y), max: bbox.y.min + (coords.y * factors.y)},
            z: {min: bbox.z.min + (coords.z * factors.z), max: bbox.z.min + (coords.z * factors.z)},
        }
        console.log("ROWCOL:", coords);
        node.fx = node.rbox.x.min;
        node.fy = node.rbox.y.min;
        node.fz = node.rbox.z.min;

        coords[sortedK[0]]++;
        if (coords[sortedK[0]] >= layout[sortedK[0]]) {
            coords[sortedK[1]]++;
            coords[sortedK[0]] = 0;
            if (coords[sortedK[1]] >= layout[sortedK[1]]) {
                coords[sortedK[1]] = 0;
                coords[sortedK[2]]++;
            }
        }
        console.log("Location:", node.fx, node.fy, node.fz);
    }
}
