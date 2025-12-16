import Inventory from '../models/Inventory.js'

export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find({ userId: req.user._id })
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findOne({ 
      id: req.params.id, 
      userId: req.user._id 
    })
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createInventoryItem = async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      id: `INV-${Date.now().toString().slice(-6)}`,
      userId: req.user._id
    }
    const item = await Inventory.create(itemData)
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findOneAndUpdate(
      { id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    )
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findOneAndDelete({ 
      id: req.params.id, 
      userId: req.user._id 
    })
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }
    res.json({ message: 'Item deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateStock = async (req, res) => {
  try {
    const { delta } = req.body
    const item = await Inventory.findOne({ 
      id: req.params.id, 
      userId: req.user._id 
    })
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    item.stock = Math.max(0, item.stock + delta)
    await item.save()
    
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}