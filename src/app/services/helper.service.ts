import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HelperService {
	constructor() {}

	getAccessToken() {
		// TODO get the actual access token here
		return null;
		// return 'access-token';
	}
}
