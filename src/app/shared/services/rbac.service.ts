import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UserService } from './user.service'
import { Role as RoleEnum } from '../enums/role.enum'
import { Role } from '../models/role.model'

@Injectable({
	providedIn: 'root',
})
export class RbacService {
	constructor(
		private readonly httpClient: HttpClient,
		private readonly userService: UserService,
	) {}

	/**
	 * Checks if the authenticated user has the requested role
	 * @param roles
	 */
	isGranted(roles: RoleEnum[]): boolean {
		const user = this.userService.user
		if (!user || !user.Role || !user.Role.name) {
			return false
		}

		return roles.some((role) => user.Role?.name === role)
	}

	getRoles() {
		return this.httpClient.get<Role[]>(`roles`)
	}
}
