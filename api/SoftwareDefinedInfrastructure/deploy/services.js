module.exports = {
    services: {
        orchestrator: {
            type: "stack",
            image: "sdi_io",
            interface: {
                admin: { path: '/orchestrator', port: 3000, protocol:"http"},
            },
            networks: {
                children: {},
                siblings: {}
            }
        },
        web: {
            image: "sdi_web",
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
