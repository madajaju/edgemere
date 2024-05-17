module.exports = {
    name: 'local',
    description: 'This is the local environment used by developers. Used for all of the developers',
    color: '#aa44aa',
    locations: {
        homeOffice: {
            type: "location/homeOffice",
            contact: "",
            default: true
        },
        datacenter1: {
            type: "location/datacenter",
            contact: "",
            default: true
        },
        gitHub: {
            type: "location/cloud",
            contact: "gitHub",
        },
        azure: {
            type: "location/cloud",
            contact: "azure"
        }
    },
    network: {
        devices: {
            adminSwitch: {
                type: "network/switch",  // switch, gateway, router, hub, firewall, accesspoint
                networks: [ "adminNetwork" ],
                location: "datacenter1"
            },
            homeRouter: {
                type: "network/router",
                speed:  "1G", // 100 GigaBit
                location: "homeOffice",
                networks: [ "homeNetwork", "adminNetwork", "internet"]
            },
            homeSwitch: {
                type: "network/switch",
                speed:  "1G", // 100 GigaBit
                ports: 48,
                location: "homeOffice",
                networks: [ "homeNetwork"]
            },
        },
        networks: {
            internet: {
                gateway: "172.25.12.1",
                mask: "255.255.255.0",
                ipaddr: "172.25.12.143",
            },
            adminNetwork: {
                network: "10.0.0.0/24"
            },
            homeNetwork: {
                network: "192.168.12.0/16",
            },
        }
    },
    compute: {
        renderService: {
            type: "compute/medium",
            location: "homeOffice",
            networks: {
                adminNetwork: {
                    interface: "admin",
                },
                homeNetwork: {
                    interface: "app",
                },
            },
            disks: {
                oneDrive: {
                    volume: "oneDrive",
                    mount: "/mnt/shared"
                },
                gitHub: {
                    volume: "gitHub",
                    mount: "/work"
                }
            }
        },
        laptop: {
            type: "compute/small",
            location: "homeOffice",
            networks: {
                adminNetwork: {
                    interface: "admin"
                },
                homeNetwork: {
                    interface: "app"
                }
            },
            disks: {
                oneDrive: {
                    volume: "oneDrive",
                    mount: "/mnt/shared"
                },
                gitHub: {
                    volume: "gitHub",
                    mount: "/work"
                }
            }
        },
        adminConsole: {
            type: "compute/xsmall",
            location: "datacenter1",
            networks: {
                adminNetwork: {
                    interface: "admin"
                },
            },
        }
    },
    storage: {
        oneDrive: {
            type: "storage/cloud",
            location: "azure",
            size: "10T",
            networks: {
                internet: {}
            }
        },
        gitHub: {
            type: "storage/cloud",
            location: "gitHub",
            size: "1T",
            networks: {
                internet: {}
            }
        }
    }
}
