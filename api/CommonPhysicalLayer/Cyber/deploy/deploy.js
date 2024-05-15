
module.exports = {
    name: 'c_c',
    contexts: {
        local: {
            type: 'swarm',
            tag: 'c_c_dev',
            design: 'services.js',
            env: {}
        },
        dev: {
            type: 'swarm',
            tag: 'c_c_dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'c_c_test',
            design: 'services.js',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'c_c_prod',
            design: 'services.js',
            env: {}
        }
    }
}
