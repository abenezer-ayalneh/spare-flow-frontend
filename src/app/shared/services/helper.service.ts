import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class HelperService {
	constructor() {}

	/**
	 * Gets the access token from storage
	 */
	getAccessToken() {
		// TODO get the actual access token here
		// return null;
		return 'access-token'
	}
}
