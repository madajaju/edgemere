
module.exports = {
    name: 'diml_dff',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf:prod',
            design: 'services.js',
            env: {}
        }
    }
}
