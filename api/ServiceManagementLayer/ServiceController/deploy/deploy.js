
module.exports = {
    name: 'sml_sc',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_sc:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_sc:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_sc:prod',
            design: 'services.js',
            env: {}
        }
    }
}
