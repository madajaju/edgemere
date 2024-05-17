module.exports = {
    memory: {
        dim0: {
            capacity: "256G",
            speed: 4800
        },
        dim1: {
            capacity: "256G",
            speed: 4800
        },
        dim2: {
            capacity: "256G",
            speed: 4800
        },
        dim3: {
            capacity: "256G",
            speed: 4800
        },
        dim4: {
            capacity: "256G",
            speed: 4800
        },
        dim5: {
            capacity: "256G",
            speed: 4800
        },
        dim6: {
            capacity: "256G",
            speed: 4800
        },
        dim7: {
            capacity: "256G",
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
        disk2: {
            volume: "local",
            size: "800G",
            mount: "/mnt/sdc"
        },
        disk3: {
            volume: "local",
            size: "800G",
            mount: "/mnt/sdd"
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
            speed: "2.0G",
            cores: 32,
            power: 205,
            model: "Intel Xeon 6433N"
        },
        cpu2: {
            type: "cpu",
            speed: "2.0G",
            cores: 32,
            power: 205,
            model: "Intel Xeon 6433N"
        },
        gpu1: {
           type: "gpu",
            speed: "1.6G",
            memory: "128G",
            shaders: 16384,
            tmus: 1024,
            model: "Intel MAX 1550",
            rops: 0,
            power: 600
        }
    },
    os: "ubuntu"
}
