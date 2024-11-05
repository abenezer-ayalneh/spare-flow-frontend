import { Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

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
