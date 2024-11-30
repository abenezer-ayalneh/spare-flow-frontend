import { Injectable } from '@angular/core'
import { SignInResponse } from '../../pages/authentication/types/authentication.type'

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	constructor() {}

	/**
	 * Gets the access token from storage
	 */
	getAccessToken() {
		return localStorage.getItem('accessToken')
	}

	storeTokens(signInResponse: SignInResponse) {
		localStorage.setItem('accessToken', signInResponse.accessToken)
		localStorage.setItem('refreshToken', signInResponse.refreshToken)
	}
}
