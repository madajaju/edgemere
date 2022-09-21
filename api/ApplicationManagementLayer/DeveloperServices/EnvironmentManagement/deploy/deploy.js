
module.exports = {
    name: 'sml_em',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_em:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_em:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_em:prod',
            design: 'services.js',
            env: {}
        }
    }
}
