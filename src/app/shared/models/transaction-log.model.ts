import { Item } from './item.model'
import { User } from './user.model'

export interface TransactionLog {
	id: number
	userId: number
	itemId: number
	quantity: number
	type: TransactionType
	remainingQuantity: number
	createdAt: string

	Item?: Item
	ResponsibleUser?: User
}

export enum TransactionType {
	DEBIT = 'DEBIT',
	CREDIT = 'CREDIT',
}
