module.exports = {
    name: 'dev',
    description: 'This is the development environment. Used for all of the developers',
    color: '#66aaaa',
    locations: {
        datacenter1: {
            type: "location/datacenter",
            address: "Folsom, CA",
            contact: "",
            default: true
        },
        devCloud: {
            type: "location/aws",
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
                networks: [ "dev_appNetwork"]
            },
            internetRouter: {
                type: "network/router",
                location: "datacenter1",
                networks: [ "dev_appNetwork", "internet"]
            },
            cloudSwitch: {
                type: "network/switch",
                location: "devCloud",
                networks: ["dev_appNetwork", "internet"]
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
            dev_appNetwork: {
                network: "10.0.2.0/24"
            }
        }
    },
    compute: {
        example1: {
            type: "compute/small",
            location: "datacenter1",
            networks: {
                adminNetwork: {},
                dataNetwork: {},
                dev_appNetwork: {},
            },
            disks: {
                diska: {
                    volume: "share1",
                    mount: "/mnt/shared"
                }
            }
        },
        example2: {
            type: "compute/small",
            location: "datacenter1",
            networks: {
                adminNetwork: {},
                dataNetwork: {},
                dev_appNetwork: {},
            },
            disks: {
                diska: {
                    volume: "share1",
                    mount: "/mnt/shared"
                }
            }
        },
        example3: {
            type: "compute/xlarge",
            location: "datacenter1",
            networks: {
                adminNetwork: {},
                dataNetwork: {},
                dev_appNetwork: {},
            },
            disks: {
                diska: {
                    volume: "share2",
                    mount: "/mnt/shared"
                }
            }
        },
        example4: {
            type: "compute/xlarge",
            location: "datacenter1",
            networks: {
                adminNetwork: {},
                dataNetwork: {},
                dev_appNetwork: {},
            },
            disks: {
                diska: {
                    volume: "share2",
                    mount: "/mnt/shared"
                }
            }
        },
        cloudCompute1: {
            type: "compute/medium",
            location: "devCloud",
            networks: {
                dev_appNetwork: {},
            },
            disks: {
                diska: {
                    volume: "local",
                    mount: "/mnt/shared"
                },
                diskCloud: {
                    volume: "cloudshare",
                    mount: "/mnt/shared"
                }
            }
        },
        cloudCompute2: {
            type: "compute/medium",
            location: "devCloud",
            networks: {
                dev_appNetwork: {},
            },
            disks: {
                diska: {
                    volume: "local",
                    mount: "/mnt/local"
                },
                diskCloud: {
                    volume: "cloudshare",
                    name: "/mnt/shared"
                }
            }
        },
        cloudCompute3: {
            type: "compute/medium",
            location: "devCloud",
            networks: {
                dev_appNetwork: {},
            },
            disks: {
                diska: {
                    volume: "local",
                    mount: "/mnt/local"
                },
                diskCloud: {
                    volume: "cloudshare",
                    mount: "/mnt/shared"
                }
            }
        }
    },
    storage: {
        share1: {
            location: "datacenter1",
            size: "1T"
        },
        share2: {
            location: "datacenter1",
            size: "1T"
        },
        cloudshare: {
            location: "devCloud",
            size: "10T",
        }
    }
};
