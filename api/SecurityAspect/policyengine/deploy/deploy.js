
module.exports = {
    name: 'sa_pe',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sa_pe_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sa_pe_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sa_pe_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
