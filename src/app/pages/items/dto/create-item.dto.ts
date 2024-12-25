import { ItemSource } from '../types/item.type'

export class CreateItemDto {
	name: string

	partNumber: string

	description?: string

	price: number

	source: ItemSource

	quantity: number

	storeId: number

	shelfId: number
}
