class Reservation {
    static definition = {
        name: 'Reservation',
        description: 'A reservation fullfils the request to the system for resources. When a request for a resource ' +
            'is made from a cloud. A reservation for the resource request is created for each device or devices that' +
            ' can satistfy the request. When the request is fulfilled the reservations are then no longer needed.',
        attributes: {
            cost: {
                type: 'number',
                description: 'This is the cost of the reservation'
            }
        },
        associations: {
            device: {
                type: 'Device',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            request: {
                type: 'Request',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            cloud: {
                type: 'Cloud',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
        statenet: {
            Init: {
                events: {
                    construct: {
                        Created: {}
                    }
                }
            },
            Created: {
                events: {
                    confirm: {
                        Confirmed: {}
                    },
                    free: {
                        Rejected: {}
                    }
                }
            },
            Confirmed: {
            },
            Rejected: {
            }
        }
    }
}

module.exports = Reservation;
