module.exports = {
    services: {
        gw: {
            image: "sml_sc_controller",
            interface: {
                admin: { path: '/controller', port: 3000, protocol:"http"},
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
