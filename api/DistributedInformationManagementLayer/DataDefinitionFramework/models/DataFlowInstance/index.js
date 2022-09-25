
class DataFlowInstance {
    static definition = {
        name: 'DataFlowInstance',
        description: 'This is an instance of the data flow when a blue print is instantiated.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Data AWorkFlow Instance',
            }
        },
        associations: {
            blueprint: {
                type: 'DataBluePrintInstance',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            dataflow: {
                type: 'DataFlow',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            sinks: {
                type: 'DataSource',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            sources: {
                type: 'DataSource',
                cardinality: 'n',
                composition: false,
                owner: false,
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
            color: "#ffcc88",
            object2d: (options) => {
                let material = { color: "#ffcc88", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<rect width="20" height="4" x="-10" y="2" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` ;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#ffcc88; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="DataFlow3D${i}">` +
                        `<a-cylinder radius="3" height="15" rotation="90 -90 0" position="5 0 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = DataFlowInstance;

