import bcrypt from 'bcryptjs'
import pool from '../database'

interface User {
  id: string
  email: string
  password: string
}

export const createUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { id: Date.now().toString(), email, password: hashedPassword }
  await pool.query(
    'INSERT INTO users (id, email, password) VALUES ($1, $2, $3)',
    [newUser.id, newUser.email, newUser.password],
  )
  return newUser
}

export const findUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  if (res.rows.length > 0) {
    return res.rows[0] as User
  } else {
    return undefined
  }
}
