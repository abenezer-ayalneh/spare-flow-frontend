import { Store } from './store.model'

export interface Shelf {
	id: number
	name: string
	description: string
	storeId: number
	Store?: Store
	createdAt: string
	updatedAt: string
}
