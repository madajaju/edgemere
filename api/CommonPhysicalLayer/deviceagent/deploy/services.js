module.exports = {
    services: {
        datacontroller: {
            type: 'stack',
            image: "diml_dml_dc_controller",
            interface: {
                admin: { path: '/data', port: 3000, protocol:"http"},
            },
            networks: {
                siblings: {}
            }
        },
        policyengine: {
            type: 'stack',
            image: "sa_pe_engine",
            interface: {
                web: {path:'/policy', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
        servicecontroller: {
            type: 'stack',
            image: "sml_sc",
            interface: {
                web: {path:'/service', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
        telemetry_producer: {
            type: 'stack',
            image: "cpl_tp_producer",
            interface: {
                web: {path:'/telemetry', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
        portal: {
            type: 'stack',
            image: "cpl_da_web",
            interface: {
                web: {path:'/admin', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
    },
    policies: {

    },
    interface: {
        ports: {
            80: 3000,
            443: 3000,
        }
    },
    data: {

    },
    networks: {

    }
}
