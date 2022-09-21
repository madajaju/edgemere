
module.exports = {
    name: 'cpl_tc',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_tc:dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_tc:test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_tc:prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
