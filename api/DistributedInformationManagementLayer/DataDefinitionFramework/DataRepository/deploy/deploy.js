
module.exports = {
    name: 'diml_ddf_dr',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_dr:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_dr:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_dr:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
