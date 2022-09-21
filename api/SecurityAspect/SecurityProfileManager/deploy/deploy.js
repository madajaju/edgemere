
module.exports = {
    name: 's_spm',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 's_spm:dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 's_spm:test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 's_spm:prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
