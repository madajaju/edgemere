
module.exports = {
    name: 'diml_dml_do',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_do:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_do:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_do:prod',
            design: 'services.js',
            env: {}
        }
    }
}
