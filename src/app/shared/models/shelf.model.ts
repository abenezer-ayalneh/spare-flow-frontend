import { Store } from './store.model'

export interface Shelf {
	id: number
	name: string
	description: string
	store: Store
	createdAt: string
	updatedAt: string
}
