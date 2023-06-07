const oracledb = require('oracledb');
require('dotenv').config();

// Using oracledb node.js driver with outFormat.oracledb.OBJECT option returns json
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient()

exports.connect = () => {
    console.log("Database connection pool 'default' started");
    oracledb.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectionString: process.env.DB_STRING,
        poolAlias: 'default',
    });
}

exports.disconnect = async () => {
    const pool = oracledb.getPool()
    await pool.close(() =>{
        console.log(`Database pool ${pool.poolAlias} closed through app termination`);
        process.exit(0);
    });
}