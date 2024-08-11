import postgres from 'postgres';
// import postgres = require('postgres')
export const sql = postgres({ /* options */}); // will use psql environment variables
export default sql;
