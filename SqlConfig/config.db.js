const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    database : process.env.MYSQL_DB,
    password : process.env.PASSWORD,
    port     : process.env.DB_PORT,
});

dbConnection.connect(function(err){
    if(err) throw err; {
       console.log("SQL DB Connection Successful!");
    }
});

module.exports = dbConnection;