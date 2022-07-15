import {AText} from './index.js';

export default class AObject {
    constructor(config) {
        this.config = config;
    }
    static showList() {

    }
    static expandObject(link) {
        expandObjectOnGraph(link);
    }
    static addObject(obj, creator) {
        // Add the object to the list
        let ritem = {recid: obj._attributes.id};
        for (let i in obj.definition.attributes) {
            if (obj._attributes.hasOwnProperty(i)) {
                ritem[i] = obj._attributes[i];
                ritem[i + 'detail'] = obj._attributes[i];
            }
        }
        for (let i in obj.definition.associations) {
            if (obj._associations.hasOwnProperty(i)) {
                let assocValue = obj._associations[i];
                let assoc = obj.definition.associations[i];
                if (assoc.cardinality === 1) {
                    ritem[i] = assocValue._attributes.name;
                    ritem[i + 'detail'] = `<span onclick="expandObject('${assocValue.type}?id=${assocValue._attributes.id}');">${assocValue._attributes.name}</spana>`;
                } else {
                    ritem[i] = assocValue.length;
                    let values = [];
                    for (let j in assocValue) {
                        let aValue = assocValue[j];
                        values.push(`<span onclick="expandObject('${aValue.type}?id=${aValue._attributes.id}');">${aValue._attributes.name}</spana>`);
                    }
                    ritem[i + 'detail'] = values.join('|');
                }
            }
        }
        w2ui['objlist'].add([ritem]);
        // Add the object to the graph
        let data = {nodes: {}, links: []};
        data.nodes[obj._attributes.id] = {
            id: obj._attributes.id,
            name: obj._attributes.name,
            group: obj.definition.name,
            level: obj.definition.package.shortname,
            view: obj.definition.name + '3D'
        }
        if (creator) {
            data.links.push({target: obj._attributes.id, source: creator, value: 0.01, color: "lightgreen"});
        }
        // Now add the nodes of the associations
        // Go through the cols and get the associations
        for (let i in obj.definition.associations) {
            if (obj._associations.hasOwnProperty(i)) {
                let aobj = obj._associations[i];
                let assoc = obj.definition.associations[i];
                if (assoc.cardinality === 1) {
                    data.nodes[aobj._attributes.id] = {
                        id: aobj._attributes.id,
                        name: aobj._attributes.name,
                        group: aobj.definition.name,
                        level: aobj.definition.package.shortname,
                        view: aobj.definition.name + '3D'
                    };
                    if (assoc.owner || assoc.composite) {
                        data.links.push({
                            source: obj._attributes.id,
                            target: aobj._attributes.id,
                            value: 0.1
                        });
                    } else {
                        data.links.push({
                            target: obj._attributes.id,
                            source: aobj._attributes.id,
                            value: 0.1
                        });
                    }
                } else {
                    for (let j in aobj) {
                        let aaobj = aobj[j];
                        data.nodes[aaobj._attributes.id] = {
                            id: aaobj._attributes.id,
                            name: aaobj._attributes.name,
                            group: aaobj.definition.name,
                            level: aaobj.definition.package.shortname,
                            view: aaobj.definition.name + '3D'
                        };
                        if (assoc.owner || assoc.composite) {
                            data.links.push({
                                source: obj._attributes.id,
                                target: aaobj._attributes.id,
                                value: 5
                            });
                        } else {
                            data.links.push({
                                target: obj._attributes.id,
                                source: aaobj._attributes.id,
                                value: 5
                            });
                        }
                    }
                }
            }
        }
        // If there is a creator and there is not an rbox then add an rbox to the creator.
        if(creator) {
            let rbox = {
                parent:creator,
                x:{min:-200,max: 200},
                z:{min:-400,max:0},
                y: {min:-200, max:200}
            }

            for(let i in data.nodes) {
                if(!data.nodes[i].rbox) {
                    data.nodes[i].rbox = rbox;
                }
            }
        }
        window.graph.addData(data.nodes, data.links);
    }

    static view3D(node, type) {
        let color = node.color || "blue";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let w = node.w || 120;
        let h = node.h || 40;

        const theta = 3.14 / 2;
        const group = new THREE.Group();
        const material = new THREE.MeshLambertMaterial({color: color, opacity: 1});
        const left = new THREE.SphereGeometry(h / 2, 16, 12);
        let leftObj = new THREE.Mesh(left, material);
        leftObj.position.set(-(w - h) / 2, 0, 0)
        const right = new THREE.SphereGeometry(h / 2, 16, 12);
        let rightObj = new THREE.Mesh(right, material);
        rightObj.position.set((w - h) / 2, 0, 0)
        const center = new THREE.CylinderGeometry(h / 2, h / 2, w - h);
        let centerObj = new THREE.Mesh(center, material);
        centerObj.applyMatrix4(new THREE.Matrix4().makeRotationZ(theta));
        group.add(leftObj);
        group.add(rightObj);
        group.add(centerObj);

        let label = AText.view3D({text: node.name, color: "#ffffff", width: w - h, size: (h / 2)});
        label.position.set(0, 0, (h / 2) + 1);
        label.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
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
        node.box = h;
        node.expandLink = `action/get?id=${node.id}`;
        node.expandView = AObject.viewDeep3D;

        return group;
    }

    static viewDeep3D(obj) {

    }
}

function expandObjectOnGraph(link) {
    $.ajax({
        url: link,
        success: A3DGraph.addObjectToGraph
    });
}
