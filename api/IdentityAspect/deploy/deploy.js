
module.exports = {
    name: 'ia',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'ia:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'ia:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'ia:prod',
            design: 'services.js',
            env: {}
        }
    }
}
