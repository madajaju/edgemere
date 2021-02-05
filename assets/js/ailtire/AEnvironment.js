import { AText, AStack, AService } from './index.js';

export default class AEnvironment {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let color = "blue";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let geo = new THREE.SphereGeometry(20, 16, 12);
        const material = new THREE.MeshPhongMaterial({color: color, opacity: 1});
        const item1 = new THREE.Mesh(geo, material);
        let geo2 = new THREE.CylinderGeometry(5, 5, 30);
        const material2 = new THREE.MeshPhongMaterial({color: color, opacity: 1});
        const item2 = new THREE.Mesh(geo2, material2);
        item2.position.set(0, -30, 0);
        const group = new THREE.Group();
        group.add(item1);
        group.add(item2);
        group.position.set(node.x, node.y, node.z);
        let name = node.name;
        name.replace('/','');
        let label = AText.view3D({text:name.replace(/\//g, '\n'), color:"#ffffff", width: 50, size: 16});
        label.applyMatrix4(new THREE.Matrix4().makeRotationX(-3.14/2));
        label.position.set(0,20+1,-20);
        group.add(label)
        group.aid = node.id;
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
        node.box = 40;
        // node.expandLink = `actor/get?id=${node.id}`;

        return group;
    }

    static viewDeep3D(obj, mode ) {
        let data = {nodes:{}, links: []};
        console.log(obj);
        for(let sname in obj.stacks) {
            let stack = obj.stacks[sname];
            data.nodes[sname] = {
                id: sname,
                name: sname,
                view: AStack.view3D,
                group: "deployment",
                expandLink: "deployment/get?id=${sname}"
            }
        }
        for(let sname in obj.stacks) {
            let stack = obj.stacks[sname];
            for (let srname in stack.design.services) {
                let service = stack.design.services[srname];
                let extendedName = `${sname}.${srname}`;
                // Stacks are unique alread. But Service names might not be. They need to be fully qualified.
                if(service.type === 'stack') {
                    extendedName = service.image;
                }
                if(!data.nodes.hasOwnProperty(extendedName)) {
                    data.nodes[extendedName] = {
                        id: extendedName,
                        name: srname,
                        view: AService.view3D
                    }
                }
                data.links.push({target: extendedName, source: sname, value: 30});
            }
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
    }
    handle(result) {
        AEnvironment.viewDeep3D(result, 'new');
       let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, caption: "Name", sortable: true},
            {field: 'services', size: "20%", resizeable: true, caption: "Services", sortable: true},
            {field: 'networks', size: "20%", resizeable: true, caption: "Networks", sortable: true},
            {field: 'data', size: "20%", resizeable: true, caption: "Data", sortable: true},
            {field: 'interface', size: "20%", resizeable: true, caption: "Interface", sortable: true}
        ];
        w2ui['objlist'].columns = cols;
        let i = 0;
        for(let sname in result.stacks) {
            let stack = result.stacks[sname];
            if(stack.design) {
                let rec = {
                    recid: sname,
                    name: sname,
                }
                if(stack.design.services) {
                    let objs = stack.design.services;
                    rec.services = Object.keys(objs).length;
                    rec.servicesdetail = getDetails(objs, 'service/get').join(", ");
                }
                if(stack.design.networks) {
                    let objs = stack.design.networks;
                    rec.networks = Object.keys(objs).length;
                    rec.networksdetail = getDetails(objs, 'network/get').join(", ");
                }
                if(stack.design.data) {
                    let objs = stack.design.data;
                    rec.data= Object.keys(objs).length;
                    rec.datadetail = getDetails(objs, "data/get").join(", ");
                }
                if(stack.design.interface) {
                    let objs = stack.design.interface;
                    rec.interface = Object.keys(objs).length;
                    rec.interfacedetail = getDetails(objs, "interface/get").join(", ");
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
            for(let rname in record) {
                if(rname.includes('detail')) {
                    let values = record[rname].split('|');
                    for (let i in values) {
                        let value = values[i];
                        k++;
                        drecords.push({recid: k, name: record.name, value: value});
                    }
                }
            }
            w2ui['objdetail'].add(drecords);
            window.graph.selectNodeByID(event.recid);
        }
        w2ui['objlist'].refresh();

    }
}
function getDetails(objs,link) {
    let items = [];
    let inum = 0;
    for (let j in objs) {
        let item = objs[j];
        inum++;
        let name = item.name || j;
        let nlink = item.link || `${link}?id=${name}`;
        items.push(`<span onclick="expandObject('${nlink}');">${name}</span>`);
    }
    return items;
}

