
module.exports = {
    name: 'sml_sr',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_sr:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_sr:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_sr:prod',
            design: 'services.js',
            env: {}
        }
    }
}
