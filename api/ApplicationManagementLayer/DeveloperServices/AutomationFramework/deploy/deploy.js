
module.exports = {
    name: 'a_d_af',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'a_d_af:dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'a_d_af:test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'a_d_af:prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
