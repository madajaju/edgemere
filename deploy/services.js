module.exports = {
    services: {
        aml: {
            type: "stack",
            image: "aml",
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            interface: {
                aml: {path:'/aml', port: 3000 },
            }
        },
        cpl: {
            type: "stack",
            image: "cpl",
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            interface: {
                cpl: {path:'/cpl', port: 3000 },
            }
        },
        diml: {
            type: "stack",
            image: "diml",
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            interface: {
                diml: {path:'/diml', port: 3000 },
            }
        },
        ia: {
            type: "stack",
            image: "ia",
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            interface: {
                ia: {path:'/ia', port: 3000 },
            }
        },
        sa: {
            type: "stack",
            image: "sa",
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            interface: {
                sa: {path:'/sa', port: 3000 },
            }
        },
        sml: {
            type: "stack",
            image: "sml",
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            interface: {
                sml: {path:'/sml', port: 3000 },
            }
        },
        sdi: {
            type: "stack",
            image: "sdi",
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            interface: {
                sdi: {path:'/sml', port: 3000 },
            }
        },
        web: {
            image: "edgemere_web",
            interface: {
                web: {path:'/web', port: 3000 },
            },
            networks: {
                parent: {},
                siblings: {}
            },
            deploy: {
                replicas: 2,
                mode: "replicated", // or global (Global means one per node)
                placement: {
                    constraints: [ "node.role==manager", "engine.labels.operatingsystem==ubuntu", "host==host1" ],
                    resources: {
                        limits: { cpus: 0.50, memory: "500M" },
                        reservations: { cpus: 0.25, memory: "200M" }
                    },
                    preferences: {
                        spread: "node.labels.zone"
                    }
                },
                max_replicas_per_node: 1,
                update_config: {},
                restart_policy: {},
                endpoint_mode: "vip",
            }
        },
        doc: {
            image: "edgemere_doc",
            interface: {
                web: {path:'/doc', port: 8088 },
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
