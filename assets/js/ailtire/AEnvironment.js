import {AText, AStack, AService } from './index.js';

export default class AEnvironment {
    constructor(config) {
        this.config = config;
    }
    static showList(panel, parent) {
        $.ajax({
            url: 'deployment/list',
            success: function (results) {
                let deploymentList = getDeploymentNodes(results);
                w2ui[panel].add(parent, deploymentList);
            }
        });
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
        let geo = new THREE.BoxGeometry(100, 50, 20);
        const material = new THREE.MeshPhongMaterial({color: color, opacity: 1});
        const retval = new THREE.Mesh(geo, material);
        retval.position.set(node.x, node.y, node.z);
        let name = node.name;
        name.replace('/','');
        let label = AText.view3D({text:name.replace(/\//g, '\n'), color:"#ffffff", width: 50, size: 16});
        label.position.set(0,0,11);
        retval.add(label)
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
        node.box = 50;
        node.expandLink = `environment/get?id=${node.id}`;
        node.expandView = AEnvironment.viewDeep3D;

        return retval;
    }
    static viewList3D(objs) {
        let data = {nodes: {}, links: []};

        window.graph.clearObjects();
        for (let ename in objs) {
            let env = objs[ename];
            env.id = ename;
            data.nodes[env.id] = {
                id: env.id,
                name: env.id,
                view: AEnvironment.view3D,
                expandView: AEnvironment.viewDeep3D,
                expandLink: `environment/get?id=${env.id}`
            };
        }

        window.graph.setData(data.nodes, data.links);
        window.graph.showLinks();
    }
    static viewDeep3D(obj, mode ) {
        let data = {nodes:{}, links: []};
        console.log(obj);
        for(let sname in obj.stacks) {
            data.nodes[sname] = {
                id: sname,
                name: sname,
                view: AStack.view3D,
                expandView: AStack.viewDeep3D,
                expandLink: `deployment/get?id=${sname}`,
                group: "deployment",
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
                        view: AService.view3D,
                        expandView: AService.viewDeep3D,
                        expandLink: `service/get?id=${extendedName}`,
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
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'services', size: "20%", resizeable: true, label: "Services", sortable: true},
            {field: 'networks', size: "20%", resizeable: true, label: "Networks", sortable: true},
            {field: 'data', size: "20%", resizeable: true, label: "Data", sortable: true},
            {field: 'interface', size: "20%", resizeable: true, caption: "Interface", sortable: true}
        ];
        w2ui['objlist'].columns = cols;
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

function getDeploymentNodes(deployments) {
    let sitems = [];
    for (let ename in deployments.environments) {
        let env = deployments.environments[ename];
        let spkgi = {
            id: ename,
            text: ename,
            img: 'icon-folder',
            view: 'environment',
            link: `environment/get?id=${ename}`,
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
