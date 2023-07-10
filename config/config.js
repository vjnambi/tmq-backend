require('dotenv').config();

module.exports = {
    "development": {
        "username": "root",
        "password": "BigPotato",
        "database": "tmqdb",
        "host": "localhost",
        "dialect": "mysql"
    },
    "test": {
        "username": "tmqadmin",
        "password": process.env.MYSQL_PASSWORD,
        "database": "thrensmusicquizdb",
        "host": "thrensmusicquizsrvr.mysql.database.azure.com",
        "dialect": "mysql"
    },
    "production": {
        "username": "tmqadmin",
        "password": process.env.MYSQL_PASSWORD,
        "database": "thrensmusicquizdb",
        "host": "thrensmusicquizsrvr.mysql.database.azure.com",
        "dialect": "mysql"
    }
};