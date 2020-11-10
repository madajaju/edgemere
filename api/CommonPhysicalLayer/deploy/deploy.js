
module.exports = {
    name: 'cpl',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
