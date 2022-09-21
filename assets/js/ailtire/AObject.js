import {AText, A3DGraph, ASelectedHUD} from './index.js';

export default class AObject {
    static scolor = {
        started: "#aaffff",
        create: "#aaffff",
        completed: "#aaffaa",
        failed: "#ffaaaa",
        enabled: "#aaffaa",
        disable: "#aaaaaa",
        rejected: "#ffaaaa",
        accepted: "#aaffff",
        update: "#aaffff",
        needed: "#ffbb44",
        selected: "#aaffaa",
        evaluated: "#ffffaa",
    };

    constructor(config) {
        this.config = config;
    }

    static showList() {

    }

    static expandObject(link) {
        expandObjectOnGraph(link);
    }

    static showDetail(id) {
        let myListForm = w2ui['objlist'];
        if (!myListForm) {
            return;
        }
        let aresults = myListForm.results;
        if (!aresults) {
            return;
        }

        for (let i in aresults.records) {
            if (aresults.records[i]._id === id) {
                let results = aresults.records[i];
                w2ui['objdetail'].header = `${results._name} Details`;
                w2ui['objdetail'].show.columnHeaders = true;
                w2ui['objdetail'].clear();

                let drecords = [];
                let k = 0;
                for (let i in results) {
                    let name = i;
                    let value = results[i];
                    if (results[i].hasOwnProperty('count')) {
                        value = results[i].count;
                    } else if (results[i].hasOwnProperty('name')) {
                        value = results[i].name;
                    }
                    k++;
                    drecords.push({recid: k, name: name, value: value});
                }
                w2ui['objdetail'].records = drecords;
                w2ui['objdetail'].refresh();
                ASelectedHUD.update(results._name + ' Details', drecords);
            }
        }
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
            universe: "Created",
            level: obj.definition.package.shortname,
            view: obj.definition.name + '3D'
        }
        if (creator) {
            data.links.push({target: obj._attributes.id, source: creator, value: 50, width: 0.5, color: "lightgreen"});
        }
        // Now add the nodes of the associations
        // Go through the cols and get the associations

        addRelationshipObjects(data, obj.definition,obj._associations, data.nodes[obj._attributes.id]);
        // If there is a creator and there is not an rbox then add an rbox to the creator.
        if (creator) {
            let rbox = {
                parent: creator,
                x: {min: -2000, max: 2000},
                z: {min: -2000, max: -700},
                y: {min: -2000, max: 2000}
            }

            for (let i in data.nodes) {
                if (!data.nodes[i].rbox) {
                    data.nodes[i].rbox = rbox;
                    data.universe = "Created";
                }
            }
        }
        window.graph.addData(data.nodes, data.links);
    }

    static createList(results) {
        let cols = [
            {field: 'state', size: "10%", resizeable: true, label: "State", sortable: true},
            {field: 'id', size: "20%", resizeable: true, label: "ID", sortable: true},
            {field: 'name', size: "70%", resizeable: true, label: "Object Name", sortable: true},
        ];
        let retForm = w2ui['objlist'];
        retForm.modelName = results.name;
        retForm.columns = cols;
        retForm.header = `${results.name} Objects (${results.records.length})`;
        retForm.show.columnHeaders = true;
        retForm.show.header = true;
        w2ui['objdetail'].clear();
        retForm.onClick = function (event) {
            // The detail is loaded in the showDetail which is called after the node is selected in the graph.
            // this happens in the callback function for selecting a node.
            window.graph.selectNodeByID(event.recid);
        };

        retForm.refresh();
        return retForm
    }

    static viewList(results) {
        let myForm = AObject.createList(results);
        myForm.results = results;
        let records = [];
        for (let i in results.records) {
            let rec = results.records[i];
            let color = AObject.scolor[`${rec._state.toLowerCase()}`];
            let ritem = {
                recid: rec._id,
                id: rec._id,
                state: rec._state,
                name: rec._name,
                statedetail: rec._state,
                results: rec,
                "w2ui": {"style": {0: `background-color: ${color}`}}
            };
            records.push(ritem);
        }
        myForm.records = records;
        // Create new records that show the number of each state.
        let jmap = {};
        for(let i in records) {
            let rec = records[i];
            if(!jmap.hasOwnProperty(rec.state)) {
                jmap[rec.state] = {name: rec.state, value: 0};
            }
            jmap[rec.state].value++;
        }
        let jrecords = [{name:'Total', value: records.length}]
        for(let name in jmap) {
            jrecords.push({name:name, value:jmap[name].value});
        }
        ASelectedHUD.update(results.name + 's', jrecords);
        myForm.refresh();
        return myForm;
    }

    static viewDetail(model, records) {
        let myForm = AObject.createDetail(model);
        $('#objdetail').w2render(myForm.name);
        myForm.clear();
        myForm.model = model.name;
        myForm.oid = model.id;
        myForm.add(records);
        myForm.refresh();
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

    static handle(results) {
        window.graph.setDuplicateLink(false);
        AObject.processObjectsForGraph(results, 'new');
        AObject.viewList(results);
    }

    static processObjectsForGraph(objs, mode) {
        let data = {nodes: {}, links: []};
        for (let i in objs.records) {
            let rec = objs.records[i];
            // Fix the problem with naming objects.
            if (!rec.hasOwnProperty('name')) {
                rec._name = rec._id;
            }
            ;
            data.nodes[rec._id] = {
                id: rec._id,
                name: rec._name,
                group: rec._type,
                level: rec._package,
                view: rec._type + '3D',
                link: rec._link
            }
            // Now add the nodes of the associations
            // Go through the cols and get the associations
            for (let j in objs.columns) {
                let col = objs.columns[j];
                // this checks if it was an association
                if (rec[j] && col.hasOwnProperty('cardinality')) {
                    let obj = rec[j];
                    if (col.cardinality === 1) {
                        if (obj._name.length < 1) {
                            obj._name = obj._id;
                        }
                        data.nodes[obj._id] = {
                            id: obj._id,
                            name: obj._name,
                            group: obj._type,
                            level: col.package,
                            view: obj._type + '3D',
                            link: obj._link
                        };
                        if (col.owner || col.composition) {
                            data.links.push({
                                source: rec._id, target: obj._id, value: 1, width: 0.5
                            });
                        } else {
                            data.links.push({
                                source: obj._id, target: rec._id, value: 10, width: 0.5
                            });
                        }
                    } else {
                        for (let k in obj.values) {
                            let aobj = obj.values[k];
                            if (aobj._name.length < 1) {
                                aobj._name = aobj.id;
                            }
                            data.nodes[aobj._id] = {
                                id: aobj._id,
                                name: aobj._name,
                                group: aobj._type,
                                level: col.package,
                                view: aobj._type + '3D',
                                link: aobj._link
                            };
                            if (col.owner || col.composition) {
                                data.links.push({
                                    source: rec._id, target: aobj._id, value: 1, width: 0.5
                                });
                            } else {
                                data.links.push({
                                    target: rec._id, source: aobj._id, value: 10, width: 0.5
                                });
                            }
                        }
                    }
                }
            }
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
    }
}

function expandObjectOnGraph(link) {
    $.ajax({
        url: link,
        success: A3DGraph.addObjectToGraph
    });
}

function addRelationshipObjects(data, definition, associations,parent) {
    for (let i in associations) {
        if (associations.hasOwnProperty(i)) {
            let aobj = associations[i];
            if(!definition.associations.hasOwnProperty(i)) {
                console.log("i:", i);
            } else {
                let assoc = definition.associations[i];
                if (assoc.cardinality === 1) {
                    data.nodes[aobj._attributes.id] = {
                        id: aobj._attributes.id,
                        name: aobj._attributes.name,
                        group: aobj.definition.name,
                        level: aobj.definition.package.shortname,
                        universe: "Created",
                        view: aobj.definition.name + '3D'
                    };
                    if (assoc.owner || assoc.composite) {
                        data.links.push({
                            source: obj._attributes.id,
                            target: aobj._attributes.id,
                            value: 1,
                            width: 0.5
                        });
                    } else {
                        data.links.push({
                            target: parent.id,
                            source: aobj._attributes.id,
                            value: 10,
                            width: 0.5,
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
                            universe: "Created",
                            view: aaobj.definition.name + '3D'
                        };
                        if (assoc.owner || assoc.composite) {
                            data.links.push({
                                source: parent.id,
                                target: aaobj._attributes.id,
                                value: 1,
                                width: 0.5
                            });
                        } else {
                            data.links.push({
                                target: parent.id,
                                source: aaobj._attributes.id,
                                value: 10,
                                width: 0.5
                            });
                        }
                    }
                }
            }
        }
    }
}
