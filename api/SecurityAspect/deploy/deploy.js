
module.exports = {
    name: 'sa',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sa_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sa_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sa_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
