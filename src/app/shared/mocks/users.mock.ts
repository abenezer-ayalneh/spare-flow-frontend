import { ROLES } from './roles.mock'
import { User } from '../models/user.model'

export const USERS: User[] = [
	{
		id: 1,
		name: 'John Doe',
		username: 'john.doe',
		phoneNumber: '+251987654321',
		roleId: ROLES[0].id,
		Role: ROLES[0],
		active: true,
		createdAt: '2024-11-02T11:31:49.681Z',
		updatedAt: '2024-11-02T11:31:49.681Z',
	},
	{
		id: 7,
		name: 'John D',
		username: 'Architecto dolores b',
		// password: "$2b$10$swuhvA5.kaE0zyj4T/D3ZOEhQdKO5cX78iED/Z9pB5idA.3vz/B62",
		phoneNumber: '+251987654321',
		roleId: 2,
		active: true,
		createdAt: '2024-12-05T19:25:14.320Z',
		updatedAt: '2024-12-05T19:25:14.320Z',
	},
]
