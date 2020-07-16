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
                    create: {
                        Created: {}
                    },
                    confirm: {
                        Confirmed: {}
                    },
                    free: {
                        Rejected: {}
                    }
                }
            },
            Created: {
                description: 'Reservation is created and ready to be evaluated for best fit.',
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
                description: 'Reservation is confirmed and the resources will be provisioned.',
            },
            Rejected: {
                description: 'Reservation was rejected and devices freed up.',
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
                return `<polygon points="-5,0 0,10 5,0 0,-10 -5,0" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="Reservation3D${i}">` +
                        `<a-octahedron radius="3" material="${materials[i]}" ></a-cyu>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Reservation;
