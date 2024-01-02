module.expoerts = {
    name: 'development',
    description: 'This is the development environment. Used for all of the developers',
    color: '#66aaaa',
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
};
