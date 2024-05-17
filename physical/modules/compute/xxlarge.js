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
            size: "1.8T",
            mount: "/mnt/sda"
        },
        disk1: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sdb"
        },
        disk2: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sdc"
        },
        disk3: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sdd"
        },
        disk4: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sda"
        },
        disk5: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sdb"
        },
        disk6: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sdc"
        },
        disk7: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sdd"
        },
        disk8: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sda"
        },
        disk9: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sdb"
        },
        disk10: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sdc"
        },
        disk11: {
            volume: "local",
            size: "1.8T",
            mount: "/mnt/sdd"
        },
    },
    networks: {
        interfaces: {
            admin: {
                speed: "1G"
            },
            app: {
                speed: "100G"
            },
            data: {
                speed: "100G"
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
        cpu3: {
            type: "cpu",
            speed: "2.0G",
            cores: 32,
            power: 205,
            model: "Intel Xeon 6433N"
        },
        cpu4: {
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
        },
        gpu2: {
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
