
module.exports = {
    name: 'dimlcds',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
