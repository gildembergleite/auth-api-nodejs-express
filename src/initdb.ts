import pool from './database'

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
      )
    `)
    console.log('Users table created')
  } catch (err) {
    console.error('Error creating table:', err)
  } finally {
    pool.end()
  }
}

createTable().then(() => process.exit())
