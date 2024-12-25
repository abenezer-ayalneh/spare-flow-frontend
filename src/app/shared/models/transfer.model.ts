import { Item } from './item.model'
import { Store } from './store.model'
import { User } from './user.model'

export interface Transfer {
	id: number
	itemId: number
	fromStoreId: number
	toStoreId: number
	userId: number
	status: TransferStatus
	createdAt: string
	updatedAt: string
	Item?: Item
	FromStore?: Store
	ToStore?: Store
	SalesPerson?: User
}

enum TransferStatus {
	INITIATED = 'INITIATED',
	DONE = 'DONE',
}
