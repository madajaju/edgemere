module.exports = {
    memory: {
        dim0: {
            capacity: "64G",
            speed: 4800
        },
        dim1: {
            capacity: "64G",
            speed: 4800
        },
        dim2: {
            capacity: "64G",
            speed: 4800
        },
        dim3: {
            capacity: "64G",
            speed: 4800
        },
        dim4: {
            capacity: "64G",
            speed: 4800
        },
        dim5: {
            capacity: "64G",
            speed: 4800
        },
        dim6: {
            capacity: "64G",
            speed: 4800
        },
        dim7: {
            capacity: "64G",
            speed: 4800
        },
    },
    disks: {
        disk0: {
            volume: "local",
            size: "800G",
            mount: "/mnt/sda"
        },
        disk1: {
            volume: "local",
            size: "800G",
            mount: "/mnt/sdb"
        },
    },
    networks: {
        interfaces: {
            admin: {
                speed: "1G"
            },
            app: {
                speed: "25G"
            },
            data: {
                speed: "25G"
            }
        }
    },
    processors: {
        cpu1: {
            type: "cpu",
            speed: "2.8G",
            cores: 24,
            power: 205,
            model: "Intel Xeon"
        },
        cpu2: {
            type: "cpu",
            speed: "2.8G",
            cores: 24,
            power: 205,
            model: "Intel Xeon"
        },
    },
    os: "ubuntu"
}
