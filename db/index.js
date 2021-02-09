const { Pool } = require('pg')
const pool = new Pool()

module.exports = {
  query: (query) => pool.query(query),
}