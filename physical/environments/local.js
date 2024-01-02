module.exports = {
    name: 'local',
    description: 'This is the local environment used by developers. Used for all of the developers',
    color: '#aa44aa',
    networks: {
        adminNetwork: {},
        dataNetwork: {},
        appNetwork: {}
    },
    compute: {
        example1: {
            type: "small",
            networks: {
                adminNetwork: {},
                dataNetwork: {},
                appNetwork: {},
            },
            disks: {
                diska: {
                    type: "share1",
                    mount: "/mnt/shared"
                }
            }
        },
        example2: {
            type: "small",
            networks: {
                adminNetwork: {},
                dataNetwork: {},
                appNetwork: {},
            },
            disks: {
                diska: {
                    type: share1,
                    mount: "/mnt/shared"
                }
            }
        },
        example3: {
            type: "xlarge",
            networks: {
                adminNetwork: {},
                dataNetwork: {},
                appNetwork: {},
            },
            disks: {
                diska: {
                    type: share2,
                    mount: "/mnt/shared"
                }
            }
        },
        example4: {
            type: "xlarge",
            networks: {
                adminNetwork: {},
                dataNetwork: {},
                appNetwork: {},
            },
            disks: {
                diska: {
                    type: share2,
                    mount: "/mnt/shared"
                }
            }
        }
    },
    storage: {
        share1: {
            size: "1T"
        },
        share2: {
            size: "1T"
        }
    }
}
