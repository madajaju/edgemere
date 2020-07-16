class Request {
    static definition = {
        name: 'Request',
        description: 'This represents a request being made for a resource in the cloud. This is only the request' +
            ' a set of reservations will be created for each request. When the request is satisfied the request' +
            'will change state to Satisfied, and be returned to the requester' +
            'long description',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the request being made',
            },
            ename: {
                type: 'string',
                description: 'Extended Name of the request being made. It contains the lineage of the request in the name',
            },
            type: {
                type: 'string',
                description: 'This is the type of resource being requested',
            },
            message: {
                type: 'string',
                description: 'Last message about the request',
            },
        },
        associations: {
            requirements: {
                type: 'MetricComposite',
                cardinality: 1,
                composition: true,
                unique: true,
                owner: true,
            },
            reservations: {
                type: 'Reservation',
                cardinality: 'n',
                composition: false,
                owner: true,
            },
            resources: {
                type: 'Resource',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'request'
            },
            cloud: {
                type: 'Cloud',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            datacenters: {
                type: 'DataCenter',
                cardinality: 'n',
                composition: false,
                owner: false,
                unique: true
            },
            devices: {
                type: 'Device',
                cardinality: 'n',
                composition: false,
                owner: false,
                unique: true
            },
            aggregates: {
                type: 'AggregatedDevice',
                cardinality: 'n',
                composition: false,
                owner: false,
                unique: true
            },
            parent: {
                type: 'LandscapeRequest',
                cardinality: '1',
                composition: false,
                owner: false,
            },
        },
        statenet: {
            Init: {
                description: "Initial state for the Request.",
                events: {
                    fulfill: {
                        Needed: {}
                    },
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
                actions: {
                },
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
            color: "#ffffaa",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffffaa", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<polygon points="-5,0 0,10 5,0 0,-10 -5,0" style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<polygon points="-2,3 3,13 8,3 3,-7 -2,3" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#ffffaa; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="Request3D${i}">` +
                        `<a-octahedron radius="3" material="${materials[i]}" ></a-cyu>` +
                        `<a-octahedron radius="3" position="3 3 3" material="${materials[i]}" ></a-cyu>` +
                        `</a-entity>`;
                }
                return retval;

            }
        }
    }
}

module.exports = Request;
