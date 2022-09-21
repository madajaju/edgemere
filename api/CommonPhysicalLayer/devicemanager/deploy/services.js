module.exports = {
    services: {
        data_orchestrator: {
            type: 'stack',
            image: "diml_dml_do",
            interface: {
                do: { path: '/data', port: 3000, protocol:"http"},
            },
            networks: {
                siblings: {}
            }
        },
        policy_engine: {
            type: 'stack',
            image: "sa_pe",
            interface: {
                pe: {path:'/policy', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
        service_orchestrator: {
            type: 'stack',
            image: "sml_so",
            interface: {
                so: {path:'/service', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
        telemetry_aggregator: {
            type: 'stack',
            image: "cpl_ta",
            interface: {
                ta: {path:'/telemetry', port: 3000 },
            },
            networks: {
                siblings: {}
            }
        },
        portal: {
            image: "cpl_dm_web",
            interface: {
                dm: {path:'/admin', port: 3000 },
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
