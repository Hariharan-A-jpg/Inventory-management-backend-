import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import authRoutes from './routes/auth.js'
import inventoryRoutes from './routes/inventory.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Inventory API is running!' })
})
app.use('/api/auth', authRoutes)
app.use('/api/inventory', inventoryRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})