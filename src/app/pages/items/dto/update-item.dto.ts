import { ItemSource } from '../types/item.type'

export class UpdateItemDto {
	name: string

	partNumber: string

	description?: string

	source: ItemSource

	storeId: number

	shelfId: number

	shelfItemId: number
}
