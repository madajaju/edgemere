
module.exports = {
    name: 'sdi_io',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sdi_io:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sdi_io:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sdi_io:prod',
            design: 'services.js',
            env: {}
        }
    }
}
