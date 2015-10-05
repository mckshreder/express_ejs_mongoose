module.exports = {
    mongo: {
        //development environment connection string
        dev: {
            conn: 'mongodb://localhost/express_dev'
        },
        //production environment connection string
        prod: {
            conn: 'mongodb://localhost/express_prod'
        },
        options:{
            server: {
                socketOptions: { keepAlive: 1 }
            }
        }
    }
};