import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { SignInCredential, SignInResponse } from './types/authentication.type'
import { User } from '../../shared/models/user.model'

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	constructor(private readonly httpClient: HttpClient) {}

	login(credentials: SignInCredential) {
		return this.httpClient.post<SignInResponse>(`authentication/sign-in`, credentials)
	}

	checkToken() {
		return this.httpClient.get<User>(`authentication/check-token`)
	}
}
