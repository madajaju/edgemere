
class DataRequest {
    static definition = {
        name: 'DataRequest',
        description: 'This represents a request made for data in the system the data request is made with' +
            ' several data reservations coming back depending on the data request. More than one' +
            ' data reservation can be utilized depending on the policies in the data orchestrator.' +
            ' For example is a data reference states to get all car data then several reservations should ' +
            ' be used based on their data sources.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Request being made',
            },
            ename: {
                type: 'string',
                description: 'Extended Name of the Request being made. It Contains any parent request',
            },
            query: {
                type: 'json',
                description: 'JSON structure for fdining the data in the data manager'
            },
            message: {
                type: 'string',
                description: 'Last message about the data request'
            }

        },
        associations: {
            dataReference: {
                type: 'DataReference',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            reservations: {
                type: 'DataReservation',
                cardinality: 'n',
                composition: false,
                owner: true,
            },
            instances: {
                type: 'DataInstance',
                cardinality: 'n',
                composition: false,
                owner: false
            }
        },
        statenet: {
            Init: {
                description: "Initial State for the Data Request",
                events: {
                    fulfill: {
                        Needed: {}
                    }
                }
            },
            Needed: {
                description: "Request needs to be satisfied. Anyone that can satisfy it should be notified.",
                events: {
                    selected: {
                        Selected: {}
                    },
                    failed: {
                        Failed: {}
                    }
                },
                actions: {},
            },
            Failed: {
                description: 'The Request has failed to be fully satisfied. All reservations are rejected',
            },
            Selected: {
                description: 'The Request has been selected for target. Reservations are created.',
                events: {
                    evaluated: {
                        Evaluated: {}
                    }
                }
            },
            Satisfied: {
                description: 'The Request if fully satisfied. The Reservations have been rejected or accepted',
                events: {
                    complete: {
                        Completed: {}
                    }
                }
            },
            Evaluated: {
                description: 'The Request has been evaluated but not satisfied yet.',
                events: {
                    satisfied: {
                        Satisfied: {}
                    },
                    failed: {
                        Failed: {}
                    }
                }
            },
            Completed: {
                description: 'The Request is completed.'
            }
        },
        view: {
            color: "#ffcc88",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffcc88", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<polygon points="-5,0 0,10 5,0 0,-10 -5,0" style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<polygon points="-2,3 3,13 8,3 3,-7 -2,3" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="DataRequest3D${i}">` +
                        `<a-octahedron radius="3" material="${materials[i]}" ></a-cyu>` +
                        `<a-octahedron radius="3" position="3 3 3" material="${materials[i]}" ></a-cyu>` +
                        `</a-entity>`;
                }
                return retval;

            }
        }
    }
}

module.exports = DataRequest;

