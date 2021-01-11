import {AScenario, AActor} from './index.js';

export default class AUsecase {
    constructor(config) {
        this.config = config;
        console.log("AUsecase:", config);
    }
    handle(result) {
        console.log("Handle UseCase:", result);
        showGraph(result, 'new');
        let records = [];
        if (!w2ui['objlist']) {
            $('#objlist').w2grid({name: 'objlist'});
        }
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
        records.push({recid: i++, name:'actors', value:Object.keys(result.actors).length, detail:result.actors});
        records.push({recid: i++, name:'scenarios', value:Object.keys(result.scenarios).length, detail:result.scenarios});
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
        let color = node.color || "#888800";
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
        node.box = 100;
        node.expandLink =  `usecase/get?id=${node.id}`;
        return retval;
    }
    static viewDeep3D(obj) {

    }
}

function showGraph(usecase, mode) {
    let data = {nodes:{}, links:{}};
    const theta = 3.14/2;

    window.graph.clearObjects();

    let node = { id: usecase.id, name: usecase.name, x: 0, y: 0, z: 0 };
    let ucObj3D = AUsecase.view3D(node, '');
    ucObj3D.aid = usecase.id;
    window.graph.addObject(ucObj3D);
    let i = 0;
    for(let j in usecase.scenarios) {
        let scenario = usecase.scenarios[j];
        let node = { id: j, name: scenario.name, x: i*100, y: 0, z: -200 };
        let sobj = AScenario.view3D(node, '');
        sobj.aid = j;
        window.graph.addObject(sobj);
        for(let actor in scenario.actors) {
            let aname = actor.replace(/\s/g, '').toLowerCase();
            window.graph.addLink({source: aname, target: j, color:'gray'});
        }
        i++;
    }
    i = 0;
    for(let actor in usecase.actors) {
        let aname = actor.replace(/\s/g, '').toLowerCase();
        let node = {id: aname, name: actor, x: i*100, y: 0, z: -200, rotation: {x:0,y:theta,z:0} };
        let aobj = AActor.view3D(node, '');
        aobj.aid = aname;
        window.graph.addObject(aobj);
        i++;
    }

    if (mode === 'add') {
        window.graph.addData(data.nodes, data.links);
    } else {
        window.graph.setData(data.nodes, data.links);
    }
    window.graph.showLinks();
}
