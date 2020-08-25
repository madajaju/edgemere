
class DataReservation {
    static definition = {
        name: 'DataReservation',
        description: 'Resrevation for utilixzing data and creating a data instance.',
        attributes: {
            cost: {
                type: 'number',
                description: 'Cost of using the data',
            }
        },
        associations: {
            data: {
                type: 'Data',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            source: {
                type: 'DataSource',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            request: {
                type: 'DataRequest',
                cardinality: 1,
                composition: false,
                owner: false,
            }

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
            color: "#ffcc88",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffcc88", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<polygon points="-5,0 0,10 5,0 0,-10 -5,0" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="DataReservation3D${i}">` +
                        `<a-octahedron radius="3" material="${materials[i]}" ></a-cyu>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = DataReservation;

