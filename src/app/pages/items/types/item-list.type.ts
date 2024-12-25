import { ItemSource } from './item.type'

export type ItemList = {
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
