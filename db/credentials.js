module.exports = {
    mongo: {
        //development environment connection string
        dev: {
            conn: process.env.DEV_CONN_STRING//'mongodb://mckshreder:password@ds041643.mongolab.com:41643/express-ejs_dev'
        },
        //production environment connection string
        prod: {
            conn: process.env.PROD_CONN_STRING//'mongodb://mckshreder:password@ds037283.mongolab.com:37283/express-ejs_prod'
        },
        options:{
            server: {
                socketOptions: { keepAlive: 1 }
            }
        }
    }
}; 