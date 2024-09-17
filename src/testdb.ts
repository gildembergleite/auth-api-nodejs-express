import pool from './database'

const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()')
    console.log('Connection successful:', res.rows)
  } catch (err) {
    console.error('Connection error:', err)
  } finally {
    pool.end()
  }
}

testConnection()
