/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

import {
    AMainWindow,
    AText,
    AActivity,
    ASwimlane,
    AFlowCondition,
    AScenario,
    AUsecase,
    AObject,
    AUserActivity
} from './index.js';

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



    static getDetail(node) {
        $.ajax({
            url: node.expandLink,
            success: (results) => {
                AWorkFlow.showDetail(results);
            }
        });
    }

    static handle(results, event, config) {
        if (!config || !config.mode) {
            config = {mode: "new"}
        }
        // The name is the same as the id on workflows.
        // It needs to be set.
        results.id = results.name;
        AWorkFlow.viewDeep3D(results, config);
        AWorkFlow.showDetail(results);
        AMainWindow.currentView = "workflow";
        AWorkFlow._simulationForm(results);

        window.graph.toolbar.setToolBar([
            {
                type: 'button', id: 'fit', text: 'Show All', img: 'w2ui-icon-zoom',
                onClick: (event) => {
                    window.graph.graph.zoomToFit(1000);
                }
            },
            {
                type: 'button', id: 'explode', text: 'Explode', img: 'w2ui-icon-search', onClick: (event) => {
                    AWorkFlow.viewDeep3D(results, {mode: 'explode'});
                }
            }
        ]);
    }

    static handleList(results) {

    }
    static createList(results) {

    }
    static showListDialog(results) {
        AUserActivity.showList(results);
        w2popup.open({
            title: "User Activities",
            body: '<div id="userActivity" style="width: 100%; height: 100%;"></div>',
            style: 'padding: 15px 0px 0px 0px',
            width: 800,
            height: 800,
            showMax: true,
            onToggle: function (event) {
                $(w2ui.userActivity.box).hide();
                event.onComplete = function () {
                    $(w2ui.userActivity.box).show();
                    w2ui.userActivity.resize();
                }
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                    w2ui['UserActivityList'].refresh();
                    $('#userActivity').w2render("UserActivityList");
                    w2ui['UserActivityList'].refresh();
                }
            }
        });
    }
    static showList(results) {
        for(let i in results) {
            results[i].recid = i;
            results[i].link = `useractivity/get?id=${results.id}`;
            results[i].w2ui = {"style": `background-color: ${scolor[results[i].state.toLowerCase()]}`};
            let inputs = [];
            for(let j in results[i].inputs) {
                inputs.push(`${j}: ${results[i].inputs[j]}`);
            }
            results[i].inputs = inputs.join(',');
        }
        if(!w2ui["UserActivityList"]) {
            $().w2grid({
                name: "UserActivityList",
                columns: [
                    {field: 'id', size: "10%", resizable: true, caption: 'ID', sortable: true},
                    {field: 'state', size: "10%", resizable: true, caption: 'State', sortable: true},
                    {field: 'name', size: "20%", resizable: true, caption: 'Name', sortable: true},
                    {field: 'inputs', size: "30%", resizable: true, caption: 'Inputs', sortable: true},
                    {field: 'description', size: "30%", resizable: true, caption: 'Description', sortable: true},
                ],
                show: {
                    header: true,
                    columnHeaders: true,
                },
                onClick: (event) => {
                    let record = w2ui["UserActivityList"].records[event.recid];
                    w2popup.close();
                    AUserActivity.openInputDialog(record.id);
                }
            });
        }
        w2ui["UserActivityList"].records = results;
        return w2ui["UserActivityList"];
    }
    static openInputDialog(id) {
        $.ajax({
            url: `./useractivity/get?id=${id}`,
            success: function (results) {
                if(results.activity.inputs) {
                    for(let iname in results.activity.inputs) {
                        if(!results.inputs.hasOwnProperty(iname)) {
                            results.inputs[iname] = results.activity.inputs[iname];
                        }
                    }
                }
                AUserActivity.inputPopup(results);
            }
        });
    }

    static inputForm(activity) {
        let fields = [];
        let record = {};
        let inputs = activity.inputs;
        for(let name in inputs) {
            let input = inputs[name];
            let ivalue = inputs[name];
            if(input.type === 'date') {
                fields.push({
                    field: name,
                    type: 'date',
                    required: input.required,
                    html: {label: name}
                });
            }
            else if(input.type === "boolean") {
                fields.push({
                    field: name,
                    type: 'checkbox',
                    required: input.required,
                    html: {label: name}
                });
            }
            else if(input.size) {
                fields.push({
                    field: name,
                    type: 'textarea',
                    required: input.required,
                    html: {label: name, attr: `size="${input.size}" style="width:500px; height:${(input.size/80)*12}px"`}
                });
            } else {
                fields.push({
                    field: name,
                    type: 'textarea',
                    required: input.required,
                    html: {label: name, attr: `size="50" style="width:500px"`}
                });
            }

            if(typeof ivalue !== "object") {
                record[name] = ivalue;
            } else {
                record[name] = "";
            }
        }
        if(w2ui["UserActivityInput"]) {
            w2ui["UserActivityInput"].destroy();
        }
        $().w2form({
            name: 'UserActivityInput',
            style: 'border: 0px; background-color: transparent;',
            fields: fields,
            record: record,
            actions: {
                Save: {
                    caption: "Complete", style: "background: #aaffaa",
                    onClick(event) {
                        w2popup.close();
                        let parameters = w2ui['UserActivityInput'].record;
                        let parameterArray = [];
                        for(let pname in parameters) {
                            parameterArray.push(`${pname}=${parameters[pname]}`);
                        }
                        $.ajax({
                            url: `useractivity/complete?id=${activity.id}&${parameterArray.join("&")}`,
                            success: function (result) {
                                // w2ui['scenariolist'].scenarioinstance = result.id;
                            }
                        });
                    }
                },
                custom: {
                    caption: "Close", style: 'background: pink;',
                    onClick(event) {
                        w2popup.close();
                    }
                }
            }
        });
        return w2ui['UserActivityInput'];
    }
    static inputPopup(activity) {
        let myForm = AUserActivity.inputForm(activity);

        $().w2popup('open', {
            title: 'User Activity Inputs',
            body: '<div id="UserActivityInputPopup" style="width: 100%; height: 100%;"></div>',
            style: 'padding: 15px 0px 0px 0px',
            width: 500,
            height: 300,
            showMax: true,
            onToggle: function (event) {
                $(w2ui.editModelDialog.box).hide();
                event.onComplete = function () {
                    $(w2ui.workflowInput.box).show();
                    w2ui.workflowInput.resize();
                }
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler,
                    // which would make this code execute too early and hence not deliver.
                    $('#UserActivityInputPopup').w2render(myForm.name);
                }
            }
        });
    }
}

