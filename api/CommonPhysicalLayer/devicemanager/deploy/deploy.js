
module.exports = {
    name: 'cpl_dm',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_dm_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_dm_test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_dm_prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
