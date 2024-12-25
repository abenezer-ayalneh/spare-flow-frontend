import { Store } from './store.model'
import { ShelfItem } from './shelf-item.model'

export interface Shelf {
	id: number
	name: string
	description: string
	storeId: number
	createdAt: string
	updatedAt: string
	Store?: Store
	ShelfItem?: ShelfItem[]
}
