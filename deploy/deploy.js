
module.exports = {
    name: 'edgemere',
    contexts: {
        local: {
            type: 'swarm',
            tag: 'edgemere:local',
            file: 'docker-compose.yml',
            design: 'services-small.js',
            env: {}
        },
        dev: {
            type: 'swarm',
            tag: 'edgemere:dev',
            file: 'docker-compose-full.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'edgemere:test',
            file: 'docker-compose-full.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'edgemere:prod',
            file: 'docker-compose-full.yml',
            design: 'services.js',
            env: {}
        }
    }
}
