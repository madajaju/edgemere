import {
    AObject,
    AText,
    AActor,
    AScenario,
    AUsecase,
    APackage,
    AModel,
    AStack,
    AService,
    AEnvironment,
    AImage,
    AComponent,
    ASelectedHUD,
    AEventHUD,
    AWorkFlow,
    AFlowCondition,
    AActivity
} from './index.js';

export default class A3DGraph {
    constructor(config) {
        this.config = config;
        this.config.toolbar.graphObj = this;
        this.defaultToolbarItems = [];
        for (let i in this.config.toolbar.items) {
            this.defaultToolbarItems.push(this.config.toolbar.items[i]);
        }
    }

    setToolBar(tools) {
        let itemsToRemove = [];
        let toolmap = {};
        for (let i in this.defaultToolbarItems) {
            toolmap[this.defaultToolbarItems[i].id] = this.defaultToolbarItems[i];
        }
        for (let i in tools) {
            toolmap[tools[i].id] = tools[i];
        }
        for (let i in this.config.toolbar.items) {
            itemsToRemove.push(this.config.toolbar.items[i].id);
        }
        for (let i in itemsToRemove) {
            this.config.toolbar.remove(itemsToRemove[i]);
        }
        for (let i in toolmap) {
            this.config.toolbar.add(toolmap[i]);
        }
        this.config.toolbar.refresh();
    }

    static addObjectToGraph(result) {
        let retval = {records: {}, columns: result.columns};
        retval.records[result.record._id] = result.record;
        AObject.processObjectsForGraph(retval, 'add');
        // Select the item in the Graph and centralize on it.
        window.graph.selectNodeByID(result.record._id);
    }

    static openingScene() {
        let data = {nodes: {}, links: []};
        /* Use Case View */
        let node = {
            id: "UseCaseView",
            name: "UseCase View",
            view: APackage.view3D,
            expandView: A3DGraph.usecaseView,
            expandLink: `nolink`,
            color: "#666600",
            opacity: 0.75,
            fx: 0,
            fy: 0,
            fz: 300,
            cube: {x: 400, y: 400, z: 100}
        };
        data.nodes[node.id] = node;
        let nodeuc = {
            id: "UseCase",
            name: "UseCase",
            view: AUsecase.view3D,
            expandView: A3DGraph.usecaseView,
            expandLink: `nolink`,
            fx: -100,
            fy: 0,
            fz: 360,
            opacity: 1.0
        };
        data.nodes[nodeuc.id] = nodeuc;
        let nodea = {
            id: "Actor",
            name: "Actor",
            view: AActor.view3D,
            expandView: AActor.handle,
            expandLink: `actor/list`,
            fx: 100,
            fy: 0,
            fz: 360,
            opacity: 1.0
        };
        data.nodes[nodea.id] = nodea;

        let nodesc = {
            id: "Scenario",
            name: "Scenario",
            view: AScenario.view3D,
            expandView: A3DGraph.usecaseView,
            expandLink: `nolink`,
            fx: 0,
            fy: -100,
            fz: 360,
            opacity: 1.0
        };
        data.nodes[nodesc.id] = nodesc;
        /* Logical View */
        let nodel = {
            id: "LogicalView",
            name: "Logical View",
            view: APackage.view3D,
            expandView: A3DGraph.logicalView,
            expandLink: `nolink`,
            color: "#0000ff",
            fx: -300,
            fy: 300,
            fz: 0,
            opacity: 0.70,
            cube: {x: 400, y: 400, z: 100}
        };
        data.nodes[nodel.id] = nodel;
        let nodelp = {
            id: "Package",
            name: "Package",
            view: APackage.view3D,
            expandView: A3DGraph.logicalView,
            expandLink: 'nolink',
            fx: -400,
            fy: 200,
            fz: 50,
            cube: {x: 100, y: 200, z: 50}
        };
        data.nodes[nodelp.id] = nodelp;
        let nodelc = {
            id: "Class",
            name: "Class",
            view: AModel.view3D,
            expandView: A3DGraph.logicalView,
            expandLink: `nolink`,
            fx: -250,
            fy: 200,
            fz: 50,
        };
        data.nodes[nodelc.id] = nodelc;

        /* Process View */
        let nodep = {
            id: "ProcessView",
            name: "Process View",
            view: APackage.view3D,
            expandView: A3DGraph.processView,
            expandLink: `nolink`,
            color: "#008844",
            fx: 300,
            fy: -300,
            fz: 0,
            cube: {x: 400, y: 400, z: 100}
        };
        data.nodes[nodep.id] = nodep;
        data.nodes['workflow'] = {
            id: "workflow",
            name: "Workflow Process",
            fx: 400,
            fy: -400,
            fz: 50,
            view: AWorkFlow.view3D
        }
        data.nodes['flowcond'] = {
            id: "flowcond",
            name: "Conditional",
            fx: 400,
            fy: -250,
            fz: 50,
            view: AFlowCondition.view3D
        }
        data.nodes['activity'] = {
            id: "activity",
            name: "Activity",
            fx: 250,
            fy: -400,
            fz: 50,
            view: AActivity.view3D
        }
        /* Implementation View */
        let nodei = {
            id: "ImplementationView",
            name: "Implementation View",
            view: APackage.view3D,
            expandView: A3DGraph.implementationView,
            expandLink: `nolink`,
            color: "#662288",
            fx: 300,
            fy: 300,
            fz: 0,
            cube: {x: 400, y: 400, z: 100}
        };
        data.nodes[nodei.id] = nodei;

        let nodeic = {
            id: "Component",
            name: "Component",
            view: AComponent.view3D,
            expandView: A3DGraph.implementationView,
            expandLink: `nolink`,
            fx: 400,
            fy: 300,
            fz: 70,
        };
        data.nodes[nodeic.id] = nodeic;

        let nodeii = {
            id: "Image",
            name: "Image",
            view: AImage.view3D,
            expandView: A3DGraph.implementationView,
            expandLink: `nolink`,
            fx: 200,
            fy: 300,
            fz: 80,
        };
        data.nodes[nodeii.id] = nodeii;

        /* Deployment View */
        let noded = {
            id: "DeploymentView",
            name: "Deployment View",
            view: APackage.view3D,
            expandView: A3DGraph.deploymentView,
            expandLink: `nolink`,
            color: "#882200",
            fx: -300,
            fy: -300,
            fz: 0,
            cube: {x: 400, y: 400, z: 100}
        };
        data.nodes[noded.id] = noded;

        let nodedst = {
            id: "Stack",
            name: "Stack",
            view: AStack.view3D,
            expandView: A3DGraph.deploymentView,
            expandLink: `nolink`,
            opacity: 1,
            fx: -400,
            fy: -300,
            fz: 50,
        };
        data.nodes[nodedst.id] = nodedst;

        let nodeds = {
            id: "Service",
            name: "Env.Stack.Service",
            view: AService.view3D,
            expandView: A3DGraph.deploymentView,
            expandLink: `nolink`,
            opacity: 1,
            fx: -300,
            fy: -300,
            fz: 50,
        };
        data.nodes[nodeds.id] = nodeds;

        let nodede = {
            id: "Environment",
            name: "Environment",
            view: AEnvironment.view3D,
            expandView: A3DGraph.deploymentView,
            expandLink: `nolink`,
            opacity: 1,
            fx: -300,
            fy: -400,
            fz: 50,
        };
        data.nodes[nodede.id] = nodede;
        ASelectedHUD.update('UML', [
            {name: "Use Case View", value: 'UseCases, Scenarios'},
            {name: "Logical View", value: 'Packages, Models'},
            {name: "Implementation View", value: 'Images, Components'},
            {name: "Deployment View", value: 'Stacks, Services'},
            {name: "Process View", value: 'States, Activities'},
        ]);
        return data;
    }

    static logicalView() {
        window.graph.toolbar.setToolBar();
        $.ajax({
            url: 'package/list',
            success: APackage.handleList,
            error: function (req, text, err) {
                console.log(text);
            }
        });
    }

    static processView() {
        $.ajax({
            url: 'workflow/list',
            success: (results) => {
                AWorkFlow.handleList(results);
            },
            error: function (req, text, err) {
                console.log(text);
            }
        })
    }

    static deploymentView() {
        //  window.graph.toolbar.setToolBar();
        $.ajax({
            url: 'env/list',
            success: (results) => {
                AEnvironment.handleList(results);
            },
            error: function (req, text, err) {
                console.log(text);
            }
        })
    }

    static implementationView() {
        // window.graph.toolbar.setToolBar();
        $.ajax({
            url: 'implementation/thirdparty',
            success: AComponent.handle,
            error: function (req, text, err) {
                console.log(text);
            }
        })
    }

    static usecaseView() {
        // window.graph.toolbar.setToolBar();
        $.ajax({
            url: 'usecase/list',
            success: AUsecase.handleList,
            error: function (req, text, err) {
                console.log(text);
            }
        })
    }
    static hudDepth(depth) {
        ASelectedHUD.dist += depth;
        ASelectedHUD.sync();
        AEventHUD.dist += depth;
        AEventHUD.sync();
        console.log(AEventHUD.dist);
    }
}

