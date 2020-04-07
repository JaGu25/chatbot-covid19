const { Client } = require('pg')
const CONFIG = require('./../config/config');

const connectionData = {
    user: CONFIG.CONFIG.DB.USER,
    host: CONFIG.CONFIG.DB.DB_URL,
    database: CONFIG.CONFIG.DB.DB,
    password: CONFIG.CONFIG.DB.PASS,
    port: CONFIG.CONFIG.DB.PORT,
}
const db = new Client(connectionData)

db.connect();
module.exports = db;