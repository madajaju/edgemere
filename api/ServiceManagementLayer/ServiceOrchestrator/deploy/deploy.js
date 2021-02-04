
module.exports = {
    name:'sml_so',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_so:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_so:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_so:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
