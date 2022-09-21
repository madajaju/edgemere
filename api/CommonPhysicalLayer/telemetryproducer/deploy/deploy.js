
module.exports = {
    name: 'cpl_tp',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_tp:dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_tp:test',
            file: 'docker-compose-test.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_tp:prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
