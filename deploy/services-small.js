module.exports = {
    services: {
        web: {
            image: "edgemere_web",
            interface: {
                "/web": { path: '/web', port: 3000, protocol:"http"},
                "/web/socket.io": { path: '/web/socket.io', port: 3000, protocol:"http"},
            },
            networks: {
                children: {},
                siblings: {},
            }
        },
        doc: {
            image: "edgemere_doc",
            interface: {
                "/docs": { path: '/docs/', port: 4000, protocol:"http"},
            },
            networks: {
                siblings: {},
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
