
module.exports = {
    name: 'a_d_pm',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'a_d_pm_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'a_d_pm_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'a_d_pm_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
