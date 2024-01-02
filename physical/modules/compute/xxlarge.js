module.exports = {
    num_cpus: 16,
    memory: "32768M",
    disks: {
        disk0: {
            size: "200G",
            mount: "/mnt/sda"
        },
        disk1: {
            size: "1.8T",
            mount: "/mnt/sdb"
        },
        disk2: {
            size: "1.8T",
            mount: "/mnt/sdc"
        }
    },
    network_interface: {
        admin: {
            speed: "1G"
        },
        app: {
            speed: "100G"
        },
        data: {
            speed: "100G"
        }
    },
    os: "ubuntu"
}
