
module.exports = {
    name: 'sdi',
    contexts: {
        dev: {
            type: 'swarm',
            tag: '_sdi_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: '_sdi_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: '_sdi_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
