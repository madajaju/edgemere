
module.exports = {
    name: 'sml',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml:prod',
            design: 'services.js',
            env: {}
        }
    }
}
