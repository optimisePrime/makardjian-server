const axios = require('axios');

const iterations = 200;

// Helper to get random number from 1-10M
const get1To10M = () => Math.floor(Math.random() * 9900000);

// Logs the Read average time for querying the server with a certain # of requests.
const ReadDB = async (dbName, port) => {
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    const now = Date.now();
    const location = `http://localhost:${port}/products/${get1To10M()}`;
    await axios.get(location);
    const later = Date.now();
    sum += later - now;
  }
  console.log(`${dbName} ${iterations} READs avg: `, sum / iterations, 'ms');
};

// // Log READ averages for both dbs and log the results

ReadDB('Postgres', 3004);
//ReadDB('Cassandra', 3005);
