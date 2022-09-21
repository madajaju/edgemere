module.exports = {
    services: {
        broker: {
            type: 'stack',
            image: 'sml_cb',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_as: {path:'/broker', port: 3000}},
        },
        envmangaer: {
            type: 'stack',
            image: 'sml_em',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_as: {path:'/environment', port: 3000}},
        },
        provision: {
            type: 'stack',
            image: 'sml_pe',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_as: {path:'/provision', port: 3000}},
        },
        controller: {
            type: 'stack',
            image: 'sml_sc',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_as: {path:'/controller', port: 3000}},
        },
        orchestrator: {
            type: 'stack',
            image: 'sml_so',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_as: {path:'/orchestrator', port: 3000}},
        },
        repo: {
            type: 'stack',
            image: 'sml_sr',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_as: {path:'/repo', port: 3000}},
        },
        web: {
            image: "sml_web",
            interface: {
                web: {path:'/web', port: 3000 },
            },
            networks: {
                children: {},
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
