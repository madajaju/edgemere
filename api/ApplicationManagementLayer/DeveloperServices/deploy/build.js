
module.exports = {
    web: {
        dir: '..',
        cmd: 'node web/server.js',
        file: 'web/Dockerfile',
        tag: 'aml_ds_web',
        env: {

        }
    },
    gateway: {
        dir: '..',
        cmd: 'node gateway/server.js',
        file: 'gateway/Dockerfile',
        tag: 'aml_ds_gw',
        env: {

        }
    }
}