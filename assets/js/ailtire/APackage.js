import {AUsecase, AModel, AText} from './index.js';

export default class APackage {
    constructor(config) {
        this.config = config;
    }
    static showList(panel, parent) {
        $.ajax({
            url: 'package/list',
            success: function (results) {
                console.log(results);
                let packageList = getPackageNodes(results);
                w2ui[panel].add(parent, packageList);
            }
        });
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
        let nameArray = node.name.split(/\s/);
        let width = 0;
        for(let i in nameArray) {
            width = Math.max(width, nameArray[i].length);
        }
        let textSize = node.textSize || 30;
        let shape = node.cube || {x: width*(textSize*0.6), y: textSize*nameArray.length, z: 20};
        let opacity = node.opacity || 1;
        let geometry = new THREE.BoxGeometry(shape.x, shape.y, shape.z);
        const material = new THREE.MeshPhongMaterial({color: color, opacity: opacity, transparent:true});
        const box = new THREE.Mesh(geometry, material);

        let label = AText.view3D({text:node.name.replace(/\s/g, '\n'), color:"#ffffff", width: shape.x , size: textSize });
        label.position.set(0,0,shape.z/2 + 4);
        box.add(label);
        box.position.set(node.x, node.y, node.z);
        if (node.rotate) {
            if (node.rotate.x) {
                box.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if (node.rotate.y) {
                box.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if (node.rotate.z) {
                box.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        box.aid = node.id;
        box.expandLink = `package/get?id=${node.id}`;
        box.expandView= APackage.viewDeep3D;
        node.box = 150;
        return box;

    }

    static viewSubPackage3D(pkg, mode) {
        let data = { nodes:{}, links: [] };
        for(let pname in pkg.subpackages) {
            let spkg = pkg.subpackages[pname];
            let node = {
                id: pname,
                name: spkg.name,
                // cube: { x: 300, y: 50, z: 10 },
                textSize: 10,
                color: spkg.color,
                view: APackage.view3D,
                expandView: APackage.viewDeep3D,
                expandLink: `package/get?id=${pname}`
            }
            data.nodes[pname] = node;
            for(let i in spkg.depends) {
                data.links.push({source: pname, target: spkg.depends[i], color: 'rgba(255,255,0,1)', value: 1.0, width: 3});
            }
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.graph.cameraPosition(
            {x: 0, y: 0, z: 1000}, // new position
            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
            3000  // ms transition duration.
        );
        window.graph.showLinks();
    }

    static viewDeep3D(pkg, mode) {
        const theta = 3.14 / 2; // 90 degrees
        let data = {nodes: {}, links: []};
        let inum = Object.keys(pkg.interface).length;
        let hnum = Object.keys(pkg.handlers).length;
        let unum = Object.keys(pkg.usecases).length;
        let cnum = Object.keys(pkg.classes).length;
        let pnum = Object.keys(pkg.subpackages).length;

        let xfactor = Math.round(Math.sqrt(inum) + 0.5);
        let zfactor = Math.round((inum / xfactor) + 0.5);
        if (pnum > inum) {
            xfactor = Math.round(Math.sqrt(pnum) + 0.5);
            zfactor = Math.round((pnum / xfactor) + 0.5);
        }
        if(cnum > pnum) {
            xfactor = Math.round(Math.sqrt(cnum) + 0.5);
            zfactor = Math.round((cnum / xfactor) + 0.5);
        }
        let yfactoru = Math.round((unum / xfactor) + 0.5);
        let yfactorc = Math.round((cnum / xfactor) + 0.5);
        let yfactorh = Math.round((hnum / zfactor) + 0.5);
        let yfactor = Math.max(yfactoru, yfactorc, yfactorh);

        window.graph.clearObjects();

        let package3d = {x: xfactor * 150 + 50, y: yfactor * 150 + 50, z: zfactor * 150 + 50};
        let bbox = {
            parent: pkg.shortname,
            x: {min: (-package3d.x / 2) + 30, max: (package3d.x / 2) - 30},
            y: {min: (-package3d.y / 2) + 30, max: (package3d.y / 2) - 30},
            z: {min: (-package3d.z / 2) + 30, max: (package3d.z / 2) - 30}
        }
        // package3d.x = package3d.x / 2;
        // package3d.y = package3d.y / 2;
        // package3d.z = package3d.z / 2;

        data.nodes[pkg.shortname] = {
            id: pkg.shortname,
            name: pkg.name,
            cube: package3d,
            textSize: 30,
            fx: 0,
            fy: 0,
            fz: 0,
            view: APackage.view3D,
            expandView: APackage.viewDeep3D,
            expandLink: `package/get?id=${pkg.shortname}`,
            opacity: 0.5,
            color: pkg.color
        };

        for (let iname in pkg.interface) {
            let name = iname.replace(pkg.prefix, '');
            let node = {
                id: iname,
                name: name,
                rbox: { parent: pkg.shortname,
                    x: bbox.x,
                    z: bbox.z,
                    y: {min: bbox.y.max + 50, max: bbox.y.max + 50}
                },
                view: interface3DView
            };
            data.nodes[iname] = node;
        }
        for (let hname in pkg.handlers) {
            let handler = pkg.handlers[hname];
            let node = {
                id: hname,
                name: handler.name,
                rbox: { parent: pkg.shortname, y: bbox.y, z: bbox.z,
                    x: {min: bbox.x.max + 50, max: bbox.x.max + 50}
                },
                view: handler3DView
            };

            data.nodes[hname] = node;
            // let obj3d = handler3DView(node, "");
            // window.graph.addObject(obj3d);
            for (let h in handler.handlers) {
                let hand = handler.handlers[h];
                if (hand.action) {
                    let aname = hand.action.replace('/' + pkg.shortname, pkg.prefix);
                    // window.graph.addLink({source:hname, target: aname, color: 'magenta'});
                    data.links.push({source: hname, target: aname, color: 'rgba(255,255,0,1)', value: 0.1, width: 5});
                }
            }
        }

        for (let uname in pkg.usecases) {
            let uc = pkg.usecases[uname];

            let node = {
                id: uname, name: uc.name,
                rbox: { parent: pkg.shortname, x: bbox.x, y: bbox.y,
                    z: {min: bbox.z.max + 50, max: bbox.z.max + 50}
                },
                view: AUsecase.view3D,
                expandView: AUsecase.viewDeep3D,
                expandLink: `usecase/get?id=${uname}`,
            }
            data.nodes[uname] = node;
            if (uc.method) {
                data.links.push({
                    source: uname,
                    target: pkg.prefix + '/' + uc.method,
                    color: 'rgba(255,255,0,1)',
                    value: 0.1,
                    width: 5
                });
            }
        }

        for (let cname in pkg.classes) {
            let cls = pkg.classes[cname];
            let node = {id: cname, name: cls.name,
                rbox: { parent: pkg.shortname, x: bbox.x, y: bbox.y,
                    z: {min: bbox.z.min - 50, max: bbox.z.min - 50}
                },
                rotate: {y: 2*theta},
                view: AModel.view3D,
                expandView: AModel.viewDeep3D,
                expandLink: `model/get?id=${cname}`,
            }
            data.nodes[cname] = node;
        }

        for (let pname in pkg.subpackages) {
            let spkg = pkg.subpackages[pname];
            let node = {
                id: pname,
                name: spkg.name,
                rotate: {x: theta},
                textSize: 15,
                rbox: { parent: pkg.shortname, x: bbox.x, z: bbox.z,
                    y: {min: bbox.y.min - 50, max: bbox.y.min - 50}},
                color: spkg.color,
                view: APackage.view3D,
                expandView: APackage.viewDeep3D,
                expandLink: `package/get?id=${pname}`,
            }
            data.nodes[pname] = node;

            for(let i in spkg.depends) {
                data.links.push({source: pname, target: spkg.depends[i], color: 'rgba(255,255,0,1)', value: 1.0, width: 3});
            }
        }

        for (let pname in pkg.depends) {
            let spkg = pkg.depends[pname];
            let node = {
                id: pname,
                name: spkg.name,
                rbox: { parent: pkg.shortname, y: bbox.y, z: bbox.z,
                    x: {min: bbox.x.min - 80, max: bbox.x.min - 80}
                },
                textSize: 30,
                color: spkg.color,
                rotate: {y: -theta},
                view: APackage.view3D,
                expandView: APackage.viewDeep3D,
                expandLink: `package/get?id=${pname}`
            }
            data.nodes[pname] = node;
            data.links.push({source: pkg.shortname, target: pname, value: 0.1, color: 'rgba(255,255,255,1)', width: 5});
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.graph.cameraPosition(
            {x: 0, y: 0, z: 1000}, // new position
            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
            3000  // ms transition duration.
        );
        window.graph.showLinks();

        window.graph.toolbar.setToolBar( [
            { type: 'button',  id: 'classes',  text: 'Classes', img: 'w2ui-icon-search',
                onClick: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: -0, z: -1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},500);
                }
            },
            { type: 'button',  id: 'subpackage',  text: 'Sub Packages', img: 'w2ui-icon-search',
                onClick: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: -1000, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},500);
                }
            },
            { type: 'button',  id: 'interface',  text: 'Interface', img: 'w2ui-icon-search',
                onClick: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 1000, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},500);
                }
            },
            { type: 'button',  id: 'handlers',  text: 'Handlers', img: 'w2ui-icon-search',
                onClick: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 1000, y: 0, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},500);
                }
            },
            { type: 'button',  id: 'usecases',  text: 'UseCases', img: 'w2ui-icon-search',
                onClick: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: 0, y: 0, z: 1000}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},500);
                }
            },
            { type: 'button',  id: 'dependents',  text: 'Dependents', img: 'w2ui-icon-search',
                onClick: (event) => {
                    window.graph.graph.cameraPosition(
                        {x: -1000, y: 0, z: 0}, // new position
                        {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
                        1000
                    );
                    setTimeout(() => { window.graph.graph.zoomToFit(1000)},500);
                }
            },
        ]);
    }

    handle(result) {
        showGraph(result, 'new');

        let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, label: "Value", sortable: true},
        ];
        w2ui['objlist'].columns = cols;
        let i = 0;
        records.push({recid: i++, name: 'name', value: result.name, detail: result.name});
        records.push({recid: i++, name: 'Abbv Name', value: result.shortname, detail: result.shortname});
        records.push({recid: i++, name: 'Description', value: result.description, detail: result.description});
        records.push({recid: i++, name: 'Color', value: result.color, detail: result.color});
        records.push({recid: i++, name: 'Prefix', value: result.prefix, detail: result.prefix});
        let classdetails = getDetails(result.classes);
        records.push({recid: i++, name: 'Classes', value: classdetails.length, detail: classdetails.join('|')});
        let spkgs = getDetails(result.subpackages);
        records.push({recid: i++, name: 'Sub Packages', value: spkgs.length, detail: spkgs.join('|')});
        let interfaces = getDetails(result.interface);
        records.push({recid: i++, name: 'Interfaces', value: interfaces.length, detail: interfaces.join('|')});
        let handlers = getDetails(result.handlers);
        records.push({recid: i++, name: 'Handlers', value: handlers.length, detail: handlers.join('|')});
        let usecases = getDetails(result.usecases);
        records.push({recid: i++, name: 'Use Cases', value: usecases.length, detail: usecases.join('|')});

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

function showGraph(pkg, mode) {
    APackage.viewDeep3D(pkg, mode);
}

function handler3DView(node, type) {
    let opacity = node.opacity || 1.0;
    let color = "magenta";
    if (type === 'Selected') {
        color = "yellow";
    } else if (type === 'Targeted') {
        color = "red";
    } else if (type === 'Sourced') {
        color = "green";
    }
    const theta = 3.14 / 2;
    let geometry = new THREE.ConeGeometry(20, 40);
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(theta));
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
    const box = new THREE.Mesh(geometry, material);
    let geo2 = new THREE.CylinderGeometry(5, 5, 30);
    geo2.applyMatrix4(new THREE.Matrix4().makeRotationX(theta));
    const material2 = new THREE.MeshPhongMaterial({color: color, opacity: 1});
    const item2 = new THREE.Mesh(geo2, material2);
    item2.position.set(0, 0, 20);
    const group = new THREE.Group();
    group.add(box);
    group.add(item2);
    group.applyMatrix4(new THREE.Matrix4().makeRotationY(-theta));
    group.position.set(node.x, node.y, node.z);

    let label = AText.view3D({text:node.name.replace(/\./g, '\n'), color:"#ffffff", width: 200, size: 12});
    label.position.set(0,0, 23);
    label.applyMatrix4(new THREE.Matrix4().makeRotationY(-2*theta));
    group.add(label);

    group.aid = node.id;
    return group;
}

function package3DView(node, type) {
    let color = node.color;
    if (type === 'Selected') {
        color = "yellow";
    } else if (type === 'Targeted') {
        color = "red";
    } else if (type === 'Sourced') {
        color = "green";
    }
    let geometry = new THREE.BoxGeometry(75, 20, 50);
    const material = new THREE.MeshPhongMaterial({color: color, opacity: 1});
    const box = new THREE.Mesh(geometry, material);
    /* let geo2 = new THREE.TextGeometry( node.name );
    const material2 = new THREE.MeshLambertMaterial( {color: "black", opacity:1} );
    const text = new THREE.Mesh( geometry, material2 );
    text.position.set(0,0,10);
    const group = new THREE.Group();
    group.add( box );
    group.add( text );
     */

    let label = AText.view3D({text: node.name, color: "#ffffff", width: 75, size: 15 * (75 / 100)});
    // label.applyMatrix4(new THREE.Matrix4().makeScale(w/100, w/100, w/100));
    label.position.set(0, (h / 2) - 15, (d / 2) + 1);
    box.add(label)
    box.position.set(node.x, node.y, node.z);
    box.aid = node.id;
    return box;
}

function depend3DView(node, type) {
    let color = node.color;
    if (type === 'Selected') {
        color = "yellow";
    } else if (type === 'Targeted') {
        color = "red";
    } else if (type === 'Sourced') {
        color = "green";
    }
    let geometry = new THREE.BoxGeometry(20, 75, 50);
    const material = new THREE.MeshPhongMaterial({color: color, opacity: 1});
    const box = new THREE.Mesh(geometry, material);
    const myText = new SpriteText(node.name.replace(/\s/g, '\n'));
    myText.position.set(-20, 0, 0);
    box.add(myText);
    box.position.set(node.x, node.y, node.z);
    box.aid = node.id;
    return box;
}

function usecase3DView(node, type) {
    let color = "yellow";
    if (type === 'Selected') {
        color = "yellow";
    } else if (type === 'Targeted') {
        color = "red";
    } else if (type === 'Sourced') {
        color = "green";
    }
    let geometry = new THREE.SphereGeometry(10, 16, 12);
    geometry.applyMatrix4(new THREE.Matrix4().makeScale(4.0, 2.0, 1.0));
    const material = new THREE.MeshPhongMaterial({color: color, opacity: 1});
    const retval = new THREE.Mesh(geometry, material);
    retval.position.set(node.x, node.y, node.z);
    const myText = new SpriteText(node.name.replace(/\s/g, '\n'));
    myText.position.set(0, 0, 15);
    retval.add(myText);
    retval.aid = node.id;
    return retval;
}

function interface3DView(node, type) {
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
    let label = AText.view3D({text:name.replace(/\//g, '\n'), color:"#ffffff", width: 50, size: 12});
    label.applyMatrix4(new THREE.Matrix4().makeRotationX(-3.14/2));
    label.position.set(0,20+1,0);
    group.add(label)
    group.aid = node.id;
    return group;
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

function getPackageNodes(pkg) {
    let sitems = [];
    for (let pname in pkg.subpackages) {
        let spkg = pkg.subpackages[pname];
        let spkgi = {
            id: spkg.shortname,
            text: spkg.name,
            img: 'icon-folder',
            link: `package/get?id=${pname}`,
            view: 'package'
        };
        if (spkg.subpackages) {
            let spkgs = getPackageNodes(spkg);
            spkgi.nodes = spkgs;
            spkgi.count = spkgs.length;
        }
        sitems.push(spkgi);
    }
    for (let cname in pkg.classes) {
        let cls = pkg.classes[cname];
        let citem = {
            id: cls.name,
            text: cls.name,
            img: 'icon-page',
            link: `model/get?id=${cname}`,
            view: 'model'
        };
        sitems.push(citem);
    }
    return sitems;
}
