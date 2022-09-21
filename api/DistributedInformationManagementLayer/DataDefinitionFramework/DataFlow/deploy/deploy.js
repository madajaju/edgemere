
module.exports = {
    name: 'diml_ddf_df',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_df:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_df:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_df:prod',
            design: 'services.js',
            env: {}
        }
    }
}
