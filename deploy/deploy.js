
module.exports = {
    name: 'edgemere',
    contexts: {
        local: {
            type: 'swarm',
            tag: 'edgemere:local',
            design: 'services-small.js',
            env: {}
        },
        dev: {
            type: 'swarm',
            tag: 'edgemere:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'edgemere:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'edgemere:prod',
            design: 'services.js',
            env: {}
        }
    }
}
