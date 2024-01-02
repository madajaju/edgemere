module.exports = {
    num_cpus: 8,
    memory: "16384M",
    disks: {
        disk0: {
            type: local,
            size: "200G",
            mount: "/mnt/sda"
        },
        disk1: {
            type: local,
            size: "1.8T",
            mount: "/mnt/sdb"
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
