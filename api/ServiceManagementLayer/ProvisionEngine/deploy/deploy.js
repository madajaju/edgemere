
module.exports = {
    name: 'sml_pe',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_pe:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_pe:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_pe:prod',
            design: 'services.js',
            env: {}
        }
    }
}
