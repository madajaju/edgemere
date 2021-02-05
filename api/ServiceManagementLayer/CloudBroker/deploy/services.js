module.exports = {
    services: {
        gw: {
            image: "sml_cb_gw",
            interface: {
                admin: { path: '/gw', port: 3000, protocol:"http"},
            },
            networks: {
                children: {},
                siblings: {}
            }
        },
        web: {
            image: "sml_cb_web",
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
