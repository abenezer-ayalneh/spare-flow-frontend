import { Shelf } from './shelf.model'
import { Item } from './item.model'

export interface ShelfItem {
	id: number
	itemId: number
	shelfLocationId: number
	quantity: number
	createdAt: string
	updatedAt: string
	ShelfLocation?: Shelf
	Item?: Item
}
