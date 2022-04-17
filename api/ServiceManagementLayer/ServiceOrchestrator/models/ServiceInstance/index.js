class ServiceInstance {
    static definition = {
        name: 'ServiceInstance',
        description: 'This is an instance of a service running on resources. The Instance is allocated to ' +
            'resources based on the environment and policies of the Service and the Servicelet. A set of ' +
            'actions can be performed on the instance as defined by the runScripts association. ',
        attributes: {
        },
        associations: {
            image: {
                description: 'Image of the service instance',
                type: 'Image',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            data: {
                 type: 'DataInstance',
                 cardinality: 'n',
                 composition: false,
                 owner: false,
            },
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
            runScripts: {
                description: 'Scripts to run for the different actions performed in the service',
                type: 'RunScript' ,
                cardinality: 'n',
                unique: 'true',
                composition: true,
                owner: true,
                via: 'owner'
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
        view: {
            color: "#aaffaa",
            object2d: (options) => {
                // Triangle
                let material = { color: "#aaffaa", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<circle cx="-8" cy="8" r="6" style="fill:#cccccc;stroke:#888888;stroke-width:1" />` +
                    `<polygon points="-10,10 10,10 5,-10 -5,-10 -10,10" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;

            },
            object3d: (options) => {
                let materials = {
                    '': `color:#aaffaa; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="ServiceInstance3D${i}">` +
                        `<a-cone radius-bottom="10" radius-top="5" height="20" radialSegments="10" position="0 0 0" material="${materials[i]}" ></a-cone>` +
                        `<a-sphere radius="6" position="-6 -6 -6" material="color:#ffffff; transparent:true; opacity:0.60"></a-sphere>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = ServiceInstance;

