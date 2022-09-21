
module.exports = {
    name: 'sa',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sa:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sa:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sa:prod',
            design: 'services.js',
            env: {}
        }
    }
}
