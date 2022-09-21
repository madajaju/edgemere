
module.exports = {
    name: 'diml_dml_ge',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_ge:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_ge:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_ge:prod',
            design: 'services.js',
            env: {}
        }
    }
}
