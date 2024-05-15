
module.exports = {
    name: 'c_p',
    contexts: {
        local: {
            type: 'swarm',
            tag: 'c_p_dev',
            design: 'services.js',
            env: {}
        },
        dev: {
            type: 'swarm',
            tag: 'c_p_dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'c_p_test',
            design: 'services.js',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'c_p_prod',
            design: 'services.js',
            env: {}
        }
    }
}
