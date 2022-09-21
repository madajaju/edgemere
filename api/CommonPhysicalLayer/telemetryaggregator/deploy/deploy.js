
module.exports = {
    name: 'cpl_ta',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_ta:dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_ta:test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_ta:prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
