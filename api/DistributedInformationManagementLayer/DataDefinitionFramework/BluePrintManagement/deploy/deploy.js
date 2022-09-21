
module.exports = {
    name: 'diml_ddf_bpm',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_bpm:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_bpm:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_bpm:prod',
            design: 'services.js',
            env: {}
        }
    }
}
