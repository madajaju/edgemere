/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {AText, A3DGraph, ASelectedHUD, AMainWindow} from './index.js';

export default class AObject {
    static _ships = {};
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
        if (obj._attributes && !creator) {
            // Add the object to the list Only if the creator is not set. This prevents junk from being added to the
            // detail list.
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
        } else if (obj._attributes) {
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
                data.links.push({
                    target: obj._attributes.id,
                    source: creator,
                    value: 100,
                    width: 0.001,
                    color: "#aaffff"
                });
            }
            // Now add the nodes of the associations
            // Go through the cols and get the associations

            addRelationshipObjects(data, obj.definition, obj._associations, data.nodes[obj._attributes.id]);
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
                    }
                }
            }
            window.graph.addData(data.nodes, data.links);
        } else {
            return;
            console.log("Event:", obj);
            if (!AObject._ships.hasOwnProperty(obj.MMSI)) {
                let obj3D = _getShip3D(obj);
                AObject._ships[obj.MMSI] = obj;
                let ship = AObject._ships[obj.MMSI];
                ship.object3D = obj3D;
                ship.z = 0;
                ship.x = obj.location.LAT * 10;
                ship.y = obj.location.LONG * 10;
                _setShipPosition(ship);
                window.graph.addObject(ship.object3D);
                window.graph.addObject(ship.arrowObj);
            } else {
                /*
                AObject._ships[obj.MMSI] = {
                    name: obj.VesselName,
                    description: `${obj.VesselName}\nSOG: ${obj.location.SOG}\nCOG: ${obj.location.COG}\nLAT: ${obj.location.LAT}\nLONG: ${obj.location.LONG}`,
                    id: obj.MMSI,
                    fx: obj.location.LAT*10,
                    fy: obj.location.LONG*10,
                    fz: 100,
                    group: "Ship"
                };
                window.graph.addData(AObject._ships, []);
                // let objID = "#" + node.view + type;
                 */
                let ship = AObject._ships[obj.MMSI];
                let obj3D = ship.object3D;
                let point1 = {x: ship.x, y: ship.y, z: ship.z};
                ship.z++;
                ship.x = obj.location.LAT * 10;
                ship.y = obj.location.LONG * 10;
                let point2 = {x: ship.x, y: ship.y, z: ship.z};
                let lineObj = _getLine(point1, point2, "#cccccc");
                window.graph.addObject(lineObj);
                _setShipPosition(ship);
            }
        }
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
            let record = this.get(event.recid);
            window.graph.selectNodeByID(event.recid);
            AMainWindow.selectedObject = record;
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
        for (let i in records) {
            let rec = records[i];
            if (!jmap.hasOwnProperty(rec.state)) {
                jmap[rec.state] = {name: rec.state, value: 0};
            }
            jmap[rec.state].value++;
        }
        let jrecords = [{name: 'Total', value: records.length}]
        for (let name in jmap) {
            jrecords.push({name: name, value: jmap[name].value});
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

    static editObject(obj) {
        if (AMainWindow.objectEditors.hasOwnProperty(obj._type)) {
            let editForm = AMainWindow.objectEditors[obj._type](obj);
            w2popup.open({
                height: 850,
                width: 850,
                title: `Edit ${obj._type}`,
                body: '<div id="editObjectDialog" style="width: 100%; height: 100%;"></div>',
                showMax: true,
                onToggle: function (event) {
                    $(w2ui.editModelDialog.box).hide();
                    event.onComplete = function () {
                        $(w2ui.editObjectDialog.box).show();
                        w2ui.editObjectDialog.resize();
                    }
                },
                onOpen: function (event) {
                    event.onComplete = function () {
                        // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler,
                        // which would make this code execute too early and hence not deliver.
                        $('#editObjectDialog').w2render(editForm);
                    }
                }
            });
        }
    }
}

function expandObjectOnGraph(link) {
    $.ajax({
        url: link,
        success: A3DGraph.addObjectToGraph
    });
}

function addRelationshipObjects(data, definition, associations, parent) {
    for (let i in associations) {
        if (associations.hasOwnProperty(i)) {
            let aobj = associations[i];
            if (!definition.associations.hasOwnProperty(i)) {
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

const _getLine = (point1, point2, color) => {
    const mat = new THREE.LineBasicMaterial({color: color});
    const points = [];
    points.push(new THREE.Vector3(point1.x, point1.y, point1.z));
    points.push(new THREE.Vector3(point2.x, point2.y, point2.z));

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const ret = new THREE.Line(geo, mat);
    return ret;
}
const _shipColor = {
    21: "#ffffaa",
    22: "#ffffaa",
    30: "#ff8844",
    31: "#ffffaa",
    32: "#ffffaa",
    35: "#4488ff",
    36: "#44ff88",
    52: "#ffffaa",
    60: "#44ff88",
    61: "#44ff88",
    62: "#44ff88",
    63: "#44ff88",
    64: "#44ff88",
    65: "#44ff88",
    66: "#44ff88",
    67: "#44ff88",
    68: "#44ff88",
    69: "#44ff88",
    70: "#ffffaa",
    71: "#ffffaa",
    72: "#ffffaa",
    73: "#ffffaa",
    74: "#ffffaa",
    75: "#ffffaa",
    76: "#ffffaa",
    77: "#ffffaa",
    78: "#ffffaa",
    79: "#ffffaa",
    80: "#ffaa88",
    81: "#ffaa88",
    82: "#ffaa88",
    83: "#ffaa88",
    84: "#ffaa88",
    85: "#ffaa88",
    86: "#ffaa88",
    87: "#ffaa88",
    88: "#ffaa88",
    89: "#ffaa88"
}

const _getShip3D = (ship) => {
    let color = "#ffffff";
    if (_shipColor.hasOwnProperty(ship.VesselType)) {
        color = _shipColor[ship.VesselType];
    }
    const geo = new THREE.ConeGeometry(ship.Width / 5, ship.Length / 10, 3, 1);
    const material = new THREE.MeshPhysicalMaterial({
        color: color,
        transparent: true,
        opacity: 0.75,
        depthTest: true,
        depthWrite: true,
        alphaTest: 0,
        reflectivity: 0.2,
        thickness: 6,
        metalness: 0,
        side: THREE.DoubleSide
    });
    const obj3D = new THREE.Mesh(geo, material);
    const arrow = new THREE.ConeGeometry(1, (ship.Length / 10) + 4, 20, 1);
    const matArrow = new THREE.MeshPhysicalMaterial({
        color: "#00ff00",
        transparent: true,
        opacity: 1,
        depthTest: true,
        depthWrite: true,
        alphaTest: 0,
        reflectivity: 0.2,
        thickness: 6,
        metalness: 0,
        side: THREE.DoubleSide
    });
    const arrowObj = new THREE.Mesh(arrow, matArrow);
   // obj3D.rotation.x = Math.PI / 2;
    obj3D.rotation.z = (ship.location.Heading * (2 * Math.PI / 360));
    // arrowObj.rotation.x = Math.PI / 2;
    arrowObj.rotation.z = (ship.location.COG * (2 * Math.PI / 360));
    ship.arrowObj = arrowObj;
    ship.object3D = obj3D;
    return obj3D;
}

const _setShipPosition = (ship) => {
    ship.object3D.position.set(ship.x, ship.y, ship.z);
    ship.object3D.rotation.z = ship.location.Heading * (2 * Math.PI / 360);
    ship.arrowObj.position.set(ship.x, ship.y, ship.z);
    ship.arrowObj.rotation.z = (ship.location.COG * (2 * Math.PI / 360));
}
