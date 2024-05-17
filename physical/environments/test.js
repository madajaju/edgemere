module.exports = {
    name: 'test',
    description: 'This is the test environment used by developers. Used for all of the developers',
    color: '#aa8844',
    locations: {
        datacenter1: {
            type: "location/datacenter",
            address: "Folsom, CA",
            contact: "",
            default: true
        }
    },
    network: {
        devices: {
            adminSwitch: {
                type: "network/switch",  // switch, gateway, router, hub, firewall, accesspoint
                networks: [ "adminNetwork" ],
                location: "datacenter1"
            },
            dataSwitch: {
                type: "network/switch",
                model: "Arista 7010X",
                speed:  "100G", // 100 GigaBit
                ports: 48,
                location: "datacenter1",
                networks: [ "dataNetwork"]
            },
            appSwitch: {
                type: "network/switch",
                model: "Arista 7010X",
                speed:  "100G", // 100 GigaBit
                ports: 48,
                location: "datacenter1",
                networks: [ "appNetwork"]
            },
            internetRouter: {
                type: "network/router",
                location: "datacenter1",
                networks: [ "appNetwork", "internet"]
            }
        },
        networks: {
            internet: {
                gateway: "172.25.192.1",
                mask: "255.255.255.0",
                ipaddr: "172.25.192.124"
            },
            adminNetwork: {
                network: "10.0.0.0/24"
            },
            dataNetwork: {
                network: "10.0.1.0/24"
            },
            appNetwork: {
                network: "10.0.2.0/24"
            }
        }
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
                    volume: "share1",
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
                    volume: "share1",
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
                    volume: "share2",
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
                    volume: "share2",
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
