
module.exports = {
    name: 'diml_dml_do',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_do_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_do_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_do_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
