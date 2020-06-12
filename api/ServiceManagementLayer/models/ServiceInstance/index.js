class ServiceInstance {
    static definition = {
        name: 'ServiceInstance',
        description: 'This is an instance of a service running on resources. The Instance is allocated to ' +
            'resources based on the environment and policies of the Service and the Servicelet. A set of ' +
            'actions can be performed on the instance as defined by the runScripts association. ',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Service Instance',
            }
        },
        associations: {
            image: {
                description: 'Image of the service instance',
                type: 'Image',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            // data: {
            //     type: 'DataInstance',
            //     cardinality: 'n',
            //     composition: false,
            //     owner: false,
            // },
            resources: {
                description: 'Resources used to host this service instance',
                type: 'Resource' ,
                cardinality: 'n' ,
                composition: false ,
                owner: false ,
            },
            servicelet: {
                description: 'Service and environment combined together that defines the service instance',
                type: 'Servicelet' ,
                cardinality: 1,
                composition: false ,
                owner: false ,
            },
            stack: {
                description: 'StackInstance that is running the service instance',
                type: 'StackInstance' ,
                cardinality: 1,
                composition: false ,
                owner: false ,
            },
            env: {
                description: 'Environment of the service instance running',
                type: 'Environment' ,
                cardinality: 1,
                composition: false ,
                owner: false ,
            },
            runScripts: {
                description: 'Scripts to run for the different actions performed in the service',
                type: 'RunScript' ,
                cardinality: 'n',
                unique: 'true',
                composition: true,
                owner: true,
            },
        },
        /*
        statenet: {
            Init: {
                description: "Initial State"
                events: {
                    create: {
                        StateName: { }
                    }
                }
            },
            StateName: {
                description: "My Description of the state",
                events: {
                    eventName: {
                        StateName: {
                            condition: function(obj) { ... },
                            action: function(obj) { ... },
                        }
                    },
                    eventName2 ...
                }
                actions: {
                    entry: { entry1: function(obj) { ... } },
                    exit: { exit1: function(obj): { ... } }
                }
            }
        }
        */
    }
}

module.exports = ServiceInstance;

