import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { SignInCredential, SignInResponse } from './types/authentication.type'
import { User } from '../../shared/models/user.model'

const API_URL = environment.apiUrl

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	constructor(private readonly httpClient: HttpClient) {}

	login(credentials: SignInCredential) {
		return this.httpClient.post<SignInResponse>(`${API_URL}/authentication/sign-in`, credentials)
	}

	checkToken() {
		return this.httpClient.get<User>(`${API_URL}/authentication/check-token`)
	}
}
