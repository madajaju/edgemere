module.exports = {
    num_cpus: 2,
    memory: "2048",
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
