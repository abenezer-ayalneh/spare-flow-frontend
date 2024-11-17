import { ROLES } from './roles.mock'
import { User } from '../models/user.model'

export const USERS: User[] = [
	{
		id: 1,
		name: 'John Doe',
		username: 'john.doe',
		phoneNumber: '+251987654321',
		role: ROLES[0],
		active: true,
		createdAt: '2024-11-02T11:31:49.681Z',
		updatedAt: '2024-11-02T11:31:49.681Z',
	},
]
