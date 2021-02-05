module.exports = {
    services: {
        gw: {
            image: "sml_em_gw",
            interface: {
                admin: { path: '/gw', port: 3000, protocol:"http"},
            },
            networks: {
                children: {},
                siblings: {}
            }
        },
        web: {
            image: "sml_em_web",
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
