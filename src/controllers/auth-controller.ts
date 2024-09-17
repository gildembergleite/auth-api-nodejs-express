import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { createUser, findUserByEmail } from '../models/user-model'
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generate-tokens'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existingUser = await findUserByEmail(email)
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' })
  }
  const newUser = await createUser(email, password)
  res.status(201).json(newUser)
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await findUserByEmail(email)
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }
  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken(user.id)
  res.json({ accessToken, refreshToken })
}
