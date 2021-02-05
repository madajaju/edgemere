module.exports = {
    services: {
        web: {
            image: "aml_web",
            interface: {
                web: {path:'/web', port: 3000 },
            },
            networks: {
                children: {},
                siblings: {}
            }
        },
        deviceagent: {
            type: "stack",
            image: "cpl_da",
            interface: {
                da: {path:"/da", port:3000}
            },
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            environment: {
                EDGEMERE_TELEMETRY_NETWORK: "_telemetry_family",
            },
            networks: {
                children: {},
                parent: {},
            }
        },
        devicemanager: {
            type: "stack",
            image: "cpl_dm",
            interface: {
                da: {path:"/dm", port:3000}
            },
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            environment: {
                EDGEMERE_TELEMETRY_NETWORK: "_telemetry_family",
            },
            networks: {
                children: {},
                parent: {},
            }
        },
        telemetry: {
            type: "stack",
            image: "cpl_tc",
            interface: {
                da: {path:"/dm", port:3000}
            },
            volumes: {
                docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }
            },
            environment: {
                EDGEMERE_TELEMETRY_NETWORK: "_telemetry_family",
            },
            networks: {
                children: {},
                parent: {},
                telemetry: {}
            }
        }
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
        telemetry: {
            driver: "overlay",
            attachable: true,
            name: "_telemetry_family"
        }
    }
}
