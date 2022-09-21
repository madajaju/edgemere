
module.exports = {
    name: 'diml_ddf_daf',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_daf:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_daf:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_daf:prod',
            design: 'services.js',
            env: {}
        }
    }
}
