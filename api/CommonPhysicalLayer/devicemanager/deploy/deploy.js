
module.exports = {
    name: 'cpl_dm',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_dm:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_dm:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_dm:prod',
            design: 'services.js',
            env: {}
        }
    }
}
