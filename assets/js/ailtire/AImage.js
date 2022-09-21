import {AText,AService,A3DGraph, ASelectedHUD} from './index.js';

export default class AImage {
    constructor(config) {
        this.config = config;
    }
    static default = {
        fontSize: 20,
        height: 40,
        width: 40,
        depth: 5
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {return item.length;});
        let maxLetters = nameArray.reduce(function(a, b) { return Math.max(a, b); }, -Infinity);
        let height = nameArray.length*AImage.default.fontSize*1.2+ AImage.default.height;
        let width = maxLetters * (AImage.default.fontSize/1.2);
        let depth = AImage.default.depth;
        let radius = Math.max(Math.sqrt(width*width + height*height), Math.sqrt(height*height + depth*depth), Math.sqrt(width*width + depth*depth))/2;
        return {w: width, h: height, d: AImage.default.depth,r:radius};
    }
    static showList(panel, parent) {
        $.ajax({
            url: 'implementation/image',
            success: function (results) {
                // Set up the links to parent child tree
                for(let name in results) {
                    let image = results[name];
                    let item = {
                        id: name + '-image',
                        text: name,
                        tag: image.name,
                        img: 'icon-page',
                        nodes: [],
                        link: `implementation/image?name=${name}`,
                        view: 'image'
                    };
                    w2ui[panel].add(parent, item);
                    if(image.base) {
                        image.base = results[image.base];
                    }
                }
            }
        });
    }
    static view3D(node, type) {
        let color = node.color || "#8866aa";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const theta = Math.PI / 2;
        const opacity = node.opacity || 1;

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
        let size = AImage.calculateBox(node);
        const stack = new THREE.BoxGeometry(size.w, size.h, size.d)
        let obj = new THREE.Mesh(stack, material);
        obj.position.set(0, 0, 0);

        let label = AText.view3D({text: node.name, color: "#ffffff", width: size.width, size: AImage.default.fontSize});
        label.position.set(0, 0, size.d+1);
        obj.add(label);

        obj.position.set(node.x, node.y, node.z);
        if (node.rotate) {
            if (node.rotate.x) {
                obj.applyMatrix4(new THREE.Matrix4().makeRotationX(node.rotate.x));
            }
            if (node.rotate.y) {
                obj.applyMatrix4(new THREE.Matrix4().makeRotationY(node.rotate.y));
            }
            if (node.rotate.z) {
                obj.applyMatrix4(new THREE.Matrix4().makeRotationZ(node.rotate.z));
            }
        }
        obj.aid = node.id;
        node.box = size.r;
        node.expandLink = node.expandLink || `implementation/image?name=${node.id}`;
        node.expandView = node.expandView || AImage.handle;
        node.getDetail = AImage.getDetail;

        return obj;
    }
    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AImage.showDetail(results);
            }
        });
    }
    static showDetail(result) {
        let records = [];
        if (!w2ui['objlist']) {
            $('#objlist').w2grid({name: 'objlist'});
        }
        w2ui['objlist'].result = result;
        if (!w2ui['objdetail']) {
            $('#objdetail').w2grid({
                name: 'objdetail',
                header: 'Details',
                show: {header: true, columnHeaders: false},
                columns: [
                    {
                        field: 'name',
                        label: 'Name',
                        size: '100px',
                        style: 'background-color: #efefef; border-bottom: 1px solid white; padding-right: 5px;',
                        attr: "align=right"
                    },
                    {
                        field: 'value', label: 'Value', size: '100%', render: function (record) {
                            return '<div>' + record.value + '</div>';
                        }
                    }
                ]
            });
        }
        w2ui['objlist'].onClick = function (event) {
            let record = this.get(event.recid);
            w2ui['objdetail'].header = `${record.name} Details`;
            w2ui['objdetail'].show.columnHeaders = true;
            w2ui['objdetail'].clear();
            let drecords = [];
            let k = 0;
            let values = record.detail.split('|');
            for (let i in values) {
                let [name, value] = values[i].split('^');
                if (!value) {
                    value = name;
                    name = record.name;
                }
                k++;
                drecords.push({recid: k, name: name, value: value});
            }
            w2ui['objdetail'].add(drecords);
            window.graph.selectNodeByID(event.recid);
        }
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, label: "Value", sortable: true},
        ];
        w2ui['objlist'].columns = cols;
        let i = 0;
        records.push({recid: i++, name: 'Name', value: result.name, detail: result.name});
        records.push({recid: i++, name: 'Package', value: result.pkg, detail: result.pkg});
        if(result.image && result.image.cmd) {
            records.push({recid: i++, name: 'Command', value: result.image.cmd, detail: result.image.cmd});
        }
        let idetails = getDetails(result.services);
        if (result.services) {
            records.push({
                recid: i++,
                name: 'services',
                value: Object.keys(result.services).length,
                detail: idetails.join('|')
            });
        }
        w2ui['objlist'].records = records;
        ASelectedHUD.update('Image', records);
        w2ui['objlist'].refresh();
    }
    static viewDeep3D(obj, mode) {
        let data = {nodes: {}, links: []};
        window.graph.clearObjects();
        let node = {
            id: obj.name + '-image',
            name: obj.name.replace(/\s/g, '\n'),
            view: AImage.view3D,
            expandView: AImage.handle,
            expandLink: `implementation/image?name=${obj.name}`,
        };

        data.nodes[node.id] = node;
        AImage._iterateViewDeep3D(obj, node, data.nodes, data.links);
        for(let name in obj.children) {
            let nobj = obj.children[name];
            let cnode = {
                id: name + '-image',
                name: name.replace(/\s/g, '\n'),
                view: AImage.view3D,
                expandView: AImage.handle,
                expandLink: `implementation/image?name=${name}`,
            };
            data.nodes[cnode.id] = cnode;
            data.links.push({source: node.id, target: cnode.id, width: 1.0, value: 10 });
        }
        for(let name in obj.services) {
            let nobj = obj.services[name];
            let cnode = {
                id: name + '-service',
                name: name.replace(/\s/g, '\n'),
                view: AService.view3D,
                expandLink: `deployment/get?id=${name}`,
            };
            data.nodes[cnode.id] = cnode;
            data.links.push({source: node.id, target: cnode.id, width: 1.0, value: 20 });
        }

        setTimeout(() => {
            window.graph.graph.zoomToFit(1000)
        }, 4500);
        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.showLinks();
    }
    static handle(results) {
        AImage.viewDeep3D(results, "new");
        AImage.showDetail(results);
    }
    static _iterateViewDeep3D(obj, parent, nodes, links) {
        if(obj.base) {
             let node = {
                id: obj.base + '-image',
                name: obj.base.replace(/\s/g, '\n'),
                view: AImage.view3D,
                expandView: AImage.handle,
                expandLink: `implementation/image?name=${obj.base}`,
            };
            nodes[node.id] = node;
            links.push({target: parent.id, source: node.id, width: 1.0, value: 10 });
            AImage._iterateViewDeep3D(obj.base, node, nodes, links);
        }
    }

}
function getDetails(objs) {
    let items = [];
    let inum = 0;
    for (let name in objs) {
        inum++;
        items.push(name);
    }
    return items;
}

