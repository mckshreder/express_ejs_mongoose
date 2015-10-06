module.exports = {
    mongo: {
        //development environment connection string
        dev: {
            conn: 'mongodb://mckshreder:password@ds041643.mongolab.com:41643/express-ejs_dev'
        },
        //production environment connection string
        prod: {
            conn: 'mongodb://mckshreder:password@ds037283.mongolab.com:37283/express-ejs_prod'
        },
        options:{
            server: {
                socketOptions: { keepAlive: 1 }
            }
        }
    }
};