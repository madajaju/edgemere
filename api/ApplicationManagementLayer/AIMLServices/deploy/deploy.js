
module.exports = {
    name: 'aml_ams',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_ams:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_ams:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_ams:prod',
            design: 'services.js',
            env: {}
        }
    }
}
