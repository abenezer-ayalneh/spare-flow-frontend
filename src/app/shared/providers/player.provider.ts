import { environment } from '../../../environments/environment'
import { TokenService } from '../services/token.service'
import { User } from '../models/user.model'
import { Router } from '@angular/router'
import { UserService } from '../services/user.service'

const API_URL = environment.apiUrl

export function checkTokenFactory(router: Router, userService: UserService, tokenService: TokenService) {
	return async () => {
		const accessToken = tokenService.getAccessToken()
		try {
			const response = await fetch(`${API_URL}/authentication/check-token`, { headers: { Authorization: `Bearer ${accessToken}` } })
			if (!response.ok) {
				await router.navigateByUrl('/authentication/sign-in')
			} else {
				userService.setUser = (await response.json()) as User
			}
		} catch (error) {
			await router.navigateByUrl('/authentication/sign-in')
			throw error
		}
	}
}
