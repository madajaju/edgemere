
module.exports = {
    name: 'diml_ddf_bpm',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_bpm_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_bpm_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_bpm_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
