import {AObject} from './index.js';

export default class A3DGraph {
    constructor(config) {
        this.config = config;
        this.config.toolbar.graphObj = this;
        this.defaultToolbarItems = [];
        for(let i in this.config.toolbar.items) {
            this.defaultToolbarItems.push(this.config.toolbar.items[i]);
        }
    }

    setToolBar(tools) {
        let itemsToRemove = [];
        let toolmap = {};
        for(let i in this.defaultToolbarItems) {
            toolmap[this.defaultToolbarItems[i].id] = this.defaultToolbarItems[i];
        }
        for(let i in tools) {
            toolmap[tools[i].id] = tools[i];
        }
        for(let i in this.config.toolbar.items) {
            itemsToRemove.push(this.config.toolbar.items[i].id);
        }
        for(let i in itemsToRemove) {
            this.config.toolbar.remove(itemsToRemove[i]);
        }
        for(let i in toolmap) {
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
}

