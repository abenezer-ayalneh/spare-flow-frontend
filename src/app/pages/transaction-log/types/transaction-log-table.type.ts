import { ItemSource } from '../../items/types/item.type'
import { TransactionType } from '../../../shared/models/transaction-log.model'

export interface TransactionLogResponse {
	id: number
	quantity: number
	remainingQuantity: number
	type: TransactionType
	createdAt: string
	Item: {
		id: number
		name: string
		partNumber: string
		price: number
		source: ItemSource
	}
	ResponsibleUser: {
		id: number
		name: string
		username: string
	}
}

export interface TransactionLogForTable {
	id: number
	time: string
	username: string
	itemName: string
	partNumber: string
	price: number
	type: TransactionType
	quantity: number
	remainingQuantity: number
	source: ItemSource
}
