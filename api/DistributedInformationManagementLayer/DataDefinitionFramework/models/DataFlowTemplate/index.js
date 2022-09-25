
class DataFlowTemplate {
    static definition = {
        name: 'DataFlowTemplate',
        description: 'Data AWorkFlow Template is how a Blue Print refrences a Data AWorkFlow with ' +
            'late binding of sources and sinks when data sources are added to a blueprint.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the data flow in the blue print',
            }
        },
        associations: {
            flow: {
                type: 'DataFlow',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            sources: {
                type: 'DataAdaptorTemplate',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            sinks: {
                type: 'DataAdaptorTemplate',
                cardinality: 'n',
                composition: false,
                owner: false,
            }
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
                return `<rect width="20" height="4" x="-10" y="2" style="fill:${material.color};stroke:${material.border};stroke-width:1;stroke-dasharray: 3" />` ;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#ffcc88; transparent:true, opacity:0.90;wireframe:true;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;wireframe:true;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;wireframe:true;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;wireframe:true;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="DataFlowTemplate3D${i}">` +
                        `<a-cylinder radius="3" height="15" rotation="90 -90 0" position="5 0 0" segments-height='3' segments-radial='6' material='${materials[i]}' ></a-dodecohydon>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = DataFlowTemplate;

