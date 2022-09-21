
module.exports = {
    name: 'aml_ds',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_ds:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_ds:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_ds:prod',
            design: 'services.js',
            env: {}
        }
    }
}
