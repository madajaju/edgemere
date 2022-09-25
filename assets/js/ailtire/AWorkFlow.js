import {AText, AActivity, ASwimlane, AFlowCondition} from './index.js';

export default class AWorkFlow {

    constructor(config) {
        this.config = config;
    }
    static default = {
        fontSize: 15,
        height: 40,
        width: 40,
        depth: 20,
        corner: 5,
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);

        let height = nameArray.length * AWorkFlow.default.fontSize * 2;
        let width = maxLetters * (AWorkFlow.default.fontSize / 1.5);
        let depth = AWorkFlow.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;
        return {w: width, h: height, d: depth, r: radius};
    }
    static colors = [
        '#ffaa88',
        '#ffffaa',
        '#88aaff',
        '#cccccc',
        '#88ffaa',
        '#aaaaff',
    ];

    static view3D(node, type) {
        let color = node.color || "#77aa44";
        let opacity = node.opacity || 0.75;
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        const size = AWorkFlow.calculateBox(node);
        const theta = Math.PI / 2;
        const group = new THREE.Group();
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
        const box1Obj = new THREE.Mesh(new THREE.BoxGeometry(size.w, size.h/3, size.d), material);
        const box2Obj = new THREE.Mesh(new THREE.BoxGeometry(size.w, size.h/3, size.d), material);
        const box3Obj = new THREE.Mesh(new THREE.BoxGeometry(size.w, size.h/3, size.d), material);
        box1Obj.position.set(0,0,0);
        box2Obj.position.set(0,-size.h/2.8,0);
        box3Obj.position.set(0,size.h/2.8,0);
        group.add(box1Obj);
        group.add(box2Obj);
        group.add(box3Obj);

        let label = AText.view3D({text: node.name.replace(/\s/g,'\n'), color: "#ffffff", width: 80, size: 12});
        label.position.set(0, 0, size.d+1);
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
        node.box = size.r;
        node.expandLink = `statenet/get?id=${node.id}`;
        node.expandView = AWorkFlow.handle;
        node.getDetail = AWorkFlow.getDetail;

        return group;
    }

    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AWorkFlow.showDetail(results);
            }
        });
    }

    static handle(results, config) {
        if (!config) {
            config = {mode: "new"}
        }
        AWorkFlow.viewDeep3D(results, config);
        AWorkFlow.showDetail(results);
    }

    static handleList(result) {
        AWorkFlow.viewList3D(result, 'new');
        AWorkFlow.showListDetail(result);
    }

    static viewList3D(result) {
        let data = {nodes: {}, links: []};

        for (let wname in result) {
            let item = result[wname];
            data.nodes[wname] = {
                id: wname,
                name: item.name,
                description: item.description,
                view: AWorkFlow.view3D
            }
            for(let aname in item.activities) {
                let activity = item.activities[aname];
                if(activity.type === "workflow") {
                    data.links.push({target: wname, source: aname,value: 30, width: 2});
                }
            }
        }
        window.graph.setData(data.nodes, data.links);
        window.graph.showLinks();
    }

    static showList(panel, parent) {
        $.ajax({
            url: 'WorkFlow/list',
            success: function (results) {
                let items = [];
                for (let wname in results) {
                    let workflow = results[wname];
                    let node = {
                        id: wname,
                        text: workflow.name,
                        img: 'icon-page',
                        link: `workflow/get?id=${wname}`,
                        view: 'workflow',
                    };
                    items.push(node);
                }
                w2ui[panel].add(parent, items);
            }
        });
    }

    static showDetail(result) {

    }

    static showListDetail(result) {
        let records = [];
        let cols = [
            {field: 'name', size: "50%", resizeable: true, label: "Name", sortable: true},
            {field: 'value', size: "50%", resizeable: true, label: "Value", sortable: true},
        ];
        w2ui['objlist'].columns = cols;
        let i = 0;
        for (let wname in result) {
            let details = `name^${result[wname].name}|description^${result[wname].description}|activities^${Object.keys(result[wname].activities).length}`;
            records.push({recid: wname, name: result[wname].pkg, value: wname, detail: details});
        }

        w2ui['objlist'].records = records;
        // Clear the detail list
        w2ui['objdetail'].clear();

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
        w2ui['objlist'].refresh();
    }

    static viewDeep3D(workflow, opts) {
        let data = {nodes: {}, links: []};
        let swimlanes = {};
        let cindex = 0;

        for (let aname in workflow.activities) {
            let activity = workflow.activities[aname];
            let containerID =undefined;
            // Add the swimlane
            if(activity.package) {
                containerID = activity.package;
                data.nodes[activity.package] = {
                    id: activity.package,
                    name: activity.package,
                    description: `Package: ${activity.package}`,
                    type: 'package',
                    view: ASwimlane.view3D
                }
            } else if(activity.actor) {
                containerID = activity.actor;
                data.nodes[activity.actor] = {
                    id: activity.actor,
                    name: activity.actor,
                    description: `Actor: ${activity.actor}`,
                    type: 'actor',
                    view: ASwimlane.view3D
                }
            } else {
                containerID = "_CatchAllSwimlane";
                data.nodes["_CatchAllSwimlane"] = {
                    id: "_CatchAllSwimlane",
                    name: "",
                    description: "",
                    view: ASwimlane.view3D
                }
            }
            let aid = aname.replace(/\s/g, '');
            data.nodes[aid] = {
                id: aid,
                name: aname,
                description: activity.description,
                view: AActivity.view3D,
                object: activity,
                rbox: { parent: containerID,
                },
            }
            if(!swimlanes.hasOwnProperty(containerID)) {
                swimlanes[containerID] = {
                    color: AWorkFlow.colors[cindex++],
                    size: {},
                    children: new Array()
                }
            }
            swimlanes[containerID].children.push(data.nodes[aid]);
            for (let nname in activity.next) {
                let next = activity.next[nname];
                let nid = nname.replace(/\s/g, '');
                if (next.condition) {
                    let cid = next.condition.test.replace(/\s/g, '');
                    if (!data.nodes.hasOwnProperty(cid)) {
                        data.nodes[cid] = {
                            id: cid,
                            name: next.condition.test,
                            description: next.condition.test,
                            view: AFlowCondition.view3D,
                        };
                        swimlanes[containerID].children.push(data.nodes[cid]);

                        data.links.push({
                            target: cid,
                            source: aid,
                            value: 1,
                            width: 2,
                            relpos: 1,
                            arrow: 30,
                        });
                    }
                    data.links.push({
                        target: nid,
                        source: cid,
                        value: 10,
                        width: 2,
                        name: `[${next.condition.value}]`,
                        relpos: 1,
                        arrow: 30,
                    });
                } else {
                    data.links.push({
                        target: nid,
                        source: aid,
                        value: 10,
                        width: 2,
                        relpos: 1,
                        arrow: 30,
                    });
                }
            }
        }
        // Now calculate the width of the swimlanes based on the number of items
        let yoffset = 0 ; // Object.keys(swimlanes).length/2 * ;
        let maxSize = { w: 0, h: 0, d: 0};
        for(let sname in swimlanes) {
            let swimlane = swimlanes[sname];
            let children = swimlane.children;
            let size = ASwimlane.calculateBox({name: sname, children: children});
            swimlane.size = size;
            maxSize.w = Math.max(maxSize.w, size.w);
            maxSize.h = Math.max(maxSize.h, size.h);
            maxSize.d = Math.max(maxSize.d, size.d);
        }
        for(let sname in swimlanes) {
            let swimlane = swimlanes[sname];
            let children = swimlane.children;
            data.nodes[sname].color = swimlane.color;
            data.nodes[sname].fx = 0;
            data.nodes[sname].fy = yoffset;
            data.nodes[sname].fz = 0;
            data.nodes[sname].w = maxSize.w;
            data.nodes[sname].d = maxSize.d;
            data.nodes[sname].h = maxSize.h;
            data.nodes[sname].children = children;
            swimlane.size = maxSize;
            let size = swimlane.size;
            for(let i in children) {
                let cnode = children[i];
                let csize = AActivity.calculateBox(cnode);
                if(cnode.name === 'Init') { // This is a starting node.
                    cnode.rbox = {
                        parent: sname,
                        // Need to add some buffer for the title on the min side of x.
                        fx:  -(size.w / 2 - csize.w / 2 - ASwimlane.default.fontSize * 4),
                        fy: size.h / 2 - csize.h / 2,
                        // z: {min: -(size.d/2 - csize.d/2), max: (size.d/2 -csize.d/2)},
                        fz: size.d / 2 + csize.d / 2
                    }
                } else if(cnode.object && !cnode.object.next) { // This is a terminal node.
                    cnode.rbox = {
                        parent: sname,
                        // Need to add some buffer for the title on the min side of x.
                        x: {
                            min: 0,
                            max: (size.w / 2 - csize.w / 2)
                        },
                        y: {min: -(size.h / 2 - csize.h / 2), max: 0},
                        // z: {min: -(size.d/2 - csize.d/2), max: (size.d/2 -csize.d/2)},
                        fz: size.d / 2 + csize.d / 2
                    }
                } else {
                    cnode.rbox = {
                        parent: sname,
                        // Need to add some buffer for the title on the min side of x.
                        x: {
                            min: -(size.w / 2 - csize.w / 2 - ASwimlane.default.fontSize * 4),
                            max: (size.w / 2 - csize.w / 2)
                        },
                        y: {min: -(size.h / 2 - csize.h / 2), max: (size.h / 2 - csize.h / 2)},
                        // z: {min: -(size.d/2 - csize.d/2), max: (size.d/2 -csize.d/2)},
                        fz: size.d / 2 + csize.d / 2
                    }
                }
            }
            yoffset -= maxSize.h + 10;
        }
        if (opts.mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.showLinks();
    }
}

