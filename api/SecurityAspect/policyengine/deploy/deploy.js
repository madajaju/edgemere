
module.exports = {
    name: 'sa_pe',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sa_pe:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sa_pe:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sa_pe:prod',
            design: 'services.js',
            env: {}
        }
    }
}
