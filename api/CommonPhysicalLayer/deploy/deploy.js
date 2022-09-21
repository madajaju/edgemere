
module.exports = {
    name: 'cpl',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl:prod',
            design: 'services.js',
            env: {}
        }
    }
}
