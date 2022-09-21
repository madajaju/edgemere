
module.exports = {
    name: 'diml_dml_fmdm',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_fmdm:dev',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_fmdm:test',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_fmdm:prod',
            design: 'services.js',
            env: {}
        }
    }
}
