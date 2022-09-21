
module.exports = {
    name: 'aml_ws',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_ws:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_ws:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_ws:prod',
            design: 'services.js',
            env: {}
        }
    }
}
