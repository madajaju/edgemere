
module.exports = {
    name: 'diml_dml_dc',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_dc:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_dc:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_dc:prod',
            design: 'services.js',
            env: {}
        }
    }
}
