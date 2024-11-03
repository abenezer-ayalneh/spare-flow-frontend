import { Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'

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

	/**
	 * Get the desired error message based on form field error type
	 */
	getFormFieldError(control: FormControl) {
		if (control.touched && control.errors) {
			if (control.errors['required']) {
				return ' Field is required.'
			}

			if (control.errors['minlength']) {
				return `The value you input is ${control.errors['minlength']['actualLength']} characters long.It should be at least ${control.errors['minlength']['requiredLength']} characters long.`
			}

			if (control.errors['maxLength']) {
				return ` The value you input is ${control.errors['maxLength']['actualLength']} characters long. It should be at most ${control.errors['maxLength']['requiredLength']} characters long.`
			}

			if (control.errors['email']) {
				return ' You must enter a valid email.'
			}

			if (control.errors['min']) {
				return ` Value too low. Must be at least ${control.errors['min']['min']}`
			}

			if (control.errors['max']) {
				return ` Value too high. Must be at least ${control.errors['min']['min']}`
			}

			if (control.errors['pattern']) {
				return ' Password must be at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
			}

			if (control.errors['noMatch']) {
				return ' Passwords do not match.'
			}

			if (control.errors['emailTaken']) {
				return ' Email taken. Please try another email.'
			}
		}

		return null
	}
}
