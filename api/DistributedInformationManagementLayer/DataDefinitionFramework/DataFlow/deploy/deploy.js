
module.exports = {
    name: 'diml_ddf_df',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_df:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_df:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_df:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
