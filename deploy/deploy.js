
module.exports = {
    name: 'edgemere',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'edgemere_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'edgemere_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'edgemere_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
