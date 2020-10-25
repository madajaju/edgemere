
module.exports = {
    name: 'sdi_io',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sdi_io_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sdi_io_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sdi_io_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
