module.exports = {
    memory: {
        dim0: {
            capacity: "16G",
            speed: 4800
        },
        dim1: {
            capacity: "16G",
            speed: 4800
        },
    },
    disks: {
        disk0: {
            volume: "local",
            size: "256G",
            mount: "/mnt/sda"
        },
        disk1: {
            volume: "local",
            size: "256G",
            mount: "/mnt/sdb"
        },
    },
    networks: {
        interfaces: {
            admin: {
                speed: "1G"
            },
            app: {
                speed: "10G"
            },
            data: {
                speed: "10G"
            }
        }
    },
    processors: {
        cpu1: {
            type: "cpu",
            speed: "2.4G",
            cores: 12,
            power: 150,
            model: "Intel Xeon 4510"
        },
        cpu2: {
            type: "cpu",
            speed: "2.4G",
            cores: 12,
            power: 150,
            model: "Intel Xeon 4510"
        },
    },
    os: "ubuntu"
}
