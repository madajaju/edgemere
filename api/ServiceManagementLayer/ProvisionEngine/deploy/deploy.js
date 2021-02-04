
module.exports = {
    name: 'sml_pe',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_pe:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_pe:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_pe:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
