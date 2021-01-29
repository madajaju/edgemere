import {AText, AService, ANetwork, AImage,AVolume} from './index.js';

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
        // node.expandLink = `actor/get?id=${node.id}`;

        return group;
    }

    static viewDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        const theta = 3.14 / 2;

        data.nodes[obj.id] = {
            id: obj.id,
            name: obj.id,
            view: AStack.view3D,
            fx: 0, fy: 0, fz: 0,
            box: 0.1
        };
        let srbox = {
            parent: obj.id,
            x: {min: -300, max: 300},
            y: {min: -300, max: 300},
            z: {min: -300, max: 300},
        }
        let irbox = {
            parent: obj.id,
            x: {min: 400, max: 400},
            y: {min: -400, max: 400},
            z: {min: -400, max: 400}
        }
        let nrbox = {
            parent: obj.id,
            x: {min: 0, max: 0},
            y: {min: 400, max: 400},
            z: {min: -40, max: -40}
        }
        let stbox = {
            parent: obj.id,
            x: {min: -400, max: -400},
            y: {min: -400, max: 400},
            z: {min: -400, max: 400}
        }
        let prevIDI = obj.id;
        let prevIDS = obj.id;
        for (let sname in obj.services) {
            let service = obj.services[sname];
            data.nodes[sname] = {
                id: sname,
                name: sname,
                view: AService.view3D,
                rbox: srbox
            };
            let image = service.image;
            data.nodes[`Img-${image}`] = {
                id: `Img-${image}`,
                name: image.replace(/:/, '\n'),
                view: AImage.view3D,
                rbox: irbox,
                rotate: { y: theta },
            };
            data.links.push({target: sname, source: `Img-${image}`, value: 1});
            /* prevIDI = `Img-${image}`;
            irbox = {
                parent: prevIDI,
                x: {min: 0, max: 0},
                y: {min: -80, max: -80},
                z: {min: 0, max: 0}
            };
             */

            for (let stname in service.volumes) {
                let volume = service.volumes[stname].source;
                data.nodes[volume] = {
                    id: volume,
                    name: volume,
                    view: AVolume.view3D,
                    rbox: stbox,
                    rotate: { y: -theta },
                };
               /* prevIDS = stname;
                stbox = {
                    parent: prevIDS,
                    x: {min: 0, max: 0},
                    y: {min: -80, max: -80},
                    z: {min: 0, max: 0}
                };
                */
                data.links.push({target:sname, source:stname, value: 2});
            }
            for (let nname in service.networks) {
                data.links.push({target: `Net-${nname}`, source: sname, value: 0.1});
            }
        }

        let prevID = obj.id;
        for (let nname in obj.networks) {
            let network = obj.networks[nname];
            data.nodes[`Net-${nname}`] = {
                id: `Net-${nname}`, name: nname, view: ANetwork.view3D,
                rbox: nrbox,
                rotate: { x: -theta }
            };
            prevID = `Net-${nname}`;
            nrbox = {
                parent: prevID,
                x: {min: 0, max: 0},
                y: {min: 0, max: 0},
                z: {min: -50, max: -50}
            }
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.showLinks();
    }

    handle(result) {
        AStack.viewDeep3D(result, 'new');
        let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, caption: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, caption: "Value", sortable: true},
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
