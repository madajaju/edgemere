import {AScenario, AText, AUsecase, A3DGraph, ASelectedHUD} from './index.js';

export default class AComponent {
    constructor(config) {
        this.config = config;
    }
    static totalCount = 0;
    static default = {
        fontSize: 15,
        height: 50,
        width: 70,
        depth: 20,
    }


    static calculateBox(node) {
        let height = AComponent.default.height;
        let width = AComponent.default.width;
        let depth = AComponent.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: depth, r: radius};
    }

    static _iterateShowList(items, parent) {
        let retval = [];
        AComponent.totalCount++;
        let count = 0;
        for (let name in items) {
            let litem = {
                id: `${name}-component-${AComponent.totalCount}`,
                text: name,
                img: 'icon-folder',
                nodes: [],
                view: 'component',
                link: `implementation/thirdparty?name=${name}`,
                count: 0
            };
            count++;
            AComponent.totalCount++;
            if (items[name].dependencies) {
                [litem.nodes, litem.count] = AComponent._iterateShowList(items[name].dependencies);
            }
            count += litem.count;
            retval.push(litem);
        }
        return [retval, count];
    }

    static showList(panel, parent) {
        $.ajax({
            url: 'implementation/thirdparty',
            success: function (results) {
                let component = results;
                let item = {
                    id: component.name + '-component',
                    text: component.name,
                    version: component.version,
                    img: 'icon-folder',
                    nodes: [],
                    link: `implementation/thirdparty?name=${component.name}`,
                    view: 'component'
                };
                [item.nodes, item.count] = AComponent._iterateShowList(component.dependencies);
                w2ui[panel].add(parent, item);
            }
        });
    }

    static view3D(node, type) {
        let color = node.color || "#bbaaff";
        let opacity = node.opacity || 0.75;
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let size = AComponent.calculateBox(node);
        const theta = Math.PI / 2;
        const group = new THREE.Group();
        const base = new THREE.BoxGeometry(size.w, size.h, size.d);
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
        const baseObj = new THREE.Mesh(base, material);
        group.add(baseObj);
        const s1 = new THREE.BoxGeometry(size.w / 2, size.h / 6, size.d * 1.4);
        const s1Obj = new THREE.Mesh(s1, material);
        s1Obj.position.set(size.w / 2, 1 * size.h / 6, 0);
        group.add(s1Obj);
        const s2 = new THREE.BoxGeometry(size.w / 2, size.h / 6, size.d * 1.4);
        const s2Obj = new THREE.Mesh(s2, material);
        s2Obj.position.set(size.w / 2, -1 * size.h / 6, 0);
        group.add(s2Obj);

        let label = AText.view3D({
            text: node.name.replace(/\s/g, '\n'),
            color: "#ffffff",
            width: size.w,
            size: AComponent.default.fontSize
        });
        label.position.set(0, 0, size.d + 2);
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
        node.box = size.r;
        node.expandLink = node.expandLink || `implementation/thirdparty?name=${node.name}`;
        node.expandView = node.expandView ||  AComponent.handle;
        node.getDetail = AComponent.getDetail;

        return group;
    }

    static _iterateViewDeep3D(items, parent, nodes, links) {
        let retval = [];
        for (let name in items) {
            let node = {
                id: name,
                name: name,
                view: AComponent.view3D,
                expandView: AComponent.handle,
                expandLink: `implementation/thirdparty?name=${name}`,
            };
            nodes[node.id] = node;
            links.push({target: parent.id, source: node.id, width: 1.0, value: 10 });
            if (items[name].dependencies) {
                AComponent._iterateViewDeep3D(items[name].dependencies, node, nodes, links);
            }
        }
    }

    static viewDeep3D(component, mode) {
        let data = {nodes: {}, links: []};
        window.graph.clearObjects();
        let node = {
            id: component.name + '-component',
            name: component.name.replace(/\s/g, '\n'),
            view: AComponent.view3D,
            expandView: AComponent.handle,
            expandLink: `implementation/thirdparty?name=${component.name}`,
        };

        data.nodes[node.id] = node;
        AComponent._iterateViewDeep3D(component.dependencies, node, data.nodes, data.links);

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

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AComponent.showDetail(results);
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
        records.push({recid: i++, name: 'version', value: result.version, detail: result.version});
        let ucdetails = getDetails(result.dependencies);
        if (result.dependencies) {
            records.push({
                recid: i++,
                name: 'dependencies',
                value: Object.keys(result.dependencies).length,
                detail: ucdetails.join('|')
            });
        }
        w2ui['objlist'].records = records;
        ASelectedHUD.update('Component', records);
        w2ui['objlist'].refresh();
    }

    static handle(result) {
        AComponent.viewDeep3D(result, "new");
        AComponent.showDetail(result);
    }
}

function getDetails(objs) {
    let items = [];
    let inum = 0;
    for (let j in objs) {
        let item = objs[j];
        inum++;
        let name = item.name || j;
        items.push(`${name}@${item.version}`);
    }
    return items;
}
