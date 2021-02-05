
module.exports = {
    name: 'sml_em',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_em:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_em:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_em:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
