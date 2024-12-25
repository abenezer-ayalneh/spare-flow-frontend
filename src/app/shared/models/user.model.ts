import { Role } from './role.model'
import { Transfer } from './transfer.model'
import { Sale } from './sale.model'

export interface User {
	id: number
	name: string
	username: string
	phoneNumber: string
	roleId: number
	active: boolean
	createdAt: string
	updatedAt: string

	Role?: Role
	Transfer?: Transfer[]
	Sale?: Sale[]
}
