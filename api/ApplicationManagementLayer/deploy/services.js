module.exports = {
    services: {
        aml_web: {
            image: "aml_web",
            interface: {
                web: {path:'/web', port: 3000 },
            },
            networks: {
                children: {},
                siblings: {}
            }
        },
        aml_as: {
            type: 'stack',
            image: 'aml_ams',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_ams: {path:'/ams', port: 3000}},
        },
        aml_as: {
            type: 'stack',
            image: 'aml_as',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_as: {path:'/as', port: 3000}},
        },
        aml_ds: {
            type: 'stack',
            image: 'aml_ds',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_ds: {path:'/ds', port: 3000}},
        },
        aml_ws: {
            type: 'stack',
            image: 'aml_ws',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_ws: {path:'/ws', port: 3000}},
        },
        aml_ams: {
            type: 'stack',
            image: 'aml_ams',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_ws: {path:'/ams', port: 3000}},
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
