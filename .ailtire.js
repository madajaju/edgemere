module.exports = {
    "host": "http://localhost:3000", "actions": {
        "/aml/aimodel/create": {
            "name": "/aml/aimodel/create",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "create",
            "description": "Description of the action"
        },
        "/aml/aimodel/deploy": {
            "name": "/aml/aimodel/deploy",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "deploy",
            "description": "Description of the action"
        },
        "/aml/aimodel/destroy": {
            "name": "/aml/aimodel/destroy",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "destroy",
            "description": "Description of the action"
        },
        "/aml/aimodel/list": {
            "name": "/aml/aimodel/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/aml/aimodel/update": {
            "name": "/aml/aimodel/update",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "update",
            "description": "Description of the action"
        },
        "/aml/application/create": {
            "name": "/aml/application/create",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "create",
            "description": "Description of the action"
        },
        "/aml/application/deploy": {
            "name": "/aml/application/deploy",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "deploy",
            "description": "Description of the action"
        },
        "/aml/application/destroy": {
            "name": "/aml/application/destroy",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "destroy",
            "description": "Description of the action"
        },
        "/aml/application/list": {
            "name": "/aml/application/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/aml/application/monitor": {
            "name": "/aml/application/monitor",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "monitor",
            "description": "Description of the action"
        },
        "/aml/application/update": {
            "name": "/aml/application/update",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "update",
            "description": "Description of the action"
        },
        "/aml/workload/create": {
            "name": "/aml/workload/create",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "create",
            "description": "Description of the action"
        },
        "/aml/workload/deploy": {
            "name": "/aml/workload/deploy",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "deploy",
            "description": "Description of the action"
        },
        "/aml/workload/destroy": {
            "name": "/aml/workload/destroy",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "destroy",
            "description": "Description of the action"
        },
        "/aml/workload/list": {
            "name": "/aml/workload/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/aml/workload/monitor": {
            "name": "/aml/workload/monitor",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "monitor",
            "description": "Description of the action"
        },
        "/aml/workload/update": {
            "name": "/aml/workload/update",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "update",
            "description": "Description of the action"
        },
        "/cpl/adddevices": {
            "name": "/cpl/adddevices",
            "inputs": {
                "item": {
                    "description": "Devices to add to the Data Center",
                    "type": "object",
                    "required": true
                }
            },
            "friendlyName": "addDevices",
            "description": "Add Devices to the Data Center"
        },
        "/cpl/provision": {
            "name": "/cpl/provision",
            "inputs": {"resource": {"description": "Resource to provision", "type": "object", "required": true}},
            "friendlyName": "provision",
            "description": "Provision the resources on the devices"
        },
        "/cpl/reserve": {
            "name": "/cpl/reserve",
            "inputs": {"request": {"description": "Request for the reservation", "type": "object", "required": true}},
            "friendlyName": "reserve",
            "description": "Get Reservations from Devices, Aggregate Deivces, and DataCenters"
        },
        "/cpl/data/govern": {
            "name": "/cpl/data/govern",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "govern",
            "description": "Description of the action"
        },
        "/cpl/data/source": {
            "name": "/cpl/data/source",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "source",
            "description": "Description of the action"
        },
        "/cpl/datacenter/create": {
            "name": "/cpl/datacenter/create",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "create",
            "description": "Description of the action"
        },
        "/cpl/datacenter/disable": {
            "name": "/cpl/datacenter/disable",
            "inputs": {
                "name": {"description": "Name of the device", "type": "string", "required": false},
                "id": {"description": "ID of the device", "type": "string", "required": false}
            },
            "friendlyName": "disable",
            "description": "Disable Device and all of its hardware"
        },
        "/cpl/datacenter/enable": {
            "name": "/cpl/datacenter/enable",
            "inputs": {
                "name": {"description": "Name of the device", "type": "string", "required": false},
                "id": {"description": "ID of the device", "type": "string", "required": false}
            },
            "friendlyName": "enable",
            "description": "Enable Device and all of its hardware"
        },
        "/cpl/datacenter/list": {
            "name": "/cpl/datacenter/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/cpl/datacenter/remove": {
            "name": "/cpl/datacenter/remove",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "remove",
            "description": "Description of the action"
        },
        "/cpl/datacenter/update": {
            "name": "/cpl/datacenter/update",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "update",
            "description": "Description of the action"
        },
        "/cpl/device/disable": {
            "name": "/cpl/device/disable",
            "inputs": {
                "name": {"description": "Name of the device", "type": "string", "required": false},
                "id": {"description": "ID of the device", "type": "string", "required": false}
            },
            "friendlyName": "disable",
            "description": "Disable Device and all of its hardware"
        },
        "/cpl/device/enable": {
            "name": "/cpl/device/enable",
            "inputs": {
                "name": {"description": "Name of the device", "type": "string", "required": false},
                "id": {"description": "ID of the device", "type": "string", "required": false}
            },
            "friendlyName": "enable",
            "description": "Enable Device and all of its hardware"
        },
        "/diml/cds/data/list": {
            "name": "/diml/cds/data/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/cds/data/source/name": {
            "name": "/diml/cds/data/source/name",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "name",
            "description": "Description of the action"
        },
        "/diml/ddf/data/govern": {
            "name": "/diml/ddf/data/govern",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "govern",
            "description": "Description of the action"
        },
        "/diml/ddf/data/source/name": {
            "name": "/diml/ddf/data/source/name",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "name",
            "description": "Description of the action"
        },
        "/diml/ddf/datablueprint/deploy": {
            "name": "/diml/ddf/datablueprint/deploy",
            "inputs": {
                "name": {"description": "Name instance of the blueprint", "type": "string", "required": true},
                "blueprint": {"description": "Name of the blueprint", "type": "string", "required": true},
                "file": {
                    "description": "File of with the parameters for the deployment",
                    "type": "YAML",
                    "required": false
                },
                "sources": {
                    "description": "Names and values of the sources for the blueprint",
                    "type": "string",
                    "required": false
                }
            },
            "friendlyName": "deploy",
            "description": "Description of the action"
        },
        "/diml/ddf/datablueprint/list": {
            "name": "/diml/ddf/datablueprint/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/ddf/datacatalog/list": {
            "name": "/diml/ddf/datacatalog/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/ddf/datadaptor/list": {
            "name": "/diml/ddf/datadaptor/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/ddf/datapipeline/list": {
            "name": "/diml/ddf/datapipeline/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/ddf/dataprocedure/list": {
            "name": "/diml/ddf/dataprocedure/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/ddf/datasource/simulate": {
            "name": "/diml/ddf/datasource/simulate",
            "inputs": {
                "name": {
                    "description": "Name of the DataSource to simulate",
                    "type": "string",
                    "required": true
                }, "file": {"description": "file that contains the data to simulate", "type": "YAML", "required": true}
            },
            "friendlyName": "simulate",
            "description": "Simulate data in the data source"
        },
        "/diml/ddf/metadata/list": {
            "name": "/diml/ddf/metadata/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/dml/do/reserve": {
            "name": "/diml/dml/do/reserve",
            "inputs": {
                "datarequest": {
                    "description": "This is the data request to get the data reservations",
                    "type": "json",
                    "required": false
                }
            },
            "friendlyName": "reserve",
            "description": "Reserve a Data Instances from a Data Request"
        },
        "/diml/dml/do/datainstance/create": {
            "name": "/diml/dml/do/datainstance/create",
            "inputs": {
                "dataref": {
                    "description": "This is a Data Reference that should be turned into a Data Instance",
                    "type": "json",
                    "required": false
                }
            },
            "friendlyName": "create",
            "description": "Create a Data Instance from a Data Reference"
        },
        "/diml/dml/do/datainstance/destroy": {
            "name": "/diml/dml/do/datainstance/destroy",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "destroy",
            "description": "Description of the action"
        },
        "/diml/dml/do/datainstance/find": {
            "name": "/diml/dml/do/datainstance/find",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "find",
            "description": "Description of the action"
        },
        "/diml/dml/do/datainstance/list": {
            "name": "/diml/dml/do/datainstance/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/dml/data/govern": {
            "name": "/diml/dml/data/govern",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "govern",
            "description": "Description of the action"
        },
        "/diml/dml/data/source/name": {
            "name": "/diml/dml/data/source/name",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "name",
            "description": "Description of the action"
        },
        "/diml/dml/datapolicy/list": {
            "name": "/diml/dml/datapolicy/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/dml/datasource/list": {
            "name": "/diml/dml/datasource/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/diml/dml/datastrategy/list": {
            "name": "/diml/dml/datastrategy/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/cb/billing/list": {
            "name": "/sml/cb/billing/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/cb/data/govern": {
            "name": "/sml/cb/data/govern",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "govern",
            "description": "Description of the action"
        },
        "/sml/cb/multicloud/addclouds": {
            "name": "/sml/cb/multicloud/addclouds",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "addclouds",
            "description": "Description of the action"
        },
        "/sml/cb/multicloud/addpolicies": {
            "name": "/sml/cb/multicloud/addpolicies",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "addpolicies",
            "description": "Description of the action"
        },
        "/sml/cb/multicloud/list": {
            "name": "/sml/cb/multicloud/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/cb/multicloud/mapresources": {
            "name": "/sml/cb/multicloud/mapresources",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "mapresources",
            "description": "Description of the action"
        },
        "/sml/cb/multicloud/removepolicies": {
            "name": "/sml/cb/multicloud/removepolicies",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "removepolicies",
            "description": "Description of the action"
        },
        "/sml/cb/resourceinstancetype/list": {
            "name": "/sml/cb/resourceinstancetype/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/cb/resources/find": {
            "name": "/sml/cb/resources/find",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "find",
            "description": "Description of the action"
        },
        "/sml/cb/service/mapresources": {
            "name": "/sml/cb/service/mapresources",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "mapresources",
            "description": "Description of the action"
        },
        "/sml/em/environment/addpolicies": {
            "name": "/sml/em/environment/addpolicies",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "addpolicies",
            "description": "Description of the action"
        },
        "/sml/em/environment/create": {
            "name": "/sml/em/environment/create",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "create",
            "description": "Description of the action"
        },
        "/sml/em/environment/destroy": {
            "name": "/sml/em/environment/destroy",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "destroy",
            "description": "Description of the action"
        },
        "/sml/em/environment/disable": {
            "name": "/sml/em/environment/disable",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "disable",
            "description": "Description of the action"
        },
        "/sml/em/environment/enable": {
            "name": "/sml/em/environment/enable",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "enable",
            "description": "Description of the action"
        },
        "/sml/em/environment/list": {
            "name": "/sml/em/environment/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/em/environment/update": {
            "name": "/sml/em/environment/update",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "update",
            "description": "Description of the action"
        },
        "/sml/cloud/list": {
            "name": "/sml/cloud/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/data/govern": {
            "name": "/sml/data/govern",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "govern",
            "description": "Description of the action"
        },
        "/sml/data/source/name": {
            "name": "/sml/data/source/name",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "name",
            "description": "Description of the action"
        },
        "/sml/environmenet/addpolicies": {
            "name": "/sml/environmenet/addpolicies",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "addpolicies",
            "description": "Description of the action"
        },
        "/sml/environment/create": {
            "name": "/sml/environment/create",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "create",
            "description": "Description of the action"
        },
        "/sml/environment/destroy": {
            "name": "/sml/environment/destroy",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "destroy",
            "description": "Description of the action"
        },
        "/sml/environment/disable": {
            "name": "/sml/environment/disable",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "disable",
            "description": "Description of the action"
        },
        "/sml/environment/enable": {
            "name": "/sml/environment/enable",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "enable",
            "description": "Description of the action"
        },
        "/sml/environment/list": {
            "name": "/sml/environment/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/environment/update": {
            "name": "/sml/environment/update",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "update",
            "description": "Description of the action"
        },
        "/sml/multicloud/addclouds": {
            "name": "/sml/multicloud/addclouds",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "addclouds",
            "description": "Description of the action"
        },
        "/sml/multicloud/addpolicies": {
            "name": "/sml/multicloud/addpolicies",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "addpolicies",
            "description": "Description of the action"
        },
        "/sml/multicloud/list": {
            "name": "/sml/multicloud/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/multicloud/removepolicies": {
            "name": "/sml/multicloud/removepolicies",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "removepolicies",
            "description": "Description of the action"
        },
        "/sml/service/list": {
            "name": "/sml/service/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/stack/list": {
            "name": "/sml/stack/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/so/servicelet/assigndata": {
            "name": "/sml/so/servicelet/assigndata",
            "inputs": {
                "servicelet": {
                    "description": "ServiceInstance to connect the Data Reference Instance",
                    "type": "ref",
                    "required": true
                },
                "dataReference": {"description": "Data Reference to get the instances", "type": "ref", "required": true}
            },
            "friendlyName": "assignData",
            "description": "Assign Data Instances from the Data Reference"
        },
        "/sml/so/stack/deploy": {
            "name": "/sml/so/stack/deploy",
            "inputs": {
                "name": {"description": "Name of the stack to deploy", "type": "string", "required": false},
                "tag": {
                    "description": "Tag of the deployment of the stack. This is used to reference the deployed stack.",
                    "type": "string",
                    "required": false
                },
                "env": {"description": "Name of the deployment environment", "type": "string", "required": false},
                "args": {"description": "Arguments passed into the stack deployment", "type": "json", "required": false}
            },
            "friendlyName": "deploy",
            "description": "Description of the action"
        },
        "/sml/so/stack/list": {
            "name": "/sml/so/stack/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sml/so/stack/uninstall": {
            "name": "/sml/so/stack/uninstall",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "uninstall",
            "description": "Description of the action"
        },
        "/sml/so/stack/update": {
            "name": "/sml/so/stack/update",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "update",
            "description": "Description of the action"
        },
        "/sml/sr/data/govern": {
            "name": "/sml/sr/data/govern",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "govern",
            "description": "Description of the action"
        },
        "/sdi/io/evaluaterequest": {
            "name": "/sdi/io/evaluaterequest",
            "inputs": {"request": {"description": "Request to evaluate", "type": "object", "required": true}},
            "friendlyName": "evaluateRequest",
            "description": "Evaluate Request against policies and select the appropriate reservations from the Common Physical Layer"
        },
        "/sdi/io/provision": {
            "name": "/sdi/io/provision",
            "inputs": {
                "obj": {
                    "description": "Reservation to use as the provision",
                    "type": "object",
                    "required": true
                }
            },
            "friendlyName": "provision",
            "description": "Provision Resources based on the reservation."
        },
        "/sdi/checkrequest": {
            "name": "/sdi/checkrequest",
            "inputs": {"request": {"description": "Cloud to request the Resources", "type": "obj", "required": true}},
            "friendlyName": "checkRequest",
            "description": "Check the status of the request"
        },
        "/sdi/reserve": {
            "name": "/sdi/reserve",
            "inputs": {
                "cloud": {"description": "Cloud to request the Resources", "type": "string", "required": true},
                "name": {"description": "The name of the reservation.", "type": "string", "required": true},
                "requirements": {
                    "description": "The Requirements to create the resource",
                    "type": "YAML",
                    "required": true
                }
            },
            "friendlyName": "reserve",
            "description": "Reserve Resources from the SDI Layer"
        },
        "/sdi/resource/get": {
            "name": "/sdi/resource/get",
            "inputs": {
                "cloud": {"description": "Cloud to request the Resources", "type": "string", "required": true},
                "name": {"description": "The name of the Resource to create.", "type": "string", "required": true},
                "requirements": {
                    "description": "The Requirements to create the resource",
                    "type": "YAML",
                    "required": true
                }
            },
            "friendlyName": "get",
            "description": "Get Resources from the SDI Layer"
        },
        "/sdi/resource/list": {
            "name": "/sdi/resource/list",
            "inputs": {"attr1": {"description": "Description for the parameter", "type": "string", "required": false}},
            "friendlyName": "list",
            "description": "Description of the action"
        },
        "/sdi/resource/release": {
            "name": "/sdi/resource/release",
            "inputs": {
                "cloud": {"description": "Cloud to request the Resources", "type": "string", "required": true},
                "name": {"description": "The name of the Resource to create.", "type": "string", "required": true}
            },
            "friendlyName": "release",
            "description": "Release Resources from the SDI Layer with the given name"
        },
        "/aimodel/new": {
            "name": "/aimodel/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/aimodel/create": {
            "name": "/aimodel/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/aimodel/list": {
            "name": "/aimodel/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/aimodel/destory": {
            "name": "/aimodel/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/aimodel": {
            "name": "/aimodel",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/aimodel/update": {
            "name": "/aimodel/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/application/new": {
            "name": "/application/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/application/create": {
            "name": "/application/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/application/list": {
            "name": "/application/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/application/destory": {
            "name": "/application/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/application/addworkloads": {
            "name": "/application/addworkloads",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addWorkloads",
            "description": "Add items to the object"
        },
        "/application/addstacks": {
            "name": "/application/addstacks",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addStacks",
            "description": "Add items to the object"
        },
        "/application/adddata": {
            "name": "/application/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/application/addinstances": {
            "name": "/application/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/application": {
            "name": "/application",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/application/update": {
            "name": "/application/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "version": {"type": "string", "description": "Version of the Application", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/applicationinstance/new": {
            "name": "/applicationinstance/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/applicationinstance/create": {
            "name": "/applicationinstance/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/applicationinstance/list": {
            "name": "/applicationinstance/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/applicationinstance/destory": {
            "name": "/applicationinstance/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/applicationinstance": {
            "name": "/applicationinstance",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/applicationinstance/update": {
            "name": "/applicationinstance/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "status": {"type": "string", "description": "Name of the application instance", "required": false},
                "message": {
                    "type": "string",
                    "description": "Last message in the application instance",
                    "required": false
                },
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/applicationtemplate/new": {
            "name": "/applicationtemplate/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/applicationtemplate/create": {
            "name": "/applicationtemplate/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/applicationtemplate/list": {
            "name": "/applicationtemplate/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/applicationtemplate/destory": {
            "name": "/applicationtemplate/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/applicationtemplate": {
            "name": "/applicationtemplate",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/applicationtemplate/update": {
            "name": "/applicationtemplate/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/workload/new": {
            "name": "/workload/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workload/create": {
            "name": "/workload/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/workload/list": {
            "name": "/workload/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workload/destory": {
            "name": "/workload/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workload": {
            "name": "/workload",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workload/update": {
            "name": "/workload/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/workloadinstance/new": {
            "name": "/workloadinstance/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workloadinstance/create": {
            "name": "/workloadinstance/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/workloadinstance/list": {
            "name": "/workloadinstance/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workloadinstance/destory": {
            "name": "/workloadinstance/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workloadinstance": {
            "name": "/workloadinstance",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workloadinstance/update": {
            "name": "/workloadinstance/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/workloadtemplate/new": {
            "name": "/workloadtemplate/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workloadtemplate/create": {
            "name": "/workloadtemplate/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/workloadtemplate/list": {
            "name": "/workloadtemplate/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workloadtemplate/destory": {
            "name": "/workloadtemplate/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workloadtemplate": {
            "name": "/workloadtemplate",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/workloadtemplate/update": {
            "name": "/workloadtemplate/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/acceleratorhardware/new": {
            "name": "/acceleratorhardware/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/acceleratorhardware/create": {
            "name": "/acceleratorhardware/create",
            "inputs": {
                "name": {"description": "name of the hardware", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "capabilities": {"description": "capabilities of the hardware", "type": "json", "required": true}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/acceleratorhardware/list": {
            "name": "/acceleratorhardware/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/acceleratorhardware/destory": {
            "name": "/acceleratorhardware/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/acceleratorhardware/addresources": {
            "name": "/acceleratorhardware/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/acceleratorhardware": {
            "name": "/acceleratorhardware",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/acceleratorhardware/update": {
            "name": "/acceleratorhardware/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended Name of the hardware", "required": false},
                "profile": {"type": "object", "required": false},
                "device": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/aggregateddevice/new": {
            "name": "/aggregateddevice/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/aggregateddevice/create": {
            "name": "/aggregateddevice/create",
            "inputs": {
                "name": {"description": "name of the device", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/aggregateddevice/list": {
            "name": "/aggregateddevice/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/aggregateddevice/destory": {
            "name": "/aggregateddevice/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/aggregateddevice/adddevices": {
            "name": "/aggregateddevice/adddevices",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addDevices",
            "description": "Add items to the object"
        },
        "/aggregateddevice/addhardware": {
            "name": "/aggregateddevice/addhardware",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addHardware",
            "description": "Add items to the object"
        },
        "/aggregateddevice": {
            "name": "/aggregateddevice",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/aggregateddevice/update": {
            "name": "/aggregateddevice/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended name of the aggregated device", "required": false},
                "type": {"type": "string", "description": "Type of the Device", "required": false},
                "profile": {"type": "object", "required": false},
                "datacenter": {"type": "object", "required": false},
                "parent": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/computehardware/new": {
            "name": "/computehardware/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/computehardware/create": {
            "name": "/computehardware/create",
            "inputs": {
                "name": {"description": "name of the hardware", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "capabilities": {"description": "capabilities of the hardware", "type": "json", "required": true}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/computehardware/list": {
            "name": "/computehardware/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/computehardware/destory": {
            "name": "/computehardware/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/computehardware/addresources": {
            "name": "/computehardware/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/computehardware": {
            "name": "/computehardware",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/computehardware/update": {
            "name": "/computehardware/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended Name of the hardware", "required": false},
                "profile": {"type": "object", "required": false},
                "device": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datacenter/new": {
            "name": "/datacenter/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datacenter/create": {
            "name": "/datacenter/create",
            "inputs": {
                "name": {"description": "name of the DataCenter", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/datacenter/list": {
            "name": "/datacenter/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datacenter/destory": {
            "name": "/datacenter/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datacenter/adddevices": {
            "name": "/datacenter/adddevices",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addDevices",
            "description": "Add items to the object"
        },
        "/datacenter/addadevices": {
            "name": "/datacenter/addadevices",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addAdevices",
            "description": "Add items to the object"
        },
        "/datacenter": {
            "name": "/datacenter",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datacenter/update": {
            "name": "/datacenter/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "profile": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/device/new": {
            "name": "/device/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/device/create": {
            "name": "/device/create",
            "inputs": {
                "name": {"description": "name of the device", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/device/list": {
            "name": "/device/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/device/destory": {
            "name": "/device/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/device/addhardware": {
            "name": "/device/addhardware",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addHardware",
            "description": "Add items to the object"
        },
        "/device": {
            "name": "/device",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/device/update": {
            "name": "/device/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended Name of the device", "required": false},
                "type": {"type": "string", "description": "Type of the Device", "required": false},
                "profile": {"type": "object", "required": false},
                "datacenter": {"type": "object", "required": false},
                "parent": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/hardware/new": {
            "name": "/hardware/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/hardware/create": {
            "name": "/hardware/create",
            "inputs": {
                "name": {"description": "name of the hardware", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "capabilities": {"description": "capabilities of the hardware", "type": "json", "required": true}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/hardware/list": {
            "name": "/hardware/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/hardware/destory": {
            "name": "/hardware/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/hardware/addresources": {
            "name": "/hardware/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/hardware": {
            "name": "/hardware",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/hardware/update": {
            "name": "/hardware/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended Name of the hardware", "required": false},
                "profile": {"type": "object", "required": false},
                "device": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/metric/new": {
            "name": "/metric/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metric/create": {
            "name": "/metric/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/metric/list": {
            "name": "/metric/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metric/destory": {
            "name": "/metric/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metric": {
            "name": "/metric",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metric/update": {
            "name": "/metric/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "value": {"type": "string", "description": "This is the value of the metric", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/metricattribute/new": {
            "name": "/metricattribute/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metricattribute/create": {
            "name": "/metricattribute/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/metricattribute/list": {
            "name": "/metricattribute/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metricattribute/destory": {
            "name": "/metricattribute/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metricattribute": {
            "name": "/metricattribute",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metricattribute/update": {
            "name": "/metricattribute/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "value": {"type": "string", "description": "This is the value of the metric", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/metriccomposite/new": {
            "name": "/metriccomposite/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metriccomposite/create": {
            "name": "/metriccomposite/create",
            "inputs": {
                "name": {"description": "Name of the composite metric", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "value": {"description": "Values to add to the metric", "type": "object", "required": true}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/metriccomposite/list": {
            "name": "/metriccomposite/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metriccomposite/destory": {
            "name": "/metriccomposite/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metriccomposite/addvalues": {
            "name": "/metriccomposite/addvalues",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addValues",
            "description": "Add items to the object"
        },
        "/metriccomposite": {
            "name": "/metriccomposite",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metriccomposite/update": {
            "name": "/metriccomposite/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "value": {"type": "string", "description": "This is the value of the metric", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/metricconsumeable/new": {
            "name": "/metricconsumeable/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metricconsumeable/create": {
            "name": "/metricconsumeable/create",
            "inputs": {
                "name": {"description": "Name of the metric", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "value": {"description": "Value of the metric", "type": "string", "required": true}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/metricconsumeable/list": {
            "name": "/metricconsumeable/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metricconsumeable/destory": {
            "name": "/metricconsumeable/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metricconsumeable": {
            "name": "/metricconsumeable",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metricconsumeable/update": {
            "name": "/metricconsumeable/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "value": {"type": "string", "description": "This is the value of the metric", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/networkhardware/new": {
            "name": "/networkhardware/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/networkhardware/create": {
            "name": "/networkhardware/create",
            "inputs": {
                "name": {"description": "name of the hardware", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "capabilities": {"description": "capabilities of the hardware", "type": "json", "required": true}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/networkhardware/list": {
            "name": "/networkhardware/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/networkhardware/destory": {
            "name": "/networkhardware/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/networkhardware/addresources": {
            "name": "/networkhardware/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/networkhardware": {
            "name": "/networkhardware",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/networkhardware/update": {
            "name": "/networkhardware/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended Name of the hardware", "required": false},
                "profile": {"type": "object", "required": false},
                "device": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/physicalprofile/new": {
            "name": "/physicalprofile/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/physicalprofile/create": {
            "name": "/physicalprofile/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "parent": {"description": "Parent to add to the current profile", "type": "object", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/physicalprofile/list": {
            "name": "/physicalprofile/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/physicalprofile/destory": {
            "name": "/physicalprofile/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/physicalprofile": {
            "name": "/physicalprofile",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/physicalprofile/update": {
            "name": "/physicalprofile/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "capabilities": {"type": "object", "description": "Capabilities of the element", "required": false},
                "available": {"type": "object", "description": "Availability of the element", "required": false},
                "reserved": {"type": "object", "description": "Reservations of the element", "required": false},
                "metrics": {"type": "object", "description": "Metrics of the element", "required": false},
                "parent": {"type": "object", "description": "Parent of the profile for propagation", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/storagehardware/new": {
            "name": "/storagehardware/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/storagehardware/create": {
            "name": "/storagehardware/create",
            "inputs": {
                "name": {"description": "name of the hardware", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "capabilities": {"description": "capabilities of the hardware", "type": "json", "required": true}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/storagehardware/list": {
            "name": "/storagehardware/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/storagehardware/destory": {
            "name": "/storagehardware/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/storagehardware/addresources": {
            "name": "/storagehardware/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/storagehardware": {
            "name": "/storagehardware",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/storagehardware/update": {
            "name": "/storagehardware/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended Name of the hardware", "required": false},
                "profile": {"type": "object", "required": false},
                "device": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/dataadaptor/new": {
            "name": "/dataadaptor/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptor/create": {
            "name": "/dataadaptor/create",
            "inputs": {
                "name": {"description": "name of the data adaptor", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/dataadaptor/list": {
            "name": "/dataadaptor/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptor/destory": {
            "name": "/dataadaptor/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptor/addsources": {
            "name": "/dataadaptor/addsources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addSources",
            "description": "Add items to the object"
        },
        "/dataadaptor": {
            "name": "/dataadaptor",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptor/update": {
            "name": "/dataadaptor/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "blueprint": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/dataadaptorinstance/new": {
            "name": "/dataadaptorinstance/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptorinstance/create": {
            "name": "/dataadaptorinstance/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/dataadaptorinstance/list": {
            "name": "/dataadaptorinstance/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptorinstance/destory": {
            "name": "/dataadaptorinstance/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptorinstance": {
            "name": "/dataadaptorinstance",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptorinstance/update": {
            "name": "/dataadaptorinstance/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/dataadaptortemplate/new": {
            "name": "/dataadaptortemplate/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptortemplate/create": {
            "name": "/dataadaptortemplate/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/dataadaptortemplate/list": {
            "name": "/dataadaptortemplate/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptortemplate/destory": {
            "name": "/dataadaptortemplate/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptortemplate": {
            "name": "/dataadaptortemplate",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataadaptortemplate/update": {
            "name": "/dataadaptortemplate/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "args": {
                    "type": "json",
                    "description": "Arguments for the data adaptor instantiation.",
                    "required": false
                },
                "adaptor": {"type": "object", "required": false},
                "blueprint": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datablueprint/new": {
            "name": "/datablueprint/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datablueprint/create": {
            "name": "/datablueprint/create",
            "inputs": {
                "name": {"description": "name of the data blue print", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/datablueprint/list": {
            "name": "/datablueprint/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datablueprint/destory": {
            "name": "/datablueprint/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datablueprint/addadaptors": {
            "name": "/datablueprint/addadaptors",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addAdaptors",
            "description": "Add items to the object"
        },
        "/datablueprint/addflows": {
            "name": "/datablueprint/addflows",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addFlows",
            "description": "Add items to the object"
        },
        "/datablueprint/addinstances": {
            "name": "/datablueprint/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/datablueprint": {
            "name": "/datablueprint",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datablueprint/update": {
            "name": "/datablueprint/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "version": {"type": "string", "description": "name of the data blue print", "required": false},
                "identity": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datablueprintinstance/new": {
            "name": "/datablueprintinstance/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datablueprintinstance/create": {
            "name": "/datablueprintinstance/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/datablueprintinstance/list": {
            "name": "/datablueprintinstance/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datablueprintinstance/destory": {
            "name": "/datablueprintinstance/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datablueprintinstance/addsources": {
            "name": "/datablueprintinstance/addsources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addSources",
            "description": "Add items to the object"
        },
        "/datablueprintinstance/addsinks": {
            "name": "/datablueprintinstance/addsinks",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addSinks",
            "description": "Add items to the object"
        },
        "/datablueprintinstance/addflows": {
            "name": "/datablueprintinstance/addflows",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addFlows",
            "description": "Add items to the object"
        },
        "/datablueprintinstance": {
            "name": "/datablueprintinstance",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datablueprintinstance/update": {
            "name": "/datablueprintinstance/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "parameters": {
                    "type": "json",
                    "description": "Parameters passed into the Instance of the Blue Print",
                    "required": false
                },
                "identity": {"type": "object", "required": false},
                "blueprint": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/dataflow/new": {
            "name": "/dataflow/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflow/create": {
            "name": "/dataflow/create",
            "inputs": {
                "name": {"description": "name of the data flow", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/dataflow/list": {
            "name": "/dataflow/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflow/destory": {
            "name": "/dataflow/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflow": {
            "name": "/dataflow",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflow/update": {
            "name": "/dataflow/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "blueprint": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/dataflowinstance/new": {
            "name": "/dataflowinstance/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflowinstance/create": {
            "name": "/dataflowinstance/create",
            "inputs": {
                "name": {"description": "name of the data flow", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "sinks": {"description": "Names of the sinks", "type": "json", "required": false},
                "sources": {"description": "Names of the sources", "type": "json", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/dataflowinstance/list": {
            "name": "/dataflowinstance/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflowinstance/destory": {
            "name": "/dataflowinstance/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflowinstance/addsinks": {
            "name": "/dataflowinstance/addsinks",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addSinks",
            "description": "Add items to the object"
        },
        "/dataflowinstance/addsources": {
            "name": "/dataflowinstance/addsources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addSources",
            "description": "Add items to the object"
        },
        "/dataflowinstance": {
            "name": "/dataflowinstance",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflowinstance/update": {
            "name": "/dataflowinstance/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "blueprint": {"type": "object", "required": false},
                "dataflow": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/dataflowtemplate/new": {
            "name": "/dataflowtemplate/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflowtemplate/create": {
            "name": "/dataflowtemplate/create",
            "inputs": {
                "name": {"description": "name of the data flow template", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "sinks": {"description": "Names of the sinks", "type": "json", "required": false},
                "sources": {"description": "Names of the sources", "type": "json", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/dataflowtemplate/list": {
            "name": "/dataflowtemplate/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflowtemplate/destory": {
            "name": "/dataflowtemplate/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflowtemplate/addsources": {
            "name": "/dataflowtemplate/addsources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addSources",
            "description": "Add items to the object"
        },
        "/dataflowtemplate/addsinks": {
            "name": "/dataflowtemplate/addsinks",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addSinks",
            "description": "Add items to the object"
        },
        "/dataflowtemplate": {
            "name": "/dataflowtemplate",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataflowtemplate/update": {
            "name": "/dataflowtemplate/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "flow": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datapipeline/new": {
            "name": "/datapipeline/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datapipeline/create": {
            "name": "/datapipeline/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/datapipeline/list": {
            "name": "/datapipeline/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datapipeline/destory": {
            "name": "/datapipeline/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datapipeline/addprocedures": {
            "name": "/datapipeline/addprocedures",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addProcedures",
            "description": "Add items to the object"
        },
        "/datapipeline/addflows": {
            "name": "/datapipeline/addflows",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addFlows",
            "description": "Add items to the object"
        },
        "/datapipeline": {
            "name": "/datapipeline",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datapipeline/update": {
            "name": "/datapipeline/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/dataprocedure/new": {
            "name": "/dataprocedure/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataprocedure/create": {
            "name": "/dataprocedure/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/dataprocedure/list": {
            "name": "/dataprocedure/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataprocedure/destory": {
            "name": "/dataprocedure/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataprocedure": {
            "name": "/dataprocedure",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/dataprocedure/update": {
            "name": "/dataprocedure/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "pipeline": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datasource/new": {
            "name": "/datasource/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datasource/create": {
            "name": "/datasource/create",
            "inputs": {
                "name": {"description": "name of the data source", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "adaptor": {"description": "Adaptor for the data source", "type": "ref", "required": true},
                "parameters": {
                    "description": "parameters comma separated name=value,vname2=value2",
                    "type": "string",
                    "required": false
                }
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/datasource/list": {
            "name": "/datasource/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datasource/destory": {
            "name": "/datasource/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datasource/addblueprints": {
            "name": "/datasource/addblueprints",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addBlueprints",
            "description": "Add items to the object"
        },
        "/datasource/adddata": {
            "name": "/datasource/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/datasource": {
            "name": "/datasource",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datasource/update": {
            "name": "/datasource/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "parameters": {"type": "json", "description": "Parameters for the DataSource", "required": false},
                "adaptor": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datainstance/new": {
            "name": "/datainstance/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datainstance/create": {
            "name": "/datainstance/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/datainstance/list": {
            "name": "/datainstance/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datainstance/destory": {
            "name": "/datainstance/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datainstance/adddata": {
            "name": "/datainstance/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/datainstance": {
            "name": "/datainstance",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datainstance/update": {
            "name": "/datainstance/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "reference": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datarequest/new": {
            "name": "/datarequest/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datarequest/create": {
            "name": "/datarequest/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/datarequest/list": {
            "name": "/datarequest/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datarequest/destory": {
            "name": "/datarequest/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datarequest/addreservations": {
            "name": "/datarequest/addreservations",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addReservations",
            "description": "Add items to the object"
        },
        "/datarequest/addinstances": {
            "name": "/datarequest/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/datarequest": {
            "name": "/datarequest",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datarequest/update": {
            "name": "/datarequest/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {
                    "type": "string",
                    "description": "Extended Name of the Request being made. It Contains any parent request",
                    "required": false
                },
                "message": {"type": "string", "description": "Last message about the data request", "required": false},
                "dataReference": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datareservation/new": {
            "name": "/datareservation/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datareservation/create": {
            "name": "/datareservation/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/datareservation/list": {
            "name": "/datareservation/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datareservation/destory": {
            "name": "/datareservation/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datareservation": {
            "name": "/datareservation",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datareservation/update": {
            "name": "/datareservation/update",
            "inputs": {
                "cost": {"type": "number", "description": "Cost of using the data", "required": false},
                "data": {"type": "object", "required": false},
                "source": {"type": "object", "required": false},
                "request": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/data/new": {
            "name": "/data/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/data/create": {
            "name": "/data/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/data/list": {
            "name": "/data/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/data/destory": {
            "name": "/data/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/data/addinstances": {
            "name": "/data/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/data/addlineage": {
            "name": "/data/addlineage",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addLineage",
            "description": "Add items to the object"
        },
        "/data/addmetadata": {
            "name": "/data/addmetadata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addMetadata",
            "description": "Add items to the object"
        },
        "/data/addconnection": {
            "name": "/data/addconnection",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addConnection",
            "description": "Add items to the object"
        },
        "/data": {"name": "/data", "inputs": {}, "friendlyName": "new", "description": "New called for web interface"},
        "/data/update": {
            "name": "/data/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "access": {
                    "type": "string",
                    "description": "* access: string - A string that represents how to access the data. This could be a database connection string, file\nsystem path, etc",
                    "required": false
                },
                "source": {
                    "type": "object",
                    "description": "This is the DataSource that owns the data",
                    "required": false
                },
                "adaptor": {
                    "type": "object",
                    "description": "This is the DataAdaptor for the Data, it shows how to connect to the data",
                    "required": false
                },
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datareference/new": {
            "name": "/datareference/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datareference/create": {
            "name": "/datareference/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/datareference/list": {
            "name": "/datareference/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datareference/destory": {
            "name": "/datareference/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datareference/addinstances": {
            "name": "/datareference/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/datareference": {
            "name": "/datareference",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datareference/update": {
            "name": "/datareference/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "shortName": {"type": "string", "description": "Short Name of the Data Reference", "required": false},
                "query": {
                    "type": "json",
                    "description": "JSON structure for finding the data in the data manager",
                    "required": false
                },
                "connection": {
                    "type": "string",
                    "description": "Connection string for the Data Reference",
                    "required": false
                },
                "parent": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/datastrategy/new": {
            "name": "/datastrategy/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datastrategy/create": {
            "name": "/datastrategy/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/datastrategy/list": {
            "name": "/datastrategy/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datastrategy/destory": {
            "name": "/datastrategy/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datastrategy": {
            "name": "/datastrategy",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/datastrategy/update": {
            "name": "/datastrategy/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/lineagemetadata/new": {
            "name": "/lineagemetadata/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/lineagemetadata/create": {
            "name": "/lineagemetadata/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/lineagemetadata/list": {
            "name": "/lineagemetadata/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/lineagemetadata/destory": {
            "name": "/lineagemetadata/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/lineagemetadata/addparents": {
            "name": "/lineagemetadata/addparents",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addParents",
            "description": "Add items to the object"
        },
        "/lineagemetadata": {
            "name": "/lineagemetadata",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/lineagemetadata/update": {
            "name": "/lineagemetadata/update",
            "inputs": {
                "creationAction": {
                    "type": "string",
                    "description": "Description of the creation",
                    "required": false
                },
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "value": {"type": "string", "description": "Value of the MetaData", "required": false},
                "data": {
                    "type": "object",
                    "description": "This is a DataInstance Class that the meta-data is tied",
                    "required": false
                },
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/metadata/new": {
            "name": "/metadata/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metadata/create": {
            "name": "/metadata/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/metadata/list": {
            "name": "/metadata/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metadata/destory": {
            "name": "/metadata/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metadata": {
            "name": "/metadata",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/metadata/update": {
            "name": "/metadata/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "value": {"type": "string", "description": "Value of the MetaData", "required": false},
                "data": {
                    "type": "object",
                    "description": "This is a DataInstance Class that the meta-data is tied",
                    "required": false
                },
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/sourcemetadata/new": {
            "name": "/sourcemetadata/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/sourcemetadata/create": {
            "name": "/sourcemetadata/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/sourcemetadata/list": {
            "name": "/sourcemetadata/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/sourcemetadata/destory": {
            "name": "/sourcemetadata/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/sourcemetadata": {
            "name": "/sourcemetadata",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/sourcemetadata/update": {
            "name": "/sourcemetadata/update",
            "inputs": {
                "connection": {
                    "type": "string",
                    "description": "Connection string to connect to the DataInstance",
                    "required": false
                },
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "value": {"type": "string", "description": "Value of the MetaData", "required": false},
                "data": {
                    "type": "object",
                    "description": "This is a DataInstance Class that the meta-data is tied",
                    "required": false
                },
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/group/new": {
            "name": "/group/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/group/create": {
            "name": "/group/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/group/list": {
            "name": "/group/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/group/destory": {
            "name": "/group/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/group": {
            "name": "/group",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/group/update": {
            "name": "/group/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/identity/new": {
            "name": "/identity/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/identity/create": {
            "name": "/identity/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/identity/list": {
            "name": "/identity/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/identity/destory": {
            "name": "/identity/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/identity": {
            "name": "/identity",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/identity/update": {
            "name": "/identity/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "username": {"type": "string", "description": "UserName of the identity", "required": false},
                "password": {"type": "string", "description": "Password of the identity", "required": false},
                "cert": {"type": "string", "description": "Certificate of the identity", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/user/new": {
            "name": "/user/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/user/create": {
            "name": "/user/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/user/list": {
            "name": "/user/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/user/destory": {
            "name": "/user/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/user": {"name": "/user", "inputs": {}, "friendlyName": "new", "description": "New called for web interface"},
        "/user/update": {
            "name": "/user/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/policy/new": {
            "name": "/policy/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/policy/create": {
            "name": "/policy/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/policy/list": {
            "name": "/policy/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/policy/destory": {
            "name": "/policy/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/policy": {
            "name": "/policy",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/policy/update": {
            "name": "/policy/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "owner": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/policycollection/new": {
            "name": "/policycollection/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/policycollection/create": {
            "name": "/policycollection/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/policycollection/list": {
            "name": "/policycollection/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/policycollection/destory": {
            "name": "/policycollection/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/policycollection/addpolicies": {
            "name": "/policycollection/addpolicies",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addPolicies",
            "description": "Add items to the object"
        },
        "/policycollection": {
            "name": "/policycollection",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/policycollection/update": {
            "name": "/policycollection/update",
            "inputs": {
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/cloudtype/new": {
            "name": "/cloudtype/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/cloudtype/create": {
            "name": "/cloudtype/create",
            "inputs": {
                "name": {"description": "name of the Cloud Type", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/cloudtype/list": {
            "name": "/cloudtype/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/cloudtype/destory": {
            "name": "/cloudtype/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/cloudtype/addclouds": {
            "name": "/cloudtype/addclouds",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addClouds",
            "description": "Add items to the object"
        },
        "/cloudtype/addassetmap": {
            "name": "/cloudtype/addassetmap",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addAssetmap",
            "description": "Add items to the object"
        },
        "/cloudtype/addinstancetypes": {
            "name": "/cloudtype/addinstancetypes",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstancetypes",
            "description": "Add items to the object"
        },
        "/cloudtype/addmetricmap": {
            "name": "/cloudtype/addmetricmap",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addMetricmap",
            "description": "Add items to the object"
        },
        "/cloudtype": {
            "name": "/cloudtype",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/cloudtype/update": {
            "name": "/cloudtype/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/resourcecost/new": {
            "name": "/resourcecost/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourcecost/create": {
            "name": "/resourcecost/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/resourcecost/list": {
            "name": "/resourcecost/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourcecost/destory": {
            "name": "/resourcecost/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourcecost": {
            "name": "/resourcecost",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourcecost/update": {
            "name": "/resourcecost/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "amount": {"type": "number", "description": "Amount of the cost", "required": false},
                "units": {"type": "string", "description": "Unit of measure", "required": false},
                "parent": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/resourceinstancetype/new": {
            "name": "/resourceinstancetype/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourceinstancetype/create": {
            "name": "/resourceinstancetype/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/resourceinstancetype/list": {
            "name": "/resourceinstancetype/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourceinstancetype/destory": {
            "name": "/resourceinstancetype/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourceinstancetype/addcosts": {
            "name": "/resourceinstancetype/addcosts",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addCosts",
            "description": "Add items to the object"
        },
        "/resourceinstancetype": {
            "name": "/resourceinstancetype",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourceinstancetype/update": {
            "name": "/resourceinstancetype/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "type": {"type": "string", "description": "Type of the resource instance", "required": false},
                "profile": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/resourcemap/new": {
            "name": "/resourcemap/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourcemap/create": {
            "name": "/resourcemap/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/resourcemap/list": {
            "name": "/resourcemap/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourcemap/destory": {
            "name": "/resourcemap/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourcemap": {
            "name": "/resourcemap",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resourcemap/update": {
            "name": "/resourcemap/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "value": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/environment/new": {
            "name": "/environment/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/environment/create": {
            "name": "/environment/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/environment/list": {
            "name": "/environment/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/environment/destory": {
            "name": "/environment/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/environment/addclouds": {
            "name": "/environment/addclouds",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addClouds",
            "description": "Add items to the object"
        },
        "/environment": {
            "name": "/environment",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/environment/update": {
            "name": "/environment/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "policies": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/image/new": {
            "name": "/image/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/image/create": {
            "name": "/image/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/image/list": {
            "name": "/image/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/image/destory": {
            "name": "/image/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/image": {
            "name": "/image",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/image/update": {
            "name": "/image/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "file": {"type": "string", "description": "Physical file location of the image", "required": false},
                "version": {"type": "string", "description": "Version of the image", "required": false},
                "cloud": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/multicloud/new": {
            "name": "/multicloud/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/multicloud/create": {
            "name": "/multicloud/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/multicloud/list": {
            "name": "/multicloud/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/multicloud/destory": {
            "name": "/multicloud/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/multicloud/addclouds": {
            "name": "/multicloud/addclouds",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addClouds",
            "description": "Add items to the object"
        },
        "/multicloud": {
            "name": "/multicloud",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/multicloud/update": {
            "name": "/multicloud/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "polices": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/runscript/new": {
            "name": "/runscript/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/runscript/create": {
            "name": "/runscript/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/runscript/list": {
            "name": "/runscript/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/runscript/destory": {
            "name": "/runscript/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/runscript": {
            "name": "/runscript",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/runscript/update": {
            "name": "/runscript/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/service/new": {
            "name": "/service/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/service/create": {
            "name": "/service/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/service/list": {
            "name": "/service/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/service/destory": {
            "name": "/service/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/service/addservicelets": {
            "name": "/service/addservicelets",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addServicelets",
            "description": "Add items to the object"
        },
        "/service/addchildren": {
            "name": "/service/addchildren",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addChildren",
            "description": "Add items to the object"
        },
        "/service": {
            "name": "/service",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/service/update": {
            "name": "/service/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "version": {"type": "string", "description": "Version of the Service", "required": false},
                "ports": {"type": "json", "description": "List of ports internally", "required": false},
                "expose": {"type": "json", "description": "List of ports to expose", "required": false},
                "parameters": {
                    "type": "json",
                    "description": "[ {name: value} ] - Lsit of parameters for the service",
                    "required": false
                },
                "stack": {"type": "object", "description": "Parent Stack of the service", "required": false},
                "parent": {"type": "object", "description": "Parent of the service", "required": false},
                "policies": {"type": "object", "description": "Policies of the Service", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/servicetemplate/new": {
            "name": "/servicetemplate/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/servicetemplate/create": {
            "name": "/servicetemplate/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/servicetemplate/list": {
            "name": "/servicetemplate/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/servicetemplate/destory": {
            "name": "/servicetemplate/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/servicetemplate": {
            "name": "/servicetemplate",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/servicetemplate/update": {
            "name": "/servicetemplate/update",
            "inputs": {
                "attr1": {"type": "string", "description": "description long description", "required": false},
                "assoc1": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/servicelet/new": {
            "name": "/servicelet/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/servicelet/create": {
            "name": "/servicelet/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/servicelet/list": {
            "name": "/servicelet/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/servicelet/destory": {
            "name": "/servicelet/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/servicelet/addresources": {
            "name": "/servicelet/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/servicelet/addinstances": {
            "name": "/servicelet/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/servicelet/adddata": {
            "name": "/servicelet/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/servicelet": {
            "name": "/servicelet",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/servicelet/update": {
            "name": "/servicelet/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "args": {"type": "json", "description": "Names Argument list [ {name: value} ]", "required": false},
                "replicas": {"type": "number", "description": "Number of replicas to run", "required": false},
                "ports": {"type": "json", "description": "Port Mappings ####:####", "required": false},
                "parent": {"type": "object", "description": "Parent stacklet for the servicelet", "required": false},
                "service": {
                    "type": "object",
                    "description": "Service for the servicelet, this is what service is run. This could be a service or a stack",
                    "required": false
                },
                "env": {"type": "object", "description": "Environment for the Servicelet", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/stack/new": {
            "name": "/stack/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stack/create": {
            "name": "/stack/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/stack/list": {
            "name": "/stack/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stack/destory": {
            "name": "/stack/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stack/addstacklets": {
            "name": "/stack/addstacklets",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addStacklets",
            "description": "Add items to the object"
        },
        "/stack/addservices": {
            "name": "/stack/addservices",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addServices",
            "description": "Add items to the object"
        },
        "/stack/addinstances": {
            "name": "/stack/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/stack/adddata": {
            "name": "/stack/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/stack/addservicelets": {
            "name": "/stack/addservicelets",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addServicelets",
            "description": "Add items to the object"
        },
        "/stack/addchildren": {
            "name": "/stack/addchildren",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addChildren",
            "description": "Add items to the object"
        },
        "/stack": {
            "name": "/stack",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stack/update": {
            "name": "/stack/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "version": {"type": "string", "description": "Version of the Service", "required": false},
                "ports": {"type": "json", "description": "List of ports internally", "required": false},
                "expose": {"type": "json", "description": "List of ports to expose", "required": false},
                "parameters": {
                    "type": "json",
                    "description": "[ {name: value} ] - Lsit of parameters for the service",
                    "required": false
                },
                "policies": {"type": "object", "description": "Policy Collection", "required": false},
                "app": {"type": "object", "description": "Applications of the stacks", "required": false},
                "stack": {"type": "object", "description": "Parent Stack of the service", "required": false},
                "parent": {"type": "object", "description": "Parent of the service", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/stacktemplate/new": {
            "name": "/stacktemplate/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stacktemplate/create": {
            "name": "/stacktemplate/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/stacktemplate/list": {
            "name": "/stacktemplate/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stacktemplate/destory": {
            "name": "/stacktemplate/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stacktemplate/addstacklets": {
            "name": "/stacktemplate/addstacklets",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addStacklets",
            "description": "Add items to the object"
        },
        "/stacktemplate/addstacks": {
            "name": "/stacktemplate/addstacks",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addStacks",
            "description": "Add items to the object"
        },
        "/stacktemplate/addservices": {
            "name": "/stacktemplate/addservices",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addServices",
            "description": "Add items to the object"
        },
        "/stacktemplate/adddata": {
            "name": "/stacktemplate/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/stacktemplate": {
            "name": "/stacktemplate",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stacktemplate/update": {
            "name": "/stacktemplate/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "version": {"type": "string", "description": "Version of the stack", "required": false},
                "parameters": {
                    "type": "json",
                    "description": "Parameters of the stack [ {name:value} ]",
                    "required": false
                },
                "parent": {"type": "object", "description": "Services of the stack", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/stacklet/new": {
            "name": "/stacklet/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stacklet/create": {
            "name": "/stacklet/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/stacklet/list": {
            "name": "/stacklet/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stacklet/destory": {
            "name": "/stacklet/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stacklet/addservicelets": {
            "name": "/stacklet/addservicelets",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addServicelets",
            "description": "Add items to the object"
        },
        "/stacklet/addresources": {
            "name": "/stacklet/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/stacklet/addinstances": {
            "name": "/stacklet/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/stacklet/adddata": {
            "name": "/stacklet/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/stacklet": {
            "name": "/stacklet",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stacklet/update": {
            "name": "/stacklet/update", "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "version": {"type": "string", "description": "Name of the Stacklet", "required": false},
                "parameters": {
                    "type": "json",
                    "description": "Parameters for the stacklet [ {name:value }]",
                    "required": false
                },
                "args": {"type": "json", "description": "Names Argument list [ {name: value} ]", "required": false},
                "replicas": {"type": "number", "description": "Number of replicas to run", "required": false},
                "ports": {"type": "json", "description": "Port Mappings ####:####", "required": false},
                "stack": {"type": "object", "description": "Parent Stack for the Stacklet", "required": false},
                "parent": {"type": "object", "description": "Parent stacklet for the servicelet", "required": false},
                "service": {
                    "type": "object",
                    "description": "Service for the servicelet, this is what service is run. This could be a service or a stack",
                    "required": false
                },
                "env": {"type": "object", "description": "Environment for the Servicelet", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            }, "friendlyName": "update", "description": "Update entity"
        },
        "/stackletdefinition/new": {
            "name": "/stackletdefinition/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stackletdefinition/create": {
            "name": "/stackletdefinition/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/stackletdefinition/list": {
            "name": "/stackletdefinition/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stackletdefinition/destory": {
            "name": "/stackletdefinition/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stackletdefinition/addservicelets": {
            "name": "/stackletdefinition/addservicelets",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addServicelets",
            "description": "Add items to the object"
        },
        "/stackletdefinition/adddata": {
            "name": "/stackletdefinition/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/stackletdefinition": {
            "name": "/stackletdefinition",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stackletdefinition/update": {
            "name": "/stackletdefinition/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "version": {"type": "string", "description": "Name of the Stacklet", "required": false},
                "parameters": {
                    "type": "json",
                    "description": "Parameters for the stacklet [ {name:value }]",
                    "required": false
                },
                "stack": {"type": "object", "description": "Stack for the Stacklet", "required": false},
                "env": {"type": "object", "description": "Environment for the Stacklet", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/serviceinstance/new": {
            "name": "/serviceinstance/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/serviceinstance/create": {
            "name": "/serviceinstance/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/serviceinstance/list": {
            "name": "/serviceinstance/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/serviceinstance/destory": {
            "name": "/serviceinstance/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/serviceinstance/adddata": {
            "name": "/serviceinstance/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/serviceinstance/addresources": {
            "name": "/serviceinstance/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/serviceinstance/addrunscripts": {
            "name": "/serviceinstance/addrunscripts",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addRunScripts",
            "description": "Add items to the object"
        },
        "/serviceinstance": {
            "name": "/serviceinstance",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/serviceinstance/update": {
            "name": "/serviceinstance/update",
            "inputs": {
                "image": {"type": "object", "description": "Image of the service instance", "required": false},
                "servicelet": {
                    "type": "object",
                    "description": "Service and environment combined together that defines the service instance",
                    "required": false
                },
                "stack": {
                    "type": "object",
                    "description": "StackInstance that is running the service instance",
                    "required": false
                },
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/stackinstance/new": {
            "name": "/stackinstance/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stackinstance/create": {
            "name": "/stackinstance/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/stackinstance/list": {
            "name": "/stackinstance/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stackinstance/destory": {
            "name": "/stackinstance/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stackinstance/addservices": {
            "name": "/stackinstance/addservices",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addServices",
            "description": "Add items to the object"
        },
        "/stackinstance/adddata": {
            "name": "/stackinstance/adddata",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addData",
            "description": "Add items to the object"
        },
        "/stackinstance/addresources": {
            "name": "/stackinstance/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/stackinstance/addrunscripts": {
            "name": "/stackinstance/addrunscripts",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addRunScripts",
            "description": "Add items to the object"
        },
        "/stackinstance": {
            "name": "/stackinstance",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/stackinstance/update": {
            "name": "/stackinstance/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "app": {
                    "type": "object",
                    "description": "Application Instance of the stack instance",
                    "required": false
                },
                "stack": {"type": "object", "description": "Stack of the Stack Instance", "required": false},
                "stacklet": {"type": "object", "description": "Stacklet of the instance running", "required": false},
                "image": {"type": "object", "description": "Image of the service instance", "required": false},
                "servicelet": {
                    "type": "object",
                    "description": "Service and environment combined together that defines the service instance",
                    "required": false
                },
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/acceleratorresource/new": {
            "name": "/acceleratorresource/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/acceleratorresource/create": {
            "name": "/acceleratorresource/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/acceleratorresource/list": {
            "name": "/acceleratorresource/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/acceleratorresource/destory": {
            "name": "/acceleratorresource/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/acceleratorresource/addprofile": {
            "name": "/acceleratorresource/addprofile",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addProfile",
            "description": "Add items to the object"
        },
        "/acceleratorresource/addhardware": {
            "name": "/acceleratorresource/addhardware",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addHardware",
            "description": "Add items to the object"
        },
        "/acceleratorresource/addinstances": {
            "name": "/acceleratorresource/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/acceleratorresource": {
            "name": "/acceleratorresource",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/acceleratorresource/update": {
            "name": "/acceleratorresource/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended name of the resource", "required": false},
                "disabled": {"type": "boolean", "description": "Disabled Resource", "required": false},
                "type": {
                    "type": "string",
                    "description": "Type of resource, Network, Storage, Compute or Accelerator",
                    "required": false
                },
                "request": {"type": "object", "required": false},
                "cloud": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/cloud/new": {
            "name": "/cloud/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/cloud/create": {
            "name": "/cloud/create",
            "inputs": {
                "name": {"description": "Name of the cloud", "type": "string", "required": true},
                "file": {"description": "file with the definition", "type": "YAML", "required": false},
                "type": {"description": "Type of cloud", "type": "string", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/cloud/list": {
            "name": "/cloud/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/cloud/destory": {
            "name": "/cloud/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/cloud/addresources": {
            "name": "/cloud/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/cloud/adddevices": {
            "name": "/cloud/adddevices",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addDevices",
            "description": "Add items to the object"
        },
        "/cloud/addadevices": {
            "name": "/cloud/addadevices",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addAdevices",
            "description": "Add items to the object"
        },
        "/cloud/adddatacenters": {
            "name": "/cloud/adddatacenters",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addDatacenters",
            "description": "Add items to the object"
        },
        "/cloud/addreservations": {
            "name": "/cloud/addreservations",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addReservations",
            "description": "Add items to the object"
        },
        "/cloud/addrequests": {
            "name": "/cloud/addrequests",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addRequests",
            "description": "Add items to the object"
        },
        "/cloud": {
            "name": "/cloud",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/cloud/update": {
            "name": "/cloud/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {
                    "type": "string",
                    "description": "Extended name of the cloud. This gives the full path to the cloud in the system",
                    "required": false
                },
                "type": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/computeresource/new": {
            "name": "/computeresource/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/computeresource/create": {
            "name": "/computeresource/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/computeresource/list": {
            "name": "/computeresource/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/computeresource/destory": {
            "name": "/computeresource/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/computeresource/addprofile": {
            "name": "/computeresource/addprofile",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addProfile",
            "description": "Add items to the object"
        },
        "/computeresource/addhardware": {
            "name": "/computeresource/addhardware",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addHardware",
            "description": "Add items to the object"
        },
        "/computeresource/addinstances": {
            "name": "/computeresource/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/computeresource": {
            "name": "/computeresource",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/computeresource/update": {
            "name": "/computeresource/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended name of the resource", "required": false},
                "disabled": {"type": "boolean", "description": "Disabled Resource", "required": false},
                "type": {
                    "type": "string",
                    "description": "Type of resource, Network, Storage, Compute or Accelerator",
                    "required": false
                },
                "request": {"type": "object", "required": false},
                "cloud": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/networkresource/new": {
            "name": "/networkresource/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/networkresource/create": {
            "name": "/networkresource/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/networkresource/list": {
            "name": "/networkresource/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/networkresource/destory": {
            "name": "/networkresource/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/networkresource/addprofile": {
            "name": "/networkresource/addprofile",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addProfile",
            "description": "Add items to the object"
        },
        "/networkresource/addhardware": {
            "name": "/networkresource/addhardware",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addHardware",
            "description": "Add items to the object"
        },
        "/networkresource/addinstances": {
            "name": "/networkresource/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/networkresource": {
            "name": "/networkresource",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/networkresource/update": {
            "name": "/networkresource/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended name of the resource", "required": false},
                "disabled": {"type": "boolean", "description": "Disabled Resource", "required": false},
                "type": {
                    "type": "string",
                    "description": "Type of resource, Network, Storage, Compute or Accelerator",
                    "required": false
                },
                "request": {"type": "object", "required": false},
                "cloud": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/request/new": {
            "name": "/request/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/request/create": {
            "name": "/request/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/request/list": {
            "name": "/request/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/request/destory": {
            "name": "/request/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/request/addreservations": {
            "name": "/request/addreservations",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addReservations",
            "description": "Add items to the object"
        },
        "/request/addresources": {
            "name": "/request/addresources",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addResources",
            "description": "Add items to the object"
        },
        "/request/adddatacenters": {
            "name": "/request/adddatacenters",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addDatacenters",
            "description": "Add items to the object"
        },
        "/request/adddevices": {
            "name": "/request/adddevices",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addDevices",
            "description": "Add items to the object"
        },
        "/request/addaggregates": {
            "name": "/request/addaggregates",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addAggregates",
            "description": "Add items to the object"
        },
        "/request/addparent": {
            "name": "/request/addparent",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addParent",
            "description": "Add items to the object"
        },
        "/request": {
            "name": "/request",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/request/update": {
            "name": "/request/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {
                    "type": "string",
                    "description": "Extended Name of the request being made. It contains the lineage of the request in the name",
                    "required": false
                },
                "type": {
                    "type": "string",
                    "description": "This is the type of resource being requested",
                    "required": false
                },
                "message": {"type": "string", "description": "Last message about the request", "required": false},
                "requirements": {"type": "object", "required": false},
                "cloud": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/reservation/new": {
            "name": "/reservation/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/reservation/create": {
            "name": "/reservation/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "create entity"
        },
        "/reservation/list": {
            "name": "/reservation/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/reservation/destory": {
            "name": "/reservation/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/reservation": {
            "name": "/reservation",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/reservation/update": {
            "name": "/reservation/update",
            "inputs": {
                "cost": {
                    "type": "number",
                    "description": "This is the cost of the reservation",
                    "required": false
                },
                "device": {"type": "object", "required": false},
                "request": {"type": "object", "required": false},
                "cloud": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false},
                "name": {"type": "string", "description": "Name of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/resource/new": {
            "name": "/resource/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resource/create": {
            "name": "/resource/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/resource/list": {
            "name": "/resource/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resource/destory": {
            "name": "/resource/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resource/addprofile": {
            "name": "/resource/addprofile",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addProfile",
            "description": "Add items to the object"
        },
        "/resource/addhardware": {
            "name": "/resource/addhardware",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addHardware",
            "description": "Add items to the object"
        },
        "/resource/addinstances": {
            "name": "/resource/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/resource": {
            "name": "/resource",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/resource/update": {
            "name": "/resource/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended name of the resource", "required": false},
                "disabled": {"type": "boolean", "description": "Disabled Resource", "required": false},
                "type": {
                    "type": "string",
                    "description": "Type of resource, Network, Storage, Compute or Accelerator",
                    "required": false
                },
                "request": {"type": "object", "required": false},
                "cloud": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/storageresource/new": {
            "name": "/storageresource/new",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/storageresource/create": {
            "name": "/storageresource/create",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "file": {"description": "file with the definition", "type": "YAML", "required": false}
            },
            "friendlyName": "create",
            "description": "Create object of the class type"
        },
        "/storageresource/list": {
            "name": "/storageresource/list",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/storageresource/destory": {
            "name": "/storageresource/destory",
            "inputs": {"cls": {"description": "Class to use for the object new", "type": "string", "required": true}},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/storageresource/addprofile": {
            "name": "/storageresource/addprofile",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addProfile",
            "description": "Add items to the object"
        },
        "/storageresource/addhardware": {
            "name": "/storageresource/addhardware",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addHardware",
            "description": "Add items to the object"
        },
        "/storageresource/addinstances": {
            "name": "/storageresource/addinstances",
            "inputs": {
                "name": {"description": "Name of the object", "type": "string", "required": false},
                "items": {"description": "Name of the items to add", "type": "string", "required": false},
                "file": {"description": "file with the definition of the items", "type": "YAML", "required": false}
            },
            "friendlyName": "addInstances",
            "description": "Add items to the object"
        },
        "/storageresource": {
            "name": "/storageresource",
            "inputs": {},
            "friendlyName": "new",
            "description": "New called for web interface"
        },
        "/storageresource/update": {
            "name": "/storageresource/update",
            "inputs": {
                "name": {"type": "string", "description": "Name of the item to update", "required": false},
                "ename": {"type": "string", "description": "Extended name of the resource", "required": false},
                "disabled": {"type": "boolean", "description": "Disabled Resource", "required": false},
                "type": {
                    "type": "string",
                    "description": "Type of resource, Network, Storage, Compute or Accelerator",
                    "required": false
                },
                "request": {"type": "object", "required": false},
                "cloud": {"type": "object", "required": false},
                "id": {"type": "string", "description": "ID of the item to update", "required": false}
            },
            "friendlyName": "update",
            "description": "Update entity"
        },
        "/actor/list": {
            "name": "/actor/list",
            "inputs": {},
            "friendlyName": "show",
            "description": "Show the application"
        },
        "/actor/show": {
            "name": "/actor/show",
            "inputs": {"name": {"description": "The scope name of the actor", "type": "string", "required": true}},
            "friendlyName": "show",
            "description": "Show the application"
        },
        "/app/show": {"name": "/app/show", "inputs": {}, "friendlyName": "show", "description": "Show the application"},
        "/model/document": {
            "name": "/model/document",
            "inputs": {
                "scope": {
                    "description": "The scope of the Data Reference",
                    "type": "string",
                    "required": false
                }
            },
            "friendlyName": "document",
            "description": "Document the model"
        }
    }
}
