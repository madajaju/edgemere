import {AText, AWorkFlow, ASelectedHUD, AScenario, AUsecase, AUserActivity} from './index.js';

const scolor = {
    started: "#00ffff",
    created: "#00ffff",
    inprogress: "#00aaff",
    blocked: "#ffbb44",
    completed: "#aaffaa",
    failed: "#ffaaaa",
    error: "#ffaaaa",
    enabled: "#00ff00",
    disable: "#aaaaaa",
    rejected: "#ff0000",
    accepted: "#00aaaa",
    update: "#00aaaa",
    needed: "#ffbb44",
    selected: "#00ff00",
    evaluated: "#ffff00",
};

export default class AActivityRun {
    constructor(activity) {
        // Load up the attributes from the activity
        for(let iname in activity) {
            this[iname] = activity[iname];
        }
        let data = {nodes: {}, links: []};
        let aid = "AAI" + activity.id;
        let color = scolor['created'];
        // The depth of the activity has to do with activities that are workflows.
        // There are two numbers for each depth in the id. 0.1 is level 1, 0.1.2.3 is level 2.
        let depth = -(Math.floor(activity.id.split('.').length / 2) - 1)*200;
        let bbox = {
            x: { min: depth, max: depth},
            y: { min: -1000, max: 300 },
            z: { max: -200 }
        };

        if(activity.name === "Init") {
            // fix the location to the upper left hand corner.
            bbox = {
                x: { min: depth, max: depth},
                y: { min: 300, max: 300 },
                z: { min: -200, max: -200 }
            };
            // Set the parent link for the init.
            // This will prevent all of the states being connected to the parent activity.
            // Although that is correct, the graph becomes too confusing.
            // The parent activity is the id minus the last number. The last number represents the workflow id.
            // Which is not shown in the graph.
            if(activity.parent && typeof activity.parent === 'string') {
                let ids = activity.parent.split('.');
                ids.pop();
                if (ids.length > 0) {
                    data.links.push({
                        source: "AAI" + ids.join('.'),
                        target: aid,
                        value: 10,
                        width: 1,
                        color: '#0088ff'
                    });
                }
            }
        }
        this.node = {
            id: aid,
            state: "created",
            name: activity.name,
            details: activity.description,
            view: AActivityRun.view3D,
            activity: activity,
            color: color,
            bbox: bbox,
            rotate: {
                y:  Math.PI/2 // Rotate to the right side
            },
            orientation: { x: 1, y: 0, z: 0 }
        };
        // Set up the detail popup for the user activity if the activity requires user input.
        // If the actor is set on the activity it requires user input.
        // This is handled in the getDetail for the node.
        if(activity.actor) {
            this.node.actor = activity.actor;
        }
        data.nodes[aid] = this.node;
        if(activity.previous) {
            for(let i in activity.previous) {
                data.links.push({source: "AAI" + activity.previous[i].id, target: aid, value: 10, arrow: 30, width: 3});
            }
        }
        // This is the link to the AActivity.
        data.links.push({target: aid, source: activity.name.replaceAll(/\s/g,''), value: 0, width: 0.1});
        window.graph.addData(data.nodes, data.links);
        AActivityRun._instances[activity.id] = this;
    }
    static _instances = {};

    static default = {
        fontSize: 15,
        height: 40,
        width: 40,
        depth: 10,
        corner: 5,
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);

        let height = nameArray.length * AActivityRun.default.fontSize * 2;
        let width = maxLetters * (AActivityRun.default.fontSize / 1.5);
        let depth = AActivityRun.default.depth;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth)) / 2;

        // Now calculate height for the inputs and outputs.
        if(node.object) {
            let inputLength = 0;
            let outputLength = 0;
            if(node.object.inputs) {
                inputLength = Object.keys(node.object?.inputs).length || 0;
            }
            if(node.object.outputs) {
                outputLength = Object.keys(node.object.outputs).length || 0;
            }
            let iolength = Math.max(inputLength, outputLength);
            let ioHeight = iolength * AActivityRun.default.fontSize * 2; // The font height should be half the size of the normal font. See above.
            height = Math.max(ioHeight * 1.2, height);
        }
        return {w: width, h: height, d: depth, r: radius};
    }
    static viewIO3D(name, object) {
        let oname = object;

        if(typeof object === 'object') { oname = object.type }

        let node = {
            name: `${name}: ${oname}`,
            description: object.description
        }
        if(node.name.length > 30) {
            node.name = node.name.substring(0,30) + "..."
        }
        let height = AActivityRun.default.fontSize /  1.5; // 1/3 the normal font size
        let width = node.name.length * (AActivityRun.default.fontSize / 4.5); // half the normal font size


        let shape = new THREE.BoxGeometry(width, height, AActivityRun.default.fontSize / 3);

        let opacity = 1;
        let color = node.color || "#006699";
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
        let group = new THREE.Mesh(shape, material);
        let labelText = node.name;
        let label = AText.view3D({
            text: labelText,
            color: "#ffffff",
            width: node.width,
            size: AActivityRun.default.fontSize /3
        });
        label.position.set(0, 0, (AActivityRun.default.fontSize/6)* 1.1 );
        label.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
        group.add(label);
        group.width = width;
        group.height = height;
        return group;
    }
    static view3D(node, type) {
        node.object = node.activity;
        let size = AActivityRun.calculateBox(node);
        // This is the rounded cube
        let width = size.w;
        let height = size.h
        let halfWidth = width / 2;
        let halfHeight = height / 2;
        let depth = size.d;
        let radius0 = node.radius || (Math.min(Math.min(width, height), depth) * .25);
        let smoothness = Math.max(3, Math.floor(node.smoothness) || 3);


        let shape = new THREE.Shape();
        let eps = AActivityRun.default.corner;
        let radius = radius0 - 1;

        shape.absarc(-halfWidth + eps, -halfHeight + eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(-halfWidth + eps, halfHeight - radius * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(halfWidth - radius * 2, halfHeight - radius * 2, eps, Math.PI / 2, 0, true);
        shape.absarc(halfWidth - radius * 2, -halfHeight + eps, eps, 0, -Math.PI / 2, true);
        // Save the orginal details.
        node.description = `<b>State:</b> - ${node.state}\n`
        if(node.message) {
            node.description += node.message;
        }
        node.description += `\n${node.detail}\n`;
        // This is the rounded cube
        let geometry = new THREE.ExtrudeBufferGeometry(shape, {
            depth: depth,
            bevelEnabled: true,
            bevelSegments: smoothness * 2,
            steps: 1,
            bevelSize: radius,
            bevelThickness: radius0,
            curveSegments: smoothness
        });

        let opacity = node.opacity || 1;
        let color = node.color || "#22bb66";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
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
        let group = new THREE.Mesh(geometry, material);
        let labelText = node.name.replace(/\s/g, '\n');
        let label = AText.view3D({
            text: labelText,
            color: "#ffffff",
            width: node.width,
            size: AActivityRun.default.fontSize
        });
        label.position.set(0, 0, (depth + radius0) + 2);
        label.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
        group.add(label);

        let stateText = `(${node.id.replace('AAI', '')}) [${node.state}]`;
        let labelState = AText.view3D({
            text: stateText,
            color: "#ffffff",
            width: node.width,
            size: AActivityRun.default.fontSize/2
        });
        labelState.position.set(0, (size.h/2 - AActivityRun.default.fontSize/3), (depth + radius0) + 2);
        labelState.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
        group.add(labelState);

        // Add the specific type of Activity

        if(node.object && node.object.inputs) {
            let yoffset = AActivityRun.default.fontSize * 1.5;
            let inputs = []
            for (let iname in node.object.inputs) {
                inputs.push(`${iname}: ${node.object.inputs[iname].type} - ${node.object.inputs[iname].description}`);

                let ioNode = AActivityRun.viewIO3D(iname, node.object.inputs[iname]);
                ioNode.position.set(-(size.w/2 + ioNode.width/2 - AActivityRun.default.fontSize * 0.5) , size.h / 2 - yoffset, size.d * 1.2);
                group.add(ioNode);
                yoffset += AActivityRun.default.fontSize;
            }
            node.description = node.description + "\n<b>Inputs:</b>\n  - " + inputs.join('\n  - ');
        }
        if(node.object && node.object.outputs) {
            let outputs = []
            let yoffset = AActivityRun.default.fontSize * 1.5;
            for (let iname in node.object.outputs) {
                outputs.push(`${iname}: ${node.object.outputs[iname]}`);

                let ioNode = AActivityRun.viewIO3D(iname, node.object.outputs[iname]);
                ioNode.position.set((size.w/2 + ioNode.width/2 - AActivityRun.default.fontSize * 0.5), size.h / 2 - yoffset, size.d * 1.2);
                group.add(ioNode);
                yoffset += AActivityRun.default.fontSize;
            }
            node.description = node.description + "\n<b>Outputs:</b>\n  - " + outputs.join('\n  - ');
        }

        let subNode = {
            name: node.name,
            description: node.description,
        }

        node.expandLink = `nolink`;
        node.getDetail = AActivityRun.getDetail;
        if (node.object) {
            if (node.object.type === "scenario") {
                let item = AScenario.view3D(subNode);
                item.scale.set(0.3, 0.3, 0.3);
                item.position.set(-(size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
                // The Scenario id is UseCase.Scenario This is found in the object.obj.uid field.
                node.expandLink = `scenario/get?id=${node.object?.obj?.uid}`;
                node.expandView = AScenario.handle;
            } else if (node.object.type === "usecase") {
                let item = AUsecase.view3D(subNode);
                item.scale.set(0.3, 0.3, 0.3);
                item.position.set(-(size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
                node.expandLink = `usecase/get?id=${node.name}`;
                node.expandView = AUsecase.handle;
            } else if (node.object.type === "workflow") {
                let item = AWorkFlow.view3D(subNode);
                item.scale.set(0.3, 0.3, 0.3);
                item.position.set(-(size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
                node.expandLink = `workflow/get?id=${node.name}`;
                node.expandView = AWorkFlow.handle;
            }
            if (node.name === "Init") {
                const materialSphere = new THREE.MeshPhysicalMaterial({
                    color: "#dddddd",
                    transparent: true,
                    opacity: 1,
                    depthTest: true,
                    depthWrite: true,
                    alphaTest: 0,
                    reflectivity: 0.8,
                    metalness: 0.5,
                    clearcoat: 0.9,
                    clearcoatRoughness: 0.3,
                    side: THREE.DoubleSide
                });
                let item = new THREE.Mesh(new THREE.SphereGeometry(15), materialSphere);
                item.position.set((size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
            }
            // Terminal Node
            if(!node.object.next || Object.keys(node.object.next).length === 0) {
                const materialSphere = new THREE.MeshPhysicalMaterial({
                    color: "#bbbbbb",
                    transparent: true,
                    opacity: 1,
                    depthTest: true,
                    depthWrite: true,
                    alphaTest: 0,
                    reflectivity: 0.8,
                    metalness: 0.65,
                    clearcoat: 1,
                    side: THREE.DoubleSide
                });
                const materialSphere2 = new THREE.MeshPhysicalMaterial({
                    color: "#dddddd",
                    transparent: true,
                    opacity: 0.35,
                    depthTest: true,
                    depthWrite: true,
                    alphaTest: 0,
                    reflectivity: 0.34,
                    metalness: 0,
                    clearcoat: 0,
                    side: THREE.DoubleSide
                });
                let item = new THREE.Mesh(new THREE.SphereGeometry(15), materialSphere);
                let item2 = new THREE.Mesh(new THREE.SphereGeometry(20), materialSphere2);
                item.position.set((size.w / 2), size.h / 2, size.d + 1);
                item2.position.set((size.w / 2), size.h / 2, size.d + 1);
                group.add(item);
                group.add(item2);
            }
        }

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
        node.getDetail = AActivityRun.getDetail;
        return group;
    }

    static getDetail(node) {
        if(!node.actor) {
            AActivityRun.showDetail(node);
        } else {
            AActivityRun.showUserActivity(node);
        }

    }

    static showDetail(result) {
        let records = [];
        let cols = [
            {field: 'name', size: "20%", resizeable: true, label: "Name", sortable: true},
            {field: 'value', size: "80%", resizeable: true, label: "Value", sortable: true},
        ];
        w2ui['objdetail'].clear();
        w2ui['objdetail'].columns = cols;
        let i = 0;
        records.push({recid: i++, name: 'name', value: result.object.name, detail: result.object.name});
        records.push({
            recid: i++,
            name: 'Description',
            value: result.object.description,
            detail: result.object.description
        });
        records.push({
            recid: i++,
            name: 'Type',
            value: result.object.type,
            detail: result.object.type
        });
        if (result.object.actor) {
            records.push({
                recid: i++,
                name: 'Actor',
                value: result.object.actor,
                detail: result.object.actor
            });
        }
        if (result.object.package) {
            records.push({
                recid: i++,
                name: 'Actor',
                value: result.object.package,
                detail: result.object.package
            });
        }
        // Next Activity
        for (let aname in result.object.next) {
            let next = result.object.next[aname];
            let details = new Array();
            details.push(`name^${aname}`);
            if (next.condition) {
                details.push(`condition^${next.condition.test}[${next.condition.value}]`);
            }

            records.push({recid: i++, name: "Next", value: aname, detail: details.join('|')});
        }

        w2ui['objdetail'].records = records;
        // Clear the detail list

        ASelectedHUD.update('Activity', records);
        w2ui['objdetail'].refresh();
    }

    static viewDeep3D(obj) {

    }

    static handle(results) {

    }
    static handleEvent(event, activity, message) {
        let records = w2ui['WorkflowSimulation'].records;
        let color = scolor[event];
        if (event === 'created') {
            let params = [];
            for (let j in activity.inputs) {
                params.push(`${j}: ${activity.inputs[j]}`);
            }
            let outputs = [];
            for (let j in activity.outputs) {
                outputs.push(`${j}: ${activity.outputs[j].type}`);
            }
            w2ui['WorkflowSimulation'].add({
                recid: "AAI" + activity.id,
                name: activity.name,
                id: activity.id,
                type: activity.type,
                inputs: params.join(","),
                outputs: outputs.join(","),
                "w2ui": {"style": `background-color: ${color}`}
            });
            // Handle the graphical elements
            // Create an AActivityRun
            let node = new AActivityRun(activity);
        } else {
            // Find the appropriate node.
            let record = records["AAI" + activity.id];
            let inputs = [];
            for (let j in activity.args) {
                inputs.push(`${j}: ${activity.args[j]}`);
            }
            let outputs = [];
            for (let j in activity.outputs) {
                outputs.push(`${j}: ${activity.outputs[j]}`);
            }
            let newRecord = {
                "id": "AAI" + activity.id,
                "w2ui": {"style": `background-color: ${color}`}
            }
            if (inputs.length > 0) {
                newRecord.inputs = inputs;
            }
            if (outputs.length > 0) {
                newRecord.outputs = outputs;
            }
            w2ui['WorkflowSimulation'].set(newRecord.id, newRecord);
            activity.state = event;
            activity.message = message;
            AActivityRun.update(activity);
        }
    }
    static update(activity) {
        let myact = AActivityRun._instances[activity.id];
        if(myact) {
            if (activity.inputs) {
                if (!myact.inputs) {
                    myact.inputs = {};
                }
                for (let iname in activity.inputs) {
                    myact.inputs[iname] = activity.inputs[iname];
                }
            }
            if (activity.outputs) {
                if (!myact.outputs) {
                    myact.outputs = {};
                }
                for (let oname in activity.outputs) {
                    myact.outputs[oname] = activity.outputs[oname];
                }
            }
            window.graph.setNodeAndFocus(myact.node.id, {
                color: scolor[activity.state],
                state: activity.state,
                activity: myact
            });
        }
    }
    static clear() {
    }

    static selectNode(id) {
        window.graph.selectNodeByID(event.recid);
    }
    static showUserActivity(node) {
        AUserActivity.openInputDialog(node.id.replace('AAI',''));
    }
}

