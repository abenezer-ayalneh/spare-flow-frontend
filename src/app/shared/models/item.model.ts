import { ItemSource } from '../../pages/items/types/item.type'
import { ShelfItem } from './shelf-item.model'
import { Sale } from './sale.model'
import { Transfer } from './transfer.model'

export interface Item {
	id: string
	name: string
	partNumber: string
	description: string
	price: number
	source: ItemSource
	createdAt: string
	updatedAt: string
	ShelfItem: ShelfItem[]
	Sale?: Sale[]
	Transfer?: Transfer[]
}
