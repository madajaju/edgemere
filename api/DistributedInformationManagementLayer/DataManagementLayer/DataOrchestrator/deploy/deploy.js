
module.exports = {
    name: 'diml_dml_do',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_do:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_do:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_do:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
