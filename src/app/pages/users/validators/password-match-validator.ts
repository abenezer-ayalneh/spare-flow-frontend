import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export class PasswordMatchValidator {
	static match(controlName: string, matchingControlName: string): ValidatorFn {
		return (formGroup: AbstractControl): ValidationErrors | null => {
			const passwordControl = formGroup.get(controlName)
			const confirmPasswordControl = formGroup.get(matchingControlName)

			if (!passwordControl || !confirmPasswordControl) {
				console.error('Form controls can not be found in the form group!')
				return { controlNotFound: true }
			}

			const error = passwordControl.value !== confirmPasswordControl.value ? { passwordMismatch: true } : null

			confirmPasswordControl.setErrors(error)
			return error
		}
	}
}
