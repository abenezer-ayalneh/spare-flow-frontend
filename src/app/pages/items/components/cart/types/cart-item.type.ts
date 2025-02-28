import { ShelfItemForTable } from '../../../types/item-list.type'

export interface CartItem {
	id: number
	shelfItemForTable: ShelfItemForTable
	quantity: number
	selected: boolean
}

export enum AdjustmentType {
	INCREMENT,
	DECREMENT,
}
