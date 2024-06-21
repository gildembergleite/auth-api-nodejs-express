import bcrypt from 'bcryptjs'

interface User {
  id: string
  email: string
  password: string
}

const users: User[] = []

export const createUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
  }
  users.push(newUser)
  return newUser
}

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email)
}
