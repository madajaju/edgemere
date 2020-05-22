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
                evaluated: {
                    Evaluated: {}
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
        }
    }
}

module.exports = Request;
