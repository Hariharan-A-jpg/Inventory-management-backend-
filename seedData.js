import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import Inventory from './models/Inventory.js'

dotenv.config()

const seedData = [
  {
    id: 'INV-1001',
    name: 'Wireless Keyboard',
    category: 'Peripherals',
    sku: 'KB-23-WR',
    stock: 38,
    reorderPoint: 20,
    location: 'Aisle 2 • Bin 4',
    price: 59,
    image: 'https://th.bing.com/th/id/OIP.uiRS_VkbVExuMN4iZt6H3gHaD8?w=291&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
  },
  {
    id: 'INV-1002',
    name: '27" 4K Monitor',
    category: 'Displays',
    sku: 'MN-27-4K',
    stock: 14,
    reorderPoint: 10,
    location: 'Aisle 1 • Bin 2',
    price: 329,
    image: 'https://th.bing.com/th/id/OIP.vkbg4pa5IytHiVa9e2JALAHaFd?w=238&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3'
  },
  {
    id: 'INV-1003',
    name: 'USB-C Docking Station',
    category: 'Peripherals',
    sku: 'DK-UC-11',
    stock: 62,
    reorderPoint: 25,
    location: 'Aisle 3 • Bin 1',
    price: 119,
    image: 'https://th.bing.com/th/id/OIP.7dgI8YSf7I7PQyAt0FeTFgHaHa?w=220&h=220&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
  },
  {
    id: 'INV-1004',
    name: 'Noise-Canceling Headset',
    category: 'Audio',
    sku: 'HS-NC-05',
    stock: 9,
    reorderPoint: 15,
    location: 'Aisle 4 • Bin 5',
    price: 189,
    image: 'https://th.bing.com/th/id/OIP.5llEdhnu3yUdIxVchNkyhwHaHa?w=204&h=204&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
  },
  {
    id: 'INV-1005',
    name: 'RJ45 Ethernet Cable 10m',
    category: 'Cables',
    sku: 'CB-45-10',
    stock: 120,
    reorderPoint: 40,
    location: 'Aisle 5 • Bin 3',
    price: 12,
    image: 'https://th.bing.com/th/id/OIP.vkCCA6AFEJITPOV49qT-8wHaHa?w=188&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
  },
  {
    id: 'INV-1006',
    name: 'Portable SSD 1TB',
    category: 'Storage',
    sku: 'SSD-1T-P',
    stock: 27,
    reorderPoint: 18,
    location: 'Aisle 2 • Bin 1',
    price: 149,
    image: 'https://th.bing.com/th/id/OIP.QXnAKaQYgFqgw73OGGHazwAAAA?w=235&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Create demo user
    await User.deleteMany({})
    const user = await User.create({
      name: 'Demo User',
      email: 'demo@inventory.com',
      password: 'inventory123'
    })

    // Create inventory items
    await Inventory.deleteMany({})
    const inventoryItems = seedData.map(item => ({
      ...item,
      userId: user._id
    }))
    await Inventory.insertMany(inventoryItems)

    console.log('Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()