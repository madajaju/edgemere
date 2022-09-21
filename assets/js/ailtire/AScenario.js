import {AMainWindow, AText, APackage, AModel, AAction, AObject,A3DGraph, ASelectedHUD} from "./index.js";

const scolor = {
    started: "#00ffff",
    create: "#00ffff",
    completed: "#00ff00",
    failed: "#ff0000",
    enabled: "#00ff00",
    disable: "#aaaaaa",
    rejected: "#ff0000",
    accepted: "#00aaaa",
    update: "#00aaaa",
    needed: "#ffbb44",
    selected: "#00ff00",
    evaluated: "#ffff00",
};

export default class AScenario {

    constructor(config) {
        this.config = config;
    }

    static default = {
        fontSize: 16,
        height: 50,
        width: 100,
        depth: 20,
    }

    static popup(record) {
        let myForm = AScenario.stdioForm(record);

        $().w2popup('open', {
            title: 'Edit',
            body: '<div id="ScenarioPopup" style="width: 100%; height: 100%;"></div>',
            style: 'padding: 15px 0px 0px 0px',
            width: 1000,
            height: 600,
            showMax: true,
            onToggle: function (event) {
                $(w2ui.editModelDialog.box).hide();
                event.onComplete = function () {
                    $(w2ui.editModelDialog.box).show();
                    w2ui.editModelDialog.resize();
                }
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                    $('#ScenarioPopup').w2render(myForm.name);
                }
            }
        });
    }

    static calculateBox(node) {
        let nameArray = node.name.split(/\s/).map(item => {
            return item.length;
        });
        let maxLetters = nameArray.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        let height = (nameArray.length * AAction.default.fontSize) / 2 + 10;
        let width = maxLetters * (AAction.default.fontSize / 2) + 20;
        let depth = height * 2;
        let radius = Math.max(Math.sqrt(width * width + height * height), Math.sqrt(height * height + depth * depth), Math.sqrt(width * width + depth * depth))/2;
        return {w: width, h: height * 2, d: height * 2, r: radius};
    }

    static view3D(node, type) {
        let opacity = node.opacity || 0.75;
        let color = node.color || "#ff7722";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let size = AScenario.calculateBox(node);
        let height = size.h;
        let width = size.w;
        let depth = size.d;
        let geometry = new THREE.BoxGeometry(width, height, depth);
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
        const box = new THREE.Mesh(geometry, material);
        let name = node.name;
        if (!name) {
            name = node.id;
        }
        let label = AText.view3D({
            text: name.replace(/\s/g, '\n'),
            color: "#ffffff",
            width: width,
            size: AScenario.default.fontSize
        });
        label.position.set(0, 0, size.d / 2 + 1);
        box.add(label)

        box.position.set(node.x, node.y, node.z);
        box.aid = node.id;
        node.box = size.r;
        node.expandLink = `scenario/get?id=${node.id}`;
        node.expandView = AScenario.handle;
        node.getDetail = AScenario.getDetail;
        return box;
    }
    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AScenario.showDetail(results);
            }
        });
    }
    static showDetail(result) {

        let records = [];
        if (!w2ui['objlist']) {
            $('#objlist').w2grid({name: 'objlist'});
        }
        w2ui['objlist'].onClick = function (event) {
            w2ui['objdetail'].clear();
            let record = this.get(event.recid);
            let drecords = [];
            let k = 0;
            let details = record.detail.split('|');

            for (let i in details) {
                k++;
                let [dname, info] = details[i].split(',');
                drecords.push({recid: k, name: dname, value: info});
            }
            w2ui['objdetail'].add(drecords);
            window.graph.selectNodeByID(event.recid);
        };
        if (!w2ui['objdetail']) {
            $('#objdetail').w2grid({
                name: 'objdetail',
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
        let i = 0;
        records.push({recid: i++, name: 'name', value: result.name, detail: result.name});
        records.push({recid: i++, name: 'description', value: result.description, detail: result.description});
        records.push({recid: i++, name: 'method', value: result.method, detail: result.method});

        let actorDetails = Object.keys(result.actors).map(actor => {
            return `${actor}, <span onclick="expandObject('actor/get?id=${actor}');">${actor}</span>`
        });
        records.push({
            recid: i++,
            name: 'actors',
            value: Object.keys(result.actors).length,
            detail: actorDetails.join("|")
        });

        let stepsDetails = Object.keys(result.steps).map(item => {
            return `${result.steps[item].action.name}, ${showParameters(result.steps[item].parameters)}`;
        });
        records.push({recid: i++, name: 'steps', value: Object.keys(result.steps).length, detail: stepsDetails.join('|')});

        if (result._instances) {
            let runsDetails = Object.keys(result._instances).map(item => {
                return `${item}, <span style="background=${scolor[result._instances[item].state]};">${result._instances[item].state}</span>`;
            })
            records.push({
                recid: i++,
                name: 'runs',
                value: Object.keys(result._instances).length,
                detail: runsDetails.join('|')
            });
        }

        w2ui['objlist'].records = records;
        w2ui['objlist'].refresh();
        ASelectedHUD.update('Scenario', records);
    }
    static viewStep3D(node, type) {
        let opacity = node.opacity || 1;
        let color = node.color || "#997755";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let geometry = new THREE.BoxGeometry(150, 20, 5);
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
        const box = new THREE.Mesh(geometry, material);
        let label = AText.view3D({text: node.name, color: "#ffffff", width: 200, size: 14});
        label.position.set(0, 0, 5);
        box.add(label);

        box.position.set(node.x, node.y, node.z);
        box.aid = node.id;
        node.box = 75
        node.expandLink = `scenario/get?id=${node.id}`;
        return box;
    }

    static viewDeep3D(scenario, mode) {
        let data = {nodes: {}, links: []};
        window.graph.clearObjects();
        data.nodes[scenario.id] = {
            id: scenario.id, name: scenario.name,
            view: AScenario.view3D,
            expandView: AScenario.handle,
            expandLink: `scenario/get?id=${scenario.id}`,
            bbox: {
                x: {min:-600, max:600},
                y: {min:-600, max:600},
                z: {min:500, max:800}
            },
        };
/*
        let geometry = new THREE.BoxGeometry(1000, 1000, 1000);
        const material = new THREE.MeshPhysicalMaterial({
            color: "#ffffff",
            transparent: true,
            opacity: 0.2,
            depthTest: true,
            depthWrite: true,
            alphaTest: 0,
            reflectivity: 0.2,
            thickness: 6,
            metalness: 0,
            side: THREE.DoubleSide
        });
        const box = new THREE.Mesh(geometry, material);
        window.graph.addObject(box);
 */
        let rbox = {};
        let luid = scenario.id;
        for (let i in scenario.steps) {
            let step = scenario.steps[i];
            let uid = `${scenario.id}-${i}`;
            rbox = {parent: luid, x: {min: 0, max: 0}, z: {min: 0, max: 0}, y: {min: -30, max: -30}};
            data.nodes[uid] = {
                id: uid, name: step.action.name,
                view: AScenario.viewStep3D,
                expandView: AScenario.handle,
                expandLink: `scenario/get?id=${scenario.id}`,
                rbox: rbox,
                box: 10
            };
            data.links.push({source: scenario.id, target: uid, value: 0.1, width: 0, color: '#cccccc'});
            // Add the action for the step.
            let action = step.action;
            if (!data.nodes.hasOwnProperty(action.name)) {

                data.nodes[action.name] = {
                    id: action.name, name: action.name.replace(/\//, '\n'), view: AAction.view3D,
                    w: 80, h: 30,
                    fontSize: 12,
                    rbox: {
                        parent: uid,
                        x: {min: -150, max: 150},
                        y: {min: -150, max: 150},
                        z: {min: -150, max: -150}
                    }
                };
            }
            data.links.push({source: uid, target: action.name, value: 0.1});
            // Add the package for the action.
            let pkg = action.pkg;
            if (pkg) {
                if (!data.nodes.hasOwnProperty(pkg.shortname)) {
                    data.nodes[pkg.shortname] = {
                        id: pkg.shortname,
                        name: pkg.name,
                        color: pkg.color,
                        view: APackage.view3D,
                        expandView: APackage.handle,
                        expandLink: `package/get?id=${pkg.shortname}`,
                        rbox: {
                            parent: scenario.id,
                            x: {min: -300, max: 300},
                            y: {min: -300, max: 300},
                            z: {min: -450, max: -450}
                        }
                    };
                }
                if (!action.cls) {
                    data.links.push({source: action.name, target: pkg.shortname, value: 0.1});
                }
            }
            // Add the class if it is a class action.
            if (action.cls) {
                let cls = action.cls;
                if (!data.nodes.hasOwnProperty(cls)) {
                    data.nodes[cls] = {
                        id: cls, name: cls, view: AModel.view3D,
                        expandView: AModel.handle,
                        expandLink: `model/get?id=${cls}`,
                        rbox: {
                            parent: scenario.id,
                            x: {min: -300, max: 300},
                            y: {min: -300, max: 300},
                            z: {min: -300, max: -300}
                        }
                    };
                    data.links.push({source: cls, target: pkg.shortname, value: 0.1});
                }
                data.links.push({target: cls, source: action.name, value: 0.1});
            }
            luid = uid;
        }

        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.showLinks();
        window.graph.graph.cameraPosition(
            {x: 200, y: 50, z: 1000}, // new position
            {x: 0, y: 0, z: 0}, // lookAt ({ x, y, z })
            3000  // ms transition duration.
        );
    }

    static handle(result) {
        AScenario.viewDeep3D(result, 'new');
        AScenario.showDetail(result);
        AMainWindow.currentView = "scenario"

        // Scenario List for simulation.
        let records = [];
        if (!w2ui['scenariolist']) {
            $('#scenariolist').w2grid({
                name: 'scenariolist',
                show: {header: false, columnHeaders: false, toolbar: true},
                columns: [
                    {
                        field: 'recid',
                        caption: 'ID',
                        size: '10%',
                        attr: "align=right",
                        sortable: true
                    },
                    {
                        field: 'action',
                        caption: 'Action',
                        size: '30%',
                        attr: "align=right",
                        sortable: true
                    },
                    {
                        field: 'parameters',
                        caption: 'Parameters',
                        size: '60%',
                        attr: "align=left",
                        sortable: true
                    },
                ],
                onClick: function (event) {
                    let scenario = w2ui['scenariolist'].scenario;
                    let instance = w2ui['scenariolist'].scenarioinstance;
                    $.ajax({
                        url: `scenario/instance?id=${scenario.id}`,
                        success: (result) => {
                            // Popup with the stdout and stderr
                            if(!instance) { // Get the last one run
                                instance = result.length-1;
                            }
                            let text = result[instance].steps[event.recid];
                            AScenario.popup(text);
                        }
                    })
                },
                toolbar: {
                    items: [
                        {id: 'launch', type: 'button', caption: 'Launch Scenario', icon: 'w2ui-icon-plus'},
                        {type: 'break'},
                        {
                            id: 'scenarioname',
                            type: 'html',
                            html: '<span style="background-color: #004488; color: white;padding:5px;">Not Selected</span>'
                        }
                    ],
                    onClick: function (event) {
                        if (event.target === 'launch') {
                            let scenario = w2ui['scenariolist'].scenario;
                            $.ajax({
                                url: `scenario/launch?id=${scenario.id}`,
                                success: function (result) {
                                    w2ui['scenariolist'].scenarioinstance = result.id;
                                }
                            });
                        }
                    }
                }
            });
        }
        for (let i in result.steps) {
            let parameters = result.steps[i].parameters;
            let params = [];
            for (let j in parameters) {
                params.push(`${j}: ${parameters[j]}`);
            }
            records.push({recid: i, action: result.steps[i].action.name, parameters: params.join(',')});
        }
        w2ui['scenariolist'].scenario = result;
        w2ui['scenariolist'].records = records;
        w2ui['scenariolist_toolbar'].set('scenarioname', {html: `<span style="background-color: #2391dd; padding:5px;">${result.name}</span>`});
        w2ui['scenariolist'].refresh();

    }

    static handleEvent(event, scenario) {
        if (event.includes('scenario.started')) {
            w2ui['scenariolist'].header = scenario.name + ' Started';
            window.graph.setNode(scenario.id, {color: scolor['started']});
        } else if (event.includes('scenario.completed')) {
            w2ui['scenariolist'].header = scenario.name + ' Completed';
            window.graph.setNode(scenario.id, {color: scolor['completed']});
        } else if (event.includes('scenario.failed')) {
            w2ui['scenariolist'].header = scenario.name + ' Failed';
            window.graph.setNode(scenario.id, {color: scolor['failed']});
        } else if (event.includes('step.started')) {
            w2ui['scenariolist'].set(scenario.currentstep, {"w2ui": {"style": "background-color: #bbffff"}});
            let steprec = w2ui['scenariolist'].get(scenario.currentstep);
            window.graph.setNode(scenario.id + '-' + scenario.currentstep, {color: scolor['started']});
        } else if (event.includes('step.completed')) {
            w2ui['scenariolist'].set(scenario.currentstep, {"w2ui": {"style": "background-color: #bbffbb"}});
            window.graph.setNode(scenario.id + '-' + scenario.currentstep, {color: scolor['completed']});
        } else if (event.includes('step.failed')) {
            w2ui['scenariolist'].set(scenario.currentstep, {"w2ui": {"style": "background-color: #ffbbbb"}});
            window.graph.setNode(scenario.id + '-' + scenario.currentstep, {color: scolor['failed']});
        } else {
            let parent = window.graph.getSelectedNode();
            // Because the event is not a scenario it is an object event.
            let object = scenario;
            if(typeof object === 'object') {
                if (parent && parent.id) {
                    AObject.addObject(object, parent.id);
                } else {
                    AObject.addObject(object);
                }
            }
        }
        w2ui['scenariolist'].refresh();
    }

    static stdioForm(record) {
        if (!w2ui['ScenarioStdio']) {
            let fields = [
                {field: "state", type: 'text'},
                {field: 'step', type: 'text'},
                {field: 'stdout', type: 'textarea',
                    html: { label: 'Text Area', attr: 'style="width: 800px; height: 100px; resize: none"' }
                },
                { field: 'stderr', type: 'textarea',
                    html: { label: 'Text Area', attr: 'style="width: 800px; height: 100px; resize: none"' }
                }
            ];
            $().w2form({
                name: 'ScenarioStdio',
                style: 'border: 0px; background-color: transparent;',
                fields: fields,
                actions: {
                    custom: {
                        caption: "Close", style: 'background: pink;', onClick(event) {
                            w2popup.close();
                        }
                    }
                }
            });
        }
        w2ui['ScenarioStdio'].record =  {
            state: record.state,
            step: record.step.action,
            stdout: record.stdio.stdout,
            stderr: record.stdio.stderr
        };
        return w2ui['ScenarioStdio'];
    }
}

function detailList(result) {
}

function showParameters(params) {
    return Object.keys(params).map(name => {
        return `--${name}=${params[name]}`;
    }).join(' ');
}
