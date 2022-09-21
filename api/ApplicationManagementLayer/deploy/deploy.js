
module.exports = {
    name: 'aml',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml:prod',
            design: 'services.js',
            env: {}
        }
    }
}
