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
            }
        },
        associations: {
            requirements: {
                type: 'MetricComposite',
                cardinality: '1',
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
            parent: {
                type: 'LandscapeRequest',
                cardinality: '1',
                composition: false,
                owner: false,
            },
        },
        statenet: {
            Init: {
                events: {
                    confirm: {
                        Selected: {}
                    }

                }
            },
            Selected: {
                events: {
                    confirm: {
                        Confirmed: {}
                    },
                    free: {
                        Rejected: {}
                    }
                }
            },
            Failed: {
            },
            Satisfied: {
            },
            Evaluated: {
            },
            Completed: {
            }
        }
    }
}

module.exports = Request;
