import {APackage, AText, AAction, AAttribute, AStateNet} from './index.js';

export default class AModel {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let color = node.color || "orange";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let w = 100;
        let h = 100;
        let d = 20;
        if (node.cube) {
            w = node.cube.w;
            h = node.cube.h;
            d = node.cube.d;
        }
        let opacity = node.opacity || 1;

        let geometry = new THREE.BoxGeometry(w, h, d);
        const material = new THREE.MeshPhongMaterial({color: color, transparent: true, opacity: opacity});
        const retval = new THREE.Mesh(geometry, material);
        // const myText = new SpriteText(node.name.replace(/\s/g, '\n'));
        // myText.position.set(0,40,15);
        // retval.add(myText);
        retval.aid = node.id;
        // Find the Model Element and show it here.
        let objID = "#" + node.name + '3D';
        let aframeobj = document.querySelector(objID);
        if (!aframeobj) {
            aframeobj = document.querySelector('#default3D');
        }
        let obj3D = aframeobj.object3D.clone();
        // Make the obj3D larger based on the size of the width and height.
        obj3D.applyMatrix4(new THREE.Matrix4().makeScale(w / 100, w / 100, w / 100));
        obj3D.position.set(0, 0, (d / 2) + 10);
        retval.add(obj3D);
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
        label.position.set(0, (h/2)-20, (d / 2) + 1);
        retval.add(label)
        if (typeof node.box !== 'string') {
            node.box = node.box || Math.sqrt(d * d + h * h + w * w);
        } else {
            node.box = null;
        }
        node.expandLink = `model/get?id=${node.id}`;
        return retval;
    }

    static viewDeep3D(cls, mode) {
        let data = {nodes: {}, links: []};
        let atnum = Object.keys(cls._attributes).length; // XZ on the tp of the Model
        let acnum = Object.keys(cls.methods).length; //  YZ on right of the Model
        let asnum = Object.keys(cls._associations).length; // YZ on left of the Model
        let snum = 0; // XZ on the bottom of the Model.
        if (cls.statenet) {
            snum = Object.keys(cls.statenet).length;
        }
        let xnum = Math.max(acnum, snum * 3);
        let ynum = Math.max(acnum, asnum * 3);
        let znum = Math.max(acnum, atnum, asnum * 3, snum * 3);

        let xfactor = Math.round(Math.sqrt(xnum) + 0.5);
        let yfactor = Math.round(Math.sqrt(ynum) + 0.5);
        let zfactor = Math.round((znum / xfactor) + 0.5);

        const theta = 3.14 / 2;
        let model3d = {w: xfactor * 100 + 50, h: yfactor * 100 + 25, d: zfactor * 100 + 50};
        let bbox = {
            parent: cls.id,
            x: {min: -model3d.w / 2 + 20, max: model3d.w / 2 - 20},
            y: {min: -model3d.h / 2 + 20, max: model3d.h / 2 - 20},
            z: {min: -model3d.d / 2 + 20, max: model3d.d / 2 - 20},
        }

        data.nodes[cls.id] = {
            id: cls.id,
            name: cls.name,
            cube: model3d,
            opacity: 0.5,
            fx: 0, fy: 0, fz: 0,
            box: "None",
            view: AModel.view3D
        };

        let prevID = cls.id;
        let col = 0;
        let row = 0;
        let arbox = {
            parent: prevID,
            x: {min: bbox.x.min + 70, max: bbox.x.min + 70},
            y: {min: bbox.y.max + 40, max: bbox.y.max + 40},
            z: {min: bbox.z.max - 60, max: bbox.z.max - 60},
        }
        for (let aname in cls._associations) {
            let assoc = cls._associations[aname];
            let clsid = assoc.type;
            if (!data.nodes.hasOwnProperty(clsid)) {
                data.nodes[clsid] = {
                    id: clsid, name: clsid, view: AModel.view3D,
                    rbox: {
                        parent: cls.id,
                        x: {min: bbox.x.min - 200, max: bbox.x.min - 200},
                        y: {min: bbox.y.min - 200, max: bbox.x.max + 200},
                        z: {min: bbox.z.min - 200, max: bbox.z.max + 200}
                    },
                    rotate: {y: -theta}
                };
            }
            // data.links.push({target:clsid, source: cls.id, value: 0.1, name: aname, arrow: 20, relpos: 1, curve: 0.1 });
            data.nodes[`Assoc${clsid}`] = {
                id: `Assoc${clsid}`, name: `${aname} : ${assoc.type}`, view: AAttribute.view3D,
                color: 'magenta',
                rbox: arbox,
                rotate: {x: -theta}
            };
            if (clsid !== cls.id) {
                data.links.push({target: clsid, source: `Assoc${clsid}`, value: 0.0, color: 'magenta'});
            }
            prevID = `Assoc${clsid}`;
            row++;
            if (row < yfactor) {
                arbox = {
                    parent: prevID,
                    x: {min: 0, max: 0}, // Col
                    y: {min: 0, max: 0},
                    z: {min: -80, max: -80}, // Row
                }

            } else {
                row = 0;
                col++;
                arbox = {
                    parent: cls.id,
                    x: {min: bbox.x.min + 70 + (col * 120), max: bbox.x.min + 70 + (col * 120)},
                    y: {min: bbox.y.max + 40, max: bbox.y.max + 40},
                    z: {min: bbox.z.max - 60, max: bbox.z.max - 60},
                }
            }
        }

        for (let aname in cls._attributes) {
            let attr = cls._attributes[aname];
            let clsid = cls.id + aname
            data.nodes[clsid] = {
                id: clsid, name: `${aname} : ${attr.type}`, view: AAttribute.view3D,
                rbox: arbox,
                rotate: {x: -theta}
            };
            prevID = clsid;
            row++;
            if (row < yfactor) {
                arbox = {
                    parent: prevID,
                    x: {min: 0, max: 0}, // Col
                    y: {min: 0, max: 0},
                    z: {min: -80, max: -80}, // Row
                }

            } else {
                row = 0;
                col++;
                arbox = {
                    parent: cls.id,
                    x: {min: bbox.x.min + 70 + (col * 120), max: bbox.x.min + 70 + (col * 120)},
                    y: {min: bbox.y.max + 40, max: bbox.y.max + 40},
                    z: {min: bbox.z.max - 60, max: bbox.z.max - 60},
                }
            }
        }

        prevID = cls.id;
        col = 0;
        row = 0;
        arbox = {
            parent: prevID,
            x: {min: bbox.x.max + 40, max: bbox.x.max + 40},
            y: {min: bbox.y.max - 40, max: bbox.y.max - 40},
            z: {min: bbox.z.max - 60, max: bbox.z.max - 60},
        }
        for (let mname in cls.methods) {
            data.nodes[`${cls.id}-${mname}`] = {
                id: `${cls.id}-${mname}`, name: mname, view: AAction.view3D,
                rbox: arbox,
                rotate: {x: -theta, z: -theta, y: theta}
            };
            prevID = `${cls.id}-${mname}`;
            row++;
            if (row < yfactor) {
                arbox = {
                    parent: prevID,
                    x: {min: 0, max: 0}, // Col
                    y: {min: -100, max: -100}, // Row
                    z: {min: 0, max: 0},
                }
            } else {
                row = 0;
                col++;
                arbox = {
                    parent: cls.id,
                    x: {min: bbox.x.max + 40, max: bbox.x.max + 40},
                    y: {min: bbox.y.max - 40, max: bbox.y.max - 40},
                    z: {min: bbox.z.max - 60 - (col * 150), max: bbox.z.max - 60 - (col * 150)},
                }
            }
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        // State Net it if exists.
        if (cls.statenet) {
            let mode = {
                id: cls.id,
                ibox: {parent: cls.id, y: {min: bbox.y.min - 40, max: bbox.y.min - 40}},
                /*ibox: {
                    parent: cls.id,
                    x: {min: bbox.x.min + 40, max: bbox.x.min + 40},
                    y: {min: bbox.y.min - 40, max: bbox.min - 40},
                    z: {min: bbox.z.max - 40, max: bbox.max - 40}
                },
                */
                rbox: {parent: cls.id, y: {min: bbox.y.min - 40, max: bbox.y.min - 40}},
                rotate: {x: theta},
                mode: 'add'
            };
            AStateNet.viewDeep3D(cls.statenet, mode);
        }
        window.graph.graph.cameraPosition(
            {x: 0, y: 0, z: 1000}, // new position
            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
            3000  // ms transition duration.
        );
        window.graph.showLinks();
    }

    handle(result) {
        AModel.viewDeep3D(result, 'new');
        let records = [];
        if (!w2ui['objlist']) {
            $('#objlist').w2grid({name: 'objlist'});
        }
        if (!w2ui['objdetail']) {
            $('#objdetail').w2grid({
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
        w2ui['objlist'].onClick = function (event) {
            w2ui['objdetail'].clear();
            let record = this.get(event.recid);
            let drecords = [];
            let k = 0;
            for (let name in record) {
                if (name.includes('detail')) {
                    k++;
                    let aname = name.replace('detail', '');
                    drecords.push({recid: k, name: aname, value: record[name]});
                }
            }
            w2ui['objdetail'].add(drecords);
            window.graph.selectNodeByID(event.recid);
        };
        let i = 0;
        for (let aname in result._attributes) {
            let attr = result._attributes[aname];
            records.push({recid: i++, name: aname, value: attr.type, descriptiondetail: attr.description});
        }
        for (let aname in result._associations) {
            let assoc = result._associations[aname];
            let record = {recid: i++, name: aname, value: assoc.type};
            for (let dname in assoc) {
                record[`${dname}detail`] = assoc[dname];
            }
            records.push(record);
        }
        w2ui['objlist'].records = records;
        w2ui['objlist'].refresh();
    }
}
