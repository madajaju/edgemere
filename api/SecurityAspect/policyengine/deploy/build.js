
module.exports = {
    engine: {
        dir: '..',
        cmd: 'node web/server.js',
        file: 'engine/Dockerfile',
        tag: 'sa_pe_engine',
        env: {
        }
    },
    web: {
        dir: '..',
        cmd: 'node web/server.js',
        file: 'engine/Dockerfile',
        tag: 'sa_pe_web',
        env: {
        }
    }
}
