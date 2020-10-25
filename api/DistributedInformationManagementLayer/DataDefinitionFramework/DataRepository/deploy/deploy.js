
module.exports = {
    name: 'diml_ddf_dr',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_dr_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_dr_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_dr_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
