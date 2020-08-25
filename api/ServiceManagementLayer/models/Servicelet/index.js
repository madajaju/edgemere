class Servicelet {
    static definition = {
        name: 'Servicelet',
        description: 'Servicelet is the combination of a Service with the environment. This gives the ability to have  ' +
            'a service that behaves differently depending on the environment it resides.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Servicelet',
            },
            args: {
                type: 'json',
                description: 'Names Argument list [ {name: value} ]',
            },
            replicas: {
                type: 'number',
                description: 'Number of replicas to run',
            },
            ports: {
                type: 'json',
                description: 'Port Mappings ####:####',
            }
        },
        associations: {
            resources: {
                description: 'resource requests for the servicelet',
                type: 'Resource',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            parent: {
                description: 'Parent stacklet for the servicelet',
                type: 'Stacklet',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            instances: {
                description: 'ServiceInstance for the servicelet',
                type: 'ServiceInstance',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            service: {
                description: 'Service for the servicelet, this is what service is run. This could be a service or a stack',
                type: 'Service',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            env: {
                description: 'Environment for the Servicelet',
                type: 'Environment',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            data: {
                description: 'Data References to the data in the Stacklet',
                type: 'DataReference',
                cardinality: 'n',
                composition: false,
                owner:true,
                via: 'parent'
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
                return `<rect width="30" height="3" x="-15" y="10" style="fill:#cccccc;stroke:#888888;stroke-width:1" />` +
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
                    retval += `<a-entity id="Servicelet3D${i}">` +
                        `<a-cone radius-bottom="10" radius-top="5" height="20" radialSegments="10" position="0 0 0" material="${materials[i]}" ></a-cone>` +
                        `<a-box width="30" height="30" depth="3" position="0 -11 0" rotation="90 0 0" material="color:#ffffff; transparent:true; opacity:0.60"></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Servicelet;

