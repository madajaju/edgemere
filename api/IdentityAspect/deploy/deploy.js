
module.exports = {
    name: 'ia',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'edgemere_ia_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'edgemere_ia_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'edgemere_ia_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
