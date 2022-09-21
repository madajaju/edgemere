
module.exports = {
    name:'sml_so',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_so:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_so:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_so:prod',
            design: 'services.js',
            env: {}
        }
    }
}
