
module.exports = {
    name: 'cpl_da',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_da:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_da:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_da:prod',
            design: 'services.js',
            env: {}
        }
    }
}
