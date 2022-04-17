
module.exports = {
    name: 's_spm',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 's_spm_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 's_spm_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 's_spm_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
