
module.exports = {
    name: 'diml_ddf_daf',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_daf_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_daf_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_daf_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
