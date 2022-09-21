
module.exports = {
    name: 'dimlcds',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds:prod',
            design: 'services.js',
            env: {}
        }
    }
}
