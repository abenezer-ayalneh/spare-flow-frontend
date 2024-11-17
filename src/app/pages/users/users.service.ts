import { Injectable } from '@angular/core'
import { User } from '../../shared/models/user.model'
import { delay, of } from 'rxjs'
import { USERS } from '../../shared/mocks/users.mock'
import { Role } from '../../shared/models/role.model'
import { ROLES } from '../../shared/mocks/roles.mock'
import { MOCK_DELAY } from '../../shared/constants/shared.constant'

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	constructor() {}

	getUsers() {
		return of<User[]>(USERS).pipe(delay(MOCK_DELAY))
	}

	getRoles() {
		return of<Role[]>(ROLES).pipe(delay(MOCK_DELAY))
	}
}
