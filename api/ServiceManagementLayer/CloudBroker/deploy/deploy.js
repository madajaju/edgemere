module.exports = {
    name: 'sml_cb',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_cb:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_cb:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_cb:prod',
            design: 'services.js',
            env: {}
        }
    }
}
