const { Pool, Client } = require('pg')


const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';



var pool = new Pool();
var connection = pool.connect((err) => {
  if (err) {
    console.log("Error ", err) 
  }
});

module.exports = {connection: connection} 