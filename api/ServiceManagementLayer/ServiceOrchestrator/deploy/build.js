
module.exports = {
    web: {
        dir: '..',
        cmd: 'node web/server.js',
        file: 'web/Dockerfile',
        tag: 'sml_so_web',
        env: {

        }
    },
    gateway: {
        dir: '..',
        cmd: 'node gateway/server.js',
        file: 'gateway/Dockerfile',
        tag: 'sml_so_gw',
        env: {

        }
    }
}