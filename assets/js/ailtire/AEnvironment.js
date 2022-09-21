import {AText, AStack, AService, A3DGraph, ASelectedHUD} from './index.js';

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
    static default = {
        fontSize: 20,
        height: 100,
        width: 50,
        depth: 20
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {return item.length;});
        let maxLetters = nameArray.reduce(function(a, b) { return Math.max(a, b); }, -Infinity);
        let height = nameArray.length*AEnvironment.default.fontSize;
        let width = maxLetters * AEnvironment.default.fontSize + 10;
        let depth = AEnvironment.default.depth;
        let radius = Math.max(Math.sqrt(width*width + height*height), Math.sqrt(height*height + depth*depth), Math.sqrt(width*width + depth*depth))/2;
        return {w: width, h: height, d: AEnvironment.default.depth, r:radius};
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
        name.replace('/','');
        let label = AText.view3D({text:name.replace(/\//g, '\n'), color:"#ffffff", width: size.w, size: AEnvironment.default.fontSize});
        label.position.set(0,0,(size.d/2)+1);
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
        node.box = size.r;
        node.expandLink = node.expandLink || `env/get?id=${node.id}`;
        node.expandView = node.expandView || AEnvironment.handle;
        node.getDetail = AEnvironment.getDetail;

        return retval;
    }
    static viewList3D(objs) {
        let data = {nodes: {}, links: []};

        window.graph.clearObjects();
        for (let ename in objs) {
            let env = objs[ename];
            data.nodes[ename] = {
                id: ename,
                name: ename,
                view: AEnvironment.view3D,
            };
            for(let sname in env) {
                let stack = env[sname];
                stack.id = `${ename}.${sname}`;
                data.nodes[stack.id] = {
                    id: stack.id,
                    name: sname,
                    view: AStack.view3D,
                }
                data.links.push({target: ename, source: stack.id, width: 1.0, value: 10 });
            }
        }

        window.graph.setData(data.nodes, data.links);
        window.graph.showLinks();
    }
    static viewDeep3D(obj, mode ) {
        let data = {nodes:{}, links: []};
        for(let sname in obj.stacks) {
            let id = obj.stacks[sname].id;
            data.nodes[id] = {
                id: id,
                name: sname,
                view: AStack.view3D,
                group: "deployment",
            }
        }
        for(let sname in obj.stacks) {
            let stack = obj.stacks[sname];
            let stid = stack.id;
            for (let srname in stack.services) {
                let service = stack.services[srname];
                let extendedName = srname;
                // Stacks are unique alread. But Service names might not be. They need to be fully qualified.
                if(service.type === 'stack') {
                    // The service type as a stack is the sidecar container and points to a stack. G
                    // Get the stack from the list of stacks.
                    if(obj.stacks.hasOwnProperty(service.image)) {
                        extendedName = obj.stacks[service.image].id;
                    } else {
                        extendedName = service.image;
                    }
                }
                if(!data.nodes.hasOwnProperty(extendedName)) {
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

        for(let sname in result.stacks) {
            let stack = result.stacks[sname];
            if(stack) {
                let rec = {
                    recid: sname,
                    name: sname,
                }
                if(stack.services) {
                    let objs = stack.services;
                    rec.services = Object.keys(objs).length;
                    rec.servicesdetail = "Services|" + getDetails(objs, 'service/get').join(", ");
                }
                if(stack.networks) {
                    let objs = stack.networks;
                    rec.networks = Object.keys(objs).length;
                    rec.networksdetail = "Networks|" + getDetails(objs, 'network/get').join(", ");
                }
                if(stack.data) {
                    let objs = stack.data;
                    rec.data= Object.keys(objs).length;
                    rec.datadetail = "Data|" + getDetails(objs, "data/get").join(", ");
                }
                if(stack.interface) {
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
            for(let rname in record) {
                k++;
                if(rname.includes('detail')) {
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
        for(let ename in result) {
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
            for(let rname in record) {
                k++;
                if(rname.includes('detail')) {
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
        AEnvironment.viewDeep3D(result, 'new');
        AEnvironment.showDetail(result);
    }
    static handleList(result) {
        AEnvironment.viewList3D(result, 'new');
        AEnvironment.showListDetail(result);
    }
}
function getDetails(objs,link) {
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
