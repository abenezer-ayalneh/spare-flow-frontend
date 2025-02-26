import { ShelfItemForTable } from '../../../types/item-list.type'

export class AddItemToCartDto {
	shelfItem: ShelfItemForTable

	quantity: number
}
