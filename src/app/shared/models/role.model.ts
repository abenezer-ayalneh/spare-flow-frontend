import { User } from './user.model'

export interface Role {
	id: number
	name: string
	description: string
	createdAt: string
	updatedAt: string

	User?: User[]
}
