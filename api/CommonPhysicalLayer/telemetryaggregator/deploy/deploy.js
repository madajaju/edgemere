
module.exports = {
    name: 'cpl_ta',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_ta_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_ta_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_ta_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
