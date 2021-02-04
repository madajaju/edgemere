module.exports = {
    services: {
        controller: {
            image: "diml_dml_dc_controller",
            interface: {
                admin: { path: '/data_controller', port: 3000, protocol:"http"},
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
