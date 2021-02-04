
module.exports = {
    name: 'diml_ddf_daf',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_daf:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_daf:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_daf:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
