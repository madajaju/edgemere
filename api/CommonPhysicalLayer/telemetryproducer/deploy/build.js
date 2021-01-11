
module.exports = {
    producer: {
        dir: '..',
        cmd: 'node producer/server.js',
        file: 'producer/Dockerfile',
        tag: 'cpl_tp_producer',
        env: {
        }
    },
    tester: {
        dir: '..',
        cmd: 'node tester/server.js',
        file: 'tester/Dockerfile',
        tag: 'cpl_tp_tester',
        env: {
        }
    },
}
