
module.exports = {
    name: 'sml_pe',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_pe_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_pe_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_pe_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
