
module.exports = {
    name: 'cpl_tp',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_tp_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_tp_test',
            file: 'docker-compose-test.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_tp_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
