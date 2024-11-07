import { Store } from './store.model'
import { Shelf } from './shelf.model'

export interface Item {
	id: string
	name: string
	partNumber: string
	quantity: number
	location: string
	price: number
	vat: number
	totalPrice: number
	store: Store
	shelf: Shelf
	boughtFrom: 'ORIGINAL' | 'LOCAL'
}
