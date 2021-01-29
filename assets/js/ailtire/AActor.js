import {AScenario, AText, AUsecase} from './index.js';

export default class AActor {
    constructor(config) {
        this.config = config;
        console.log("AUsecase:", config);
    }

    static view3D(node, type) {
        let color = node.color || "lightgray";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = 3.14 / 2;
        const group = new THREE.Group();
        const head = new THREE.SphereGeometry(15, 16, 12);
        const material = new THREE.MeshLambertMaterial({color: color, opacity: 1});
        const headObj = new THREE.Mesh(head, material);
        group.add(headObj);
        const body = new THREE.CylinderGeometry(3, 3, 50);
        const bodyObj = new THREE.Mesh(body, material);
        bodyObj.position.set(0, -25, 0);
        group.add(bodyObj);
        const arms = new THREE.CylinderGeometry(3, 3, 30);
        const armsObj = new THREE.Mesh(arms, material);
        armsObj.applyMatrix4(new THREE.Matrix4().makeRotationZ(theta));
        armsObj.position.set(0, -25, 0);
        group.add(armsObj);
        const rleg = new THREE.CylinderGeometry(3, 3, 30);
        const rlegObj = new THREE.Mesh(rleg, material);
        rlegObj.applyMatrix4(new THREE.Matrix4().makeRotationZ(theta / 2));
        rlegObj.position.set(11, -58, 0);
        group.add(rlegObj);

        const lleg = new THREE.CylinderGeometry(3, 3, 30);
        const llegObj = new THREE.Mesh(lleg, material);
        llegObj.applyMatrix4(new THREE.Matrix4().makeRotationZ(-theta / 2));
        llegObj.position.set(-11, -58, 0);
        group.add(llegObj);

        let label = AText.view3D({text:node.name.replace(/\s/g, '\n'), color:"#ffffff", width: 50, size: 12});
        label.position.set(0,-30,7);
        group.add(label);

        group.position.set(node.x, node.y, node.z);
        if (node.rotate) {
            if (node.rotate.x) {
                group.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if (node.rotate.y) {
                group.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if (node.rotate.x) {
                group.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        group.aid = node.id;
        node.box = 100;
        node.expandLink = `actor/get?id=${node.id}`;

        return group;
    }

    static viewDeep3D(obj) {

    }

    handle(result) {
        showGraph(result, 'new');
        let records = [];
        if (!w2ui['objlist']) {
            $('#objlist').w2grid({name: 'objlist'});
        }
        if (!w2ui['objdetail']) {
            $('#objdetail').w2grid({
                name: 'objdetail',
                header: 'Details',
                show: {header: true, columnHeaders: false},
                columns: [
                    {
                        field: 'name',
                        caption: 'Name',
                        size: '100px',
                        style: 'background-color: #efefef; border-bottom: 1px solid white; padding-right: 5px;',
                        attr: "align=right"
                    },
                    {
                        field: 'value', caption: 'Value', size: '100%', render: function (record) {
                            return '<div>' + record.value + '</div>';
                        }
                    }
                ]
            });
        }
        let cols = [
            {field: 'name', size: "20%", resizeable: true, caption: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, caption: "Value", sortable: true},
        ];
        w2ui['objlist'].columns = cols;
        let i = 0;
        records.push({recid: i++, name: 'name', value: result.name, detail: result.name});
        records.push({recid: i++, name: 'shortname', value: result.shortname, detail: result.shortname});
        records.push({recid: i++, name: 'description', value: result.description, detail: result.description});
        let ucdetails = getDetails(result.usecases);
        if(result.usecases) {
            records.push({
                recid: i++,
                name: 'usecases',
                value: Object.keys(result.usecases).length,
                detail: ucdetails.join('|')
            });
        }
        let sdetails = getDetails(result.scenarios);
        if(result.scenarios) {
            records.push({
                recid: i++,
                name: 'scenarios',
                value: Object.keys(result.scenarios).length,
                detail: sdetails.join('|')
            });
        }
        w2ui['objlist'].records = records;
        w2ui['objlist'].refresh();
    }
}

function showGraph(actor, mode) {
    let data = {nodes: {}, links: []};

    window.graph.clearObjects();
    let node = {id: actor.shortname, name: actor.name.replace(/\s/g,'\n'), view: AActor.view3D, fx: 0, fy: 0, fz: 0};

    data.nodes[actor.shortname] = node;
    let i = 0;
    for (let j in actor.scenarios) {
        let scenario = actor.scenarios[j];
        let node = {
            id: j,
            name: scenario.name.replace(/\s/g, '\n'),
            view: AScenario.view3D,
        };
        data.nodes[j] = node;
        i++;
    }
    i = 0;
    for (let j in actor.usecases) {
        let uc = actor.usecases[j];
        let node = {id: j, name: uc.name.replace(/\s/g, '\n'), view: AUsecase.view3D}
        data.nodes[j] = node;
        i++;
        data.links.push({source: actor.shortname, target: j, value: 0.1});
        for (let k in uc.scenarios) {
            if (data.nodes.hasOwnProperty(k)) {
                data.links.push({source: j, target: k, value: 0.1});
            }
        }
    }

    if (mode === 'add') {
        window.graph.addData(data.nodes, data.links);
    } else {
        window.graph.setData(data.nodes, data.links);
    }
    window.graph.showLinks();
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
