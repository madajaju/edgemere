export default class AScenario {
    constructor(config) {
        this.config = config;
    }

    static view3D(node, type) {
        let color = node.color || "#888800";
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
        const myText = new SpriteText(node.name);
        myText.position.set(0, 0, 15);
        box.add(myText);
        box.position.set(node.x, node.y, node.z);
        box.aid = node.id;
        node.box = 100;
        node.expandLink =  `scenario/get?id=${node.id}`;
        return box;
    }

    handle(result) {
        showGraph(result, 'new');
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
                        attr: "align=right",
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
            records.push({recid: i, action: result.steps[i].action, parameters: params.join(',')});
        }
        w2ui['scenariolist'].scenario = result;
        w2ui['scenariolist'].records = records;
        w2ui['scenariolist_toolbar'].set('scenarioname', {html: `<span style="background-color: #2391dd; padding:5px;">${result.name}</span>`});
        w2ui['scenariolist'].refresh();
    }

    handleEvent(event, scenario) {
        if (event.includes('scenario.started')) {
            w2ui['scenariolist'].header = scenario.name + ' Started';
        } else if (event.includes('scenario.completed')) {
            w2ui['scenariolist'].header = scenario.name + ' Completed';
        } else if (event.includes('scenario.failed')) {
            w2ui['scenariolist'].header = scenario.name + ' Failed';
        } else if (event.includes('step.started')) {
            w2ui['scenariolist'].set(scenario.currentstep, {"w2ui": {"style": "background-color: #bbffff"}});
            let steprec = w2ui['scenariolist'].get(scenario.currentstep);
            console.log(steprec);
        } else if (event.includes('step.completed')) {
            w2ui['scenariolist'].set(scenario.currentstep, {"w2ui": {"style": "background-color: #bbffbb"}});

        } else if (event.includes('step.failed')) {
            w2ui['scenariolist'].set(scenario.currentstep, {"w2ui": {"style": "background-color: #ffbbbb"}});
        }
        w2ui['scenariolist'].refresh();
    }
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
