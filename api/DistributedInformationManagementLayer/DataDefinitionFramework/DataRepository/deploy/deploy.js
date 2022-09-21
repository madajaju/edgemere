
module.exports = {
    name: 'diml_ddf_dr',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_dr:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_dr:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_dr:prod',
            design: 'services.js',
            env: {}
        }
    }
}
