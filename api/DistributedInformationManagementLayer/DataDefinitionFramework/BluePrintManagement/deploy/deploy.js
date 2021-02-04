
module.exports = {
    name: 'diml_ddf_bpm',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_ddf_bpm:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_ddf_bpm:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_ddf_bpm:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
