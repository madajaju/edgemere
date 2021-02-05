module.exports = {
    services: {
        admin: {
            image: "edgemere_admin",
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            interface: {
                admin: { path: '/admin', port: 3000, protocol:"http"},
            },
            policies: { },
            environment: { },
        },
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
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            image: "cpl",
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
        pubsub: {
            image: "redis",
            interface: {
                pubsub: {path:'/pubsub', port: 80 },
            },
            networks: {
                children: {},
                siblings: {}
            }
        },
        web: {
            image: "edgemere_web",
            interface: {
                web: {path:'/web', port: 3000 },
            },
            networks: {
                children: {},
                siblings: {}
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
