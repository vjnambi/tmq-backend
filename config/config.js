require('dotenv').config();

module.exports = {
    "development": {
        "username": "vjnambi",
        "password": process.env.MYSQL_PASSWORD,
        "database": "thrensmusicquizdb",
        "host": "thre.mysql.database.azure.com",
        "dialect": "mysql"
    },
    "test": {
        "username": "vjnambi",
        "password": process.env.MYSQL_PASSWORD,
        "database": "thrensmusicquizdb",
        "host": "vjnambidb.mysql.database.azure.com",
        "dialect": "mysql"
    },
    "production": {
        "username": "vjnambi",
        "password": process.env.MYSQL_PASSWORD,
        "database": "thrensmusicquizdb",
        "host": "vjnambidb.mysql.database.azure.com",
        "dialect": "mysql"
    }
};