
module.exports = {
    name: 'aml_as',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_as:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_as:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_as:prod',
            design: 'services.js',
            env: {}
        }
    }
}
