import { ItemSource } from './item.type'

export interface ShelfItemForTable {
	id: number // ShelfItem ID
	quantity: number
	Item: {
		id: number
		name: string
		price: string
		source: ItemSource
		description: string
		partNumber: string
	}
	ShelfLocation: {
		id: number
		name: string
		Store: {
			id: number
			name: string
		}
	}
}

export interface ItemForTable {
	id: number
	name: string
	partNumber: string
	store: string
	shelf: string
	quantity: number
	price: number
	vat: number
	totalPrice: number
	source: string
	description: string
	original: ShelfItemForTable
}
