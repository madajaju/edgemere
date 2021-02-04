
module.exports = {
    name: 'diml_dml_ge',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_ge:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_ge:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_ge:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
