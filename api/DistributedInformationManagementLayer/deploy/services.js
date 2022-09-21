module.exports = {
    services: {
        web: {
            image: "diml_web",
            interface: {
                web: {path:'/web', port: 3000 },
            },
            networks: {
                children: {},
                siblings: {}
            }
        },
        diml_cds: {
            type: 'stack',
            image: 'diml_cds',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_ams: {path:'/cds', port: 3000}},
        },
        diml_ddf: {
            type: 'stack',
            image: 'diml_ddf',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_ams: {path:'/ddf', port: 3000}},
        },
        diml_dml: {
            type: 'stack',
            image: 'diml_dml',
            volumes: { docker: { source: "/var/run/docker.sock", target: "/var/run/docker.sock" }},
            interface: { aml_ams: {path:'/dml', port: 3000}},
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
