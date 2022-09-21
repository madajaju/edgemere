
module.exports = {
    web: {
        dir: '.',
        cmd: 'node web/server.js',
        file: 'web/Dockerfile',
        tag: 'diml_dml_web',
        env: {

        }
    },
    gateway: {
        dir: '.',
        cmd: 'node gateway/server.js',
        file: 'gateway/Dockerfile',
        tag: 'diml_dml_gw',
        env: {

        }
    }
}
