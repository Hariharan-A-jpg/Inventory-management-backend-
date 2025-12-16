import express from 'express'
import { protect } from '../middleware/auth.js'
import {
  getInventory,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateStock
} from '../controllers/inventoryController.js'

const router = express.Router()

router.use(protect) 

router.route('/')
  .get(getInventory)
  .post(createInventoryItem)

router.route('/:id')
  .get(getInventoryItem)
  .put(updateInventoryItem)
  .delete(deleteInventoryItem)

router.patch('/:id/stock', updateStock)

export default router