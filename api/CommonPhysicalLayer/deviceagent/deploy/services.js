module.exports = {
    services: {
        datacontroller: {
            image: "diml_dml_dc_controller",
            interface: {
                admin: { path: '/data', port: 3000, protocol:"http"},
            },
            networks: {
                siblings: {}
            }
        },
        policyengine: {
            image: "sa_pe_engine",
            interface: {
                web: {path:'/policy', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
        servicecontroller: {
            image: "sml_sc",
            interface: {
                web: {path:'/service', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
        telemetry_producer: {
            image: "cpl_tp_producer",
            interface: {
                web: {path:'/telemetry', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
        portal: {
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
