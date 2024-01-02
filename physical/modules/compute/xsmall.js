module.exports = {
    num_cpus: 1,
    memory: "1024M",
    disk: {
        size: "100G",
        label: "disk0",
        mount: "/mnt/sda"
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
