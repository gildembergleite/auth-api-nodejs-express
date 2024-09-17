import express from 'express'
import authRoutes from './routes/auth-routes'

const app = express()

app.use(express.json())
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
