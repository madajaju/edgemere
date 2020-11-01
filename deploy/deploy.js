
module.exports = {
    name: 'edgemere',
    contexts: {
        local: {
            type: 'swarm',
            tag: 'edgemere_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        dev: {
            type: 'swarm',
            tag: 'edgemere_dev',
            file: 'docker-compose-full.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'edgemere_dev',
            file: 'docker-compose-full.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'edgemere_dev',
            file: 'docker-compose-full.yml',
            env: {}
        }
    }
}
