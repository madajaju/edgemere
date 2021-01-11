import {AUsecase} from './index.js';

export default class APackage {
    constructor(config) {
        this.config = config;
    }
    handle(result) {
        showGraph(result, 'new');

        let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, caption: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, caption: "Value", sortable: true},
        ];
        w2ui['objlist'].columns = cols;
        let i = 0;
        records.push({recid: i++, name:'name', value:result.name, detail: result.name});
        records.push({recid: i++, name:'Abbv Name', value:result.shortname, detail: result.shortname});
        records.push({recid: i++, name:'Description', value:result.description, detail: result.description});
        records.push({recid: i++, name:'Color', value:result.color, detail: result.color});
        records.push({recid: i++, name:'Prefix', value:result.prefix, detail: result.prefix});
        let classdetails = getDetails(result.classes);
        records.push({recid: i++, name:'Classes', value:classdetails.length, detail: classdetails.join('|')});
        let spkgs = getDetails(result.subpackages);
        records.push({recid: i++, name:'Sub Packages', value:spkgs.length, detail: spkgs.join('|')});
        let interfaces = getDetails(result.interface);
        records.push({recid: i++, name:'Interfaces', value:interfaces.length, detail: interfaces.join('|')});
        let handlers = getDetails(result.handlers);
        records.push({recid: i++, name:'Handlers', value:handlers.length, detail: handlers.join('|')});
        let usecases = getDetails(result.usecases);
        records.push({recid: i++, name:'Use Cases', value:usecases.length, detail: usecases.join('|')});

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
    static view3D(node, type) {
        let color = node.color || "lightgray";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let geometry = new THREE.BoxGeometry( 75, 20, 50 );
        const material = new THREE.MeshLambertMaterial( {color: color, opacity:1} );
        const box = new THREE.Mesh( geometry, material );
        const myText = new SpriteText(node.name.replace(/\s/g, '\n'));
        myText.position.set(0,-15,0);
        box.add(myText);
        box.position.set(node.x, node.y, node.z);
        if(node.rotate) {
            if(node.rotate.x) {
                box.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if(node.rotate.y) {
                box.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if(node.rotate.z) {
                box.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        box.aid = node.id;
        box.expandLink = `package/get?id=${node.id}`;
        return box;

    }

    static viewDeep3D(pkg, mode) {
        let data = {nodes: {}, links: []};
        // The top of the package will have the interface.
        // Take the square root of the number of interfaces. Round up. That will give
        // the number squares to be used. From edge to first interface is 25 and each item is
        // 50 appart.
        // if 4 then sqrt is 2.
        // interface and package together determine the size of the top and bottom.
        // x and z are determined from interface and package xfactor and zfactor
        // Next find the yfactor as the max of the usecases, classes and handlers max.
        // The number of handlers

        let inum = Object.keys(pkg.interface).length;
        let hnum = Object.keys(pkg.handlers).length;
        let unum = Object.keys(pkg.usecases).length;
        let cnum = Object.keys(pkg.classes).length;
        let pnum = Object.keys(pkg.subpackages).length;

        let xfactor = Math.round(Math.sqrt(inum) + 0.5);
        let zfactor = Math.round((inum / xfactor) + 0.5);
        if(pnum > inum) {
            xfactor = Math.round(Math.sqrt(pnum) + 0.5);
            zfactor = Math.round((pnum / xfactor) + 0.5);
        }
        let yfactoru = Math.round(  (unum / xfactor) + 0.5);
        let yfactorc = Math.round(  (cnum / xfactor) + 0.5);
        let yfactorh = Math.round(  (hnum / zfactor) + 0.5);
        let yfactor = Math.max(yfactoru, yfactorc, yfactorh);

        window.graph.clearObjects();

        let package3d = { w: xfactor*150 + 50, h: yfactor*150 + 50, d: zfactor*150 + 50};


        let geometry = new THREE.BoxGeometry( package3d.w, package3d.h, package3d.d );
        const material = new THREE.MeshLambertMaterial( {color: pkg.color, transparent: true, opacity:0.5} );
        const pkgview = new THREE.Mesh( geometry, material );
        pkgview.aid = pkg.shortname;

        window.graph.addObject(pkgview);

        let i = 0;
        for(let iname in pkg.interface) {
            let y = 60 + ((yfactor * 150) / 2)
            let name = iname.replace(pkg.prefix, '');
            let node = { id: iname, name: name, fy: y, view: interface3DView};
            data.nodes[iname] = node;
        }
        for(let hname in pkg.handlers) {
            let handler = pkg.handlers[hname];
            let x =  (xfactor * 150) / 2 + 50;

            let node = { id: hname, name: handler.name, fx: x, view: handler3DView };
            data.nodes[hname] = node;
            // let obj3d = handler3DView(node, "");
            // window.graph.addObject(obj3d);
            for(let h in handler.handlers) {
                let hand = handler.handlers[h];
                if(hand.action) {
                    let aname = hand.action.replace('/' + pkg.shortname, pkg.prefix);
                    // window.graph.addLink({source:hname, target: aname, color: 'magenta'});
                    data.links.push( {source:hname, target: aname, color: 'magenta'});
                }
            }
        }

        for(let uname in pkg.usecases) {
            let uc = pkg.usecases[uname];
            let z =  (zfactor * 150) / 2 + 30;

            let node = { id: uname, name: uc.name, fz: z, view: AUsecase.view3D }
            data.nodes[uname] = node;
            if(uc.method) {
                data.links.push({source:uname, target: pkg.prefix + '/' + uc.method, color: 0xffff00});
            }
        }

        for(let cname in pkg.classes) {
            let cls = pkg.classes[cname];
            let z = - (zfactor * 150) / 2 - 40;

            let node = { id: cname, name: cls.name, fz: z, view: class3DView }
            data.nodes[cname] = node;
        }

        for(let pname in pkg.subpackages) {
            let spkg = pkg.subpackages[pname];
            let y = - ((yfactor * 150) / 2) - 40;
            let node = { id: pname, name: spkg.name, fy: y, color: pkg.color, view: APackage.view3D }
            data.nodes[pname] = node;
        }
        i = 0;

        const theta = 3.14/2;
        for(let pname in pkg.depends) {
            let spkg = pkg.depends[pname];
            let x = -(xfactor * 150);
            let node = {
                id: pname,
                name: spkg.name,
                fx: x,
                color: spkg.color,
                rotate: { z: -theta },
                view: APackage.view3D
            }
            data.nodes[pname] = node;
            data.links.push({source: pkg.shortname, target: pname});
        }
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.showLinks();
    }
}
function showGraph(pkg, mode) {
    APackage.viewDeep3D(pkg, mode);
}
function handler3DView(node, type) {
    let color = "magenta";
    if(type === 'Selected') {
        color = "yellow";
    } else if( type === 'Targeted') {
        color = "red";
    } else if( type === 'Sourced') {
        color = "green";
    }
    const theta = 3.14/2;
    let geometry = new THREE.ConeGeometry( 20, 40 );
    geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( theta) );
    const material = new THREE.MeshLambertMaterial( {color: color, opacity:1} );
    const box = new THREE.Mesh( geometry, material );
    let geo2 = new THREE.CylinderGeometry( 5, 5, 30 );
    geo2.applyMatrix4( new THREE.Matrix4().makeRotationX( theta) );
    const material2 = new THREE.MeshLambertMaterial( {color: color, opacity:1} );
    const item2 = new THREE.Mesh( geo2, material2 );
    item2.position.set(0,0,20);
    const group = new THREE.Group();
    group.add( box );
    group.add( item2 );
    group.applyMatrix4(new THREE.Matrix4().makeRotationY(-theta));
    group.position.set(node.x, node.y, node.z);
    const myText = new SpriteText(node.name);
    myText.position.set(0,0,-40);
    group.add(myText);
    group.aid = node.id;
    return group;
}
function class3DView(node, type) {
    let color = "orange";
    if(type === 'Selected') {
        color = "yellow";
    } else if( type === 'Targeted') {
        color = "red";
    } else if( type === 'Sourced') {
        color = "green";
    }
    let geometry = new THREE.BoxGeometry( 50, 50, 20 );
    const material = new THREE.MeshLambertMaterial( {color: color, opacity:1} );
    const box = new THREE.Mesh( geometry, material );
    /* let geo2 = new THREE.TextGeometry( node.name );
    const material2 = new THREE.MeshLambertMaterial( {color: "black", opacity:1} );
    const text = new THREE.Mesh( geometry, material2 );
    text.position.set(0,0,10);
    const group = new THREE.Group();
    group.add( box );
    group.add( text );
     */
    const myText = new SpriteText(node.name);
    myText.position.set(0,0,-15);
    box.add(myText);
    box.position.set(node.x, node.y, node.z);
    box.aid = node.id;
    return box;
}
function package3DView(node, type) {
    let color = node.color;
    if(type === 'Selected') {
        color = "yellow";
    } else if( type === 'Targeted') {
        color = "red";
    } else if( type === 'Sourced') {
        color = "green";
    }
    let geometry = new THREE.BoxGeometry( 75, 20, 50 );
    const material = new THREE.MeshLambertMaterial( {color: color, opacity:1} );
    const box = new THREE.Mesh( geometry, material );
    /* let geo2 = new THREE.TextGeometry( node.name );
    const material2 = new THREE.MeshLambertMaterial( {color: "black", opacity:1} );
    const text = new THREE.Mesh( geometry, material2 );
    text.position.set(0,0,10);
    const group = new THREE.Group();
    group.add( box );
    group.add( text );
     */
    const myText = new SpriteText(node.name.replace(/\s/g, '\n'));
    myText.position.set(0,-15,0);
    box.add(myText);
    box.position.set(node.x, node.y, node.z);
    box.aid = node.id;
    return box;
}
function depend3DView(node, type) {
    let color = node.color;
    if(type === 'Selected') {
        color = "yellow";
    } else if( type === 'Targeted') {
        color = "red";
    } else if( type === 'Sourced') {
        color = "green";
    }
    let geometry = new THREE.BoxGeometry( 20, 75, 50 );
    const material = new THREE.MeshLambertMaterial( {color: color, opacity:1} );
    const box = new THREE.Mesh( geometry, material );
    const myText = new SpriteText(node.name.replace(/\s/g, '\n'));
    myText.position.set(-20,0,0);
    box.add(myText);
    box.position.set(node.x, node.y, node.z);
    box.aid = node.id;
    return box;
}

function usecase3DView(node, type) {
    let color = "yellow";
    if(type === 'Selected') {
        color = "yellow";
    } else if( type === 'Targeted') {
        color = "red";
    } else if( type === 'Sourced') {
        color = "green";
    }
    let geometry = new THREE.SphereGeometry( 10, 16, 12 );
    geometry.applyMatrix4( new THREE.Matrix4().makeScale( 4.0, 2.0, 1.0 ) );
    const material = new THREE.MeshLambertMaterial( {color: color, opacity:1} );
    const retval = new THREE.Mesh( geometry, material );
    retval.position.set(node.x, node.y, node.z);
    const myText = new SpriteText(node.name.replace(/\s/g, '\n'));
    myText.position.set(0,0,15);
    retval.add(myText);
    retval.aid = node.id;
    return retval;
}
function interface3DView(node, type) {
    let color = "green";
    if(type === 'Selected') {
        color = "yellow";
    } else if( type === 'Targeted') {
        color = "red";
    } else if( type === 'Sourced') {
        color = "green";
    }
    let geo = new THREE.SphereGeometry( 20, 16, 12 );
    const material = new THREE.MeshLambertMaterial( {color: color, opacity:1} );
    const item1 = new THREE.Mesh( geo, material );
    let geo2 = new THREE.CylinderGeometry( 5, 5, 30 );
    const material2 = new THREE.MeshLambertMaterial( {color: color, opacity:1} );
    const item2 = new THREE.Mesh( geo2, material2 );
    item2.position.set(0,-30,0);
    const group = new THREE.Group();
    group.add( item1 );
    group.add( item2 );
    group.position.set(node.x, node.y, node.z);
    const myText = new SpriteText(node.name.replace(/\//g, '\n'));
    myText.position.set(0,25,0);
    group.add(myText);
    group.aid = node.id;
    return group;
}
function getDetails(objs) {
    let items = [];
    let inum = 0;
    for(let j in objs) {
        let item = objs[j];
        inum++;
        let name = item.name || j;
        items.push(`<span onclick="expandObject('${item.link}');">${name}</span>`);
    }
    return items;
}
