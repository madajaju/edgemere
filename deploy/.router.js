module.exports = {
    'aml': {
        target: 'http://aml:3000',
        ws: true,
        pathRewrite: {
            '^aml': '/aml'
        },
        service: 'aml',
        logLevel: 'debug',
        changeOrigin: true
    },
    'cpl': {
        target: 'http://cpl:3000',
        ws: true,
        pathRewrite: {
            '^cpl': '/cpl'
        },
        service: 'cpl',
        logLevel: 'debug',
        changeOrigin: true
    },
    'diml': {
        target: 'http://diml:3000',
        ws: true,
        pathRewrite: {
            '^diml': '/diml'
        },
        service: 'diml',
        logLevel: 'debug',
        changeOrigin: true
    },
    'ia': {
        target: 'http://ia:3000',
        ws: true,
        pathRewrite: {
            '^ia': '/ia'
        },
        service: 'ia',
        logLevel: 'debug',
        changeOrigin: true
    },
    'sa': {
        target: 'http://sa:3000',
        ws: true,
        pathRewrite: {
            '^sa': '/sa'
        },
        service: 'sa',
        logLevel: 'debug',
        changeOrigin: true
    },
    'sml': {
        target: 'http://sml:3000',
        ws: true,
        pathRewrite: {
            '^sml': '/sml'
        },
        service: 'sml',
        logLevel: 'debug',
        changeOrigin: true
    },
    'sdi': {
        target: 'http://sdi:3000',
        ws: true,
        pathRewrite: {
            '^sdi': '/sml'
        },
        service: 'sdi',
        logLevel: 'debug',
        changeOrigin: true
    },
    'web': {
        target: 'http://web:3000',
        ws: true,
        pathRewrite: {
            '^web': '/web'
        },
        service: 'web',
        logLevel: 'debug',
        changeOrigin: true
    },
    'web': {
        target: 'http://doc:8088',
        ws: true,
        pathRewrite: {
            '^web': '/doc'
        },
        service: 'doc',
        logLevel: 'debug',
        changeOrigin: true
    },
};
