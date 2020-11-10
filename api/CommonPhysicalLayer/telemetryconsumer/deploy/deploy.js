
module.exports = {
    name: 'cpl_tc',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_tc_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_tc_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_tc_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
