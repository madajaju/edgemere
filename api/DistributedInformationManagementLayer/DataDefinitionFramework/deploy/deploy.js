
module.exports = {
    name: 'diml_dff',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
