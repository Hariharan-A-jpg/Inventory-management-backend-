import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export const login = async (req, res) => {
  try {
    console.log('Login attempt:', req.body)
    const { email, password } = req.body

    const user = await User.findOne({ email })
    console.log('User found:', user ? 'Yes' : 'No')
    
    if (!user || !(await user.comparePassword(password))) {
      console.log('Invalid credentials')
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)
    console.log('Login successful for:', email)
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.log('Login error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const signup = async (req, res) => {
  try {
    console.log('Signup attempt:', req.body)
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      console.log('User already exists:', email)
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({ name, email, password })
    const token = generateToken(user._id)
    console.log('Signup successful for:', email)

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.log('Signup error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' })
}