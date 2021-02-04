import {AScenario, AActor, AText} from './index.js';

export default class AUsecase {
    constructor(config) {
        this.config = config;
        console.log("AUsecase:", config);
    }
    handle(result) {
        console.log("Handle UseCase:", result);
        AUsecase.viewDeep3D(result, 'new');
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
        records.push({recid: i++, name:'package', value:result.package, detail:result.package});
        records.push({recid: i++, name:'method', value:result.method, detail:result.method});
        let actorDetails = Object.keys(result.actors).map( actor => { return `<span onclick="expandObject('actor/get?id=${actor}');">${actor}</span>` });
        records.push({recid: i++, name:'actors', value:Object.keys(result.actors).length, detail:actorDetails.join("|")});
        let scenarioDetails = Object.keys(result.scenarios).map( item => { return `<span onclick="expandObject('scenario/get?id=${result.name}.${item}');">${result.scenarios[item].name}</span>, ${result.scenarios[item].description}` });
        records.push({recid: i++, name:'scenarios', value:Object.keys(result.scenarios).length, detail:scenarioDetails.join('|')});
        w2ui['objlist'].records = records;
        w2ui['objlist'].refresh();
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
    static view3D(node, type) {
        let color = node.color || "#bbbb00";
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
        let label = AText.view3D({text:node.name.replace(/\s/g, '\n'), color:"#ffffff", width: 50, size: 12});
        label.position.set(0,0,11);
        retval.add(label)
        retval.aid = node.id;
        node.box = 100;
        node.expandLink =  `usecase/get?id=${node.id}`;
        return retval;
    }
    static viewDeep3D(usecase, mode) {
        let data = {nodes:{}, links:[]};
        const theta = 3.14/2;

        data.nodes[usecase.id] = { id: usecase.id, name: usecase.name, fx: 0, fy: 0, fz: 0, view:AUsecase.view3D };
        let bbox = { z: { max: -100, min: -1000}};
        for(let j in usecase.scenarios) {
            let scenario = usecase.scenarios[j];
            data.nodes[j] = { id: j, name: scenario.name, view:AScenario.view3D };
            for(let actor in scenario.actors) {
                let aname = actor.replace(/\s/g, '').toLowerCase();
                data.links.push({source: aname, target: j, value: 0.3, width: 2});
            }
            data.links.push({target: usecase.id, source: j, value: 0.1, width: 3, color: 'gray'});
        }

        for(let actor in usecase.actors) {
            let aname = actor.replace(/\s/g, '').toLowerCase();
            data.nodes[aname] = {id: aname, name: actor, view: AActor.view3D };
        }

        if (mode === 'add') {
            window.graph.addData(data.nodes, data.links);
        } else {
            window.graph.setData(data.nodes, data.links);
        }
        window.graph.showLinks();
    }
}

