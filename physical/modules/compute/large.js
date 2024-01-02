module.exports = {
    num_cpus: 4,
    memory: "8192M",
    disk: {
        size: "200G",
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
