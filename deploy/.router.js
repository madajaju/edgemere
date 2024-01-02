module.exports = {
    '/web': {
        target: 'http://web:3000',
        ws: true,
        pathRewrite: {
            '^/web': '/web'
        },
        service: 'web',
        logLevel: 'debug',
        changeOrigin: true
    },
    '/web/socket.io': {
        target: 'http://web:3000',
        ws: true,
        pathRewrite: {
            '^/web/socket.io': '/web/socket.io'
        },
        service: 'web',
        logLevel: 'debug',
        changeOrigin: true
    },
    '/docs': {
        target: 'http://doc:4000',
        ws: true,
        pathRewrite: {
            '^/docs': '/docs/'
        },
        service: 'doc',
        logLevel: 'debug',
        changeOrigin: true
    },
};
