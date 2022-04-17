import {AText, APackage, AModel, AAction, AObject} from "./index.js";

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

    static view3D(node, type) {
        let color = node.color || "#ff8844";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let geometry = new THREE.BoxGeometry(75, 30, 10);
        const material = new THREE.MeshLambertMaterial({color: color, opacity: 1});
        const box = new THREE.Mesh(geometry, material);
        let name = node.name;
        if(!name) {
            name = node.id;
        }
        let label = AText.view3D({text:name.replace(/\s/g, '\n'), color:"#ffffff", width: 50, size: 12});
        label.position.set(0,0,7);
        box.add(label)

        box.position.set(node.x, node.y, node.z);
        box.aid = node.id;
        node.box = 100;
        node.expandLink = `scenario/get?id=${node.id}`;
        node.expandView = AScenario.viewDeep3D;
        return box;
    }
    static viewStep3D(node, type) {
        let color = node.color || "#aaaaaa";
        if (type === 'Selected') {
            color = "yellow";
        } else if (type === 'Targeted') {
            color = "red";
        } else if (type === 'Sourced') {
            color = "green";
        }
        let geometry = new THREE.BoxGeometry(150, 20, 5);
        const material = new THREE.MeshLambertMaterial({color: color, opacity: 1});
        const box = new THREE.Mesh(geometry, material);
        let label = AText.view3D({text:node.name, color:"#ffffff", width: 200, size: 14});
        label.position.set(0,0,5);
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
        data.nodes[scenario.id] = {id: scenario.id, name: scenario.name,
            view:AScenario.view3D,
            expandView: AScenario.viewDeep3D,
            expandLink: `scenario/get?id=${scenario.id}`
        };
        let rbox = {};
        let luid = scenario.id;
        for(let i in scenario.steps) {
            let step = scenario.steps[i];
            let uid = `${scenario.id}-${i}`;
            rbox = {parent:luid, x:{min:0,max: 0}, z:{min:0,max:0}, y: {min:-30, max: -30}};
            data.nodes[uid] = {id: uid, name: step.action.name,
                view:AScenario.viewStep3D,
                expandView: AScenario.viewDeep3D,
                expandLink: `scenario/get?id=${scenario.id}`,
                rbox: rbox, box:10};
            // Add the action for the step.
            let action = step.action;
            if(!data.nodes.hasOwnProperty(action.name)) {

                data.nodes[action.name] = {
                    id: action.name, name: action.name.replace(/\//,'\n'), view: AAction.view3D,
                    w: 80, h: 30,
                    rbox: {
                        parent: uid,
                        x: {min: 150, max: 150},
                        y: {min: 0, max: 0},
                        z: {min: -150, max: -150}
                    }
                };
            }
            data.links.push({source: uid, target: action.name, value: 0.1});
            // Add the package for the action.
            let pkg = action.pkg;
            if(pkg) {
                if(!data.nodes.hasOwnProperty(pkg.shortname)) {
                    data.nodes[pkg.shortname] = {
                        id: pkg.shortname,
                        name: pkg.name,
                        color: pkg.color,
                        view: APackage.view3D,
                        expandView: APackage.viewDeep3D,
                        expandLink: `package/get?id=${pkg.shortname}`,
                        rbox: {
                            parent: scenario.id,
                            x: {min: -300, max: 300},
                            y: {min: -300, max: 300},
                            z: {min: -450, max: -450}
                        }
                    };
                }
                if(!action.cls) {
                    data.links.push({source: action.name, target: pkg.shortname, value: 0.1});
                }
            }
            // Add the class if it is a class action.
            if(action.cls) {
                let cls = action.cls;
                if(!data.nodes.hasOwnProperty(cls)) {
                    data.nodes[cls] = {
                        id: cls, name: cls, view: AModel.view3D,
                        expandView: AModel.viewDeep3D,
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

    handle(result) {
        AScenario.viewDeep3D(result, 'new');
        detailList(result);

        let records = [];
        // Scenario List for similutation.
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
                        if (event.target == 'launch') {
                            let scenario = w2ui['scenariolist'].scenario;
                            $.ajax({
                                url: `scenario/launch?id=${scenario.id}`,
                                success: function (result) {
                                    console.log("Scenario Launched");
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

    handleEvent(event, scenario) {
        if (event.includes('scenario.started')) {
            w2ui['scenariolist'].header = scenario.name + ' Started';
            window.graph.setNode(scenario.id, {color:scolor['started']});
        } else if (event.includes('scenario.completed')) {
            w2ui['scenariolist'].header = scenario.name + ' Completed';
            window.graph.setNode(scenario.id, {color:scolor['completed']});
        } else if (event.includes('scenario.failed')) {
            w2ui['scenariolist'].header = scenario.name + ' Failed';
            window.graph.setNode(scenario.id, {color:scolor['failed']});
        } else if (event.includes('step.started')) {
            w2ui['scenariolist'].set(scenario.currentstep, {"w2ui": {"style": "background-color: #bbffff"}});
            let steprec = w2ui['scenariolist'].get(scenario.currentstep);
            window.graph.setNode(scenario.id + '-' + scenario.currentstep, {color:scolor['started']});
        } else if (event.includes('step.completed')) {
            w2ui['scenariolist'].set(scenario.currentstep, {"w2ui": {"style": "background-color: #bbffbb"}});
            window.graph.setNode(scenario.id + '-' + scenario.currentstep, {color:scolor['completed']});
        } else if (event.includes('step.failed')) {
            w2ui['scenariolist'].set(scenario.currentstep, {"w2ui": {"style": "background-color: #ffbbbb"}});
            window.graph.setNode(scenario.id + '-' + scenario.currentstep, {color:scolor['failed']});
        } else {
            let parent = window.graph.getSelectedNode();
            // Because the event is not a scenario it is an object event.
            let object = scenario;
            AObject.addObject(object, parent.id);
        }
        w2ui['scenariolist'].refresh();
    }
}

function detailList(result) {
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
    records.push({recid: i++, name:'name', value:result.name, detail:result.name});
    records.push({recid: i++, name:'description', value:result.description, detail:result.description});
    records.push({recid: i++, name:'method', value:result.method, detail:result.method});
    let actorDetails = Object.keys(result.actors).map( actor => { return `${actor}, <span onclick="expandObject('actor/get?id=${actor}');">${actor}</span>` });
    records.push({recid: i++, name:'actors', value:Object.keys(result.actors).length, detail:actorDetails.join("|")});
    let stepsDetails = Object.keys(result.steps).map( item => {
        return `${result.steps[item].action.name}, ${showParameters(result.steps[item].parameters) }`;
    });
    records.push({recid: i++, name:'steps', value:Object.keys(result.steps).length, detail:stepsDetails.join('|')});
    w2ui['objlist'].records = records;
    w2ui['objlist'].refresh();
}

function showParameters(params) {
    return Object.keys(params).map(name => {
        return `--${name}=${params[name]}`;
    }).join(' ');
}

function showGraph(scenario, mode) {
    let data = {nodes: {}, links: {}};
    if (mode === 'add') {
        window.graph.addData(data.nodes, data.links);
    } else {
        window.graph.setData(data.nodes, data.links);
    }
    window.graph.showLinks();
}
