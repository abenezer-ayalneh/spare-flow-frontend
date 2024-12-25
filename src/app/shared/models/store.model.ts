import { Shelf } from './shelf.model'
import { Transfer } from './transfer.model'

export interface Store {
	id: number
	name: string
	description: string
	createdAt: string
	updatedAt: string
	Shelf?: Shelf[]
	SentTransfers?: Transfer[]
	ReceivedTransfers?: Transfer[]
}
