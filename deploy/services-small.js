module.exports = {
    services: {
        admin: {
            type: "stack",
            image: "edgemere",
            volumes: [
                "/var/run/docker.sock:/var/run/docker.sock"
            ],
            interface: {
                admin: { path: '/admin', port: 3000, protocol:"http"},
            },
            policies: { },
            environment: { },
        },
        web: {
            image: "edgemere_web",
            interface: {
                web: {path:'/web', port: 3000 },
            },
            networks: {
                children: {},
                siblings: {},
            }
        },
        doc: {
            image: "edgemere_doc",
            interface: {
                web: {path:'/doc', port: 8088 },
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
