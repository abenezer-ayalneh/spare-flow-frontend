import { User } from './user.model'
import { Item } from './item.model'

export interface Sale {
	id: number
	itemId: number
	clientName: string
	userId: number
	quantity: number
	price: number
	status: SaleStatus
	createdAt: string
	updatedAt: string
	Item?: Item
	SalesPerson?: User
}

enum SaleStatus {
	PENDING = 'PENDING',
	PRINTED = 'PRINTED',
}
