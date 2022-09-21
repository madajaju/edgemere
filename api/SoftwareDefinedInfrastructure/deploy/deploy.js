
module.exports = {
    name: 'sdi',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sdi:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sdi:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sdi:prod',
            design: 'services.js',
            env: {}
        }
    }
}
