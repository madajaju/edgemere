
module.exports = {
    name: 'insite',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds_insite_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds_insite_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds_insite_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
