import { Role } from './role.model'

export interface User {
	id: number
	name: string
	username: string
	phoneNumber: string
	role: Role
	active: boolean
	createdAt: string
	updatedAt: string
}
