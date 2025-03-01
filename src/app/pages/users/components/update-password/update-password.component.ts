import { Component, Inject } from '@angular/core'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MaterialModule } from '../../../../material.module'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { User } from '../../../../shared/models/user.model'
import { UsersService } from '../../users.service'
import { CreateUserDto } from '../../dto/create-user.dto'
import { PasswordMatchValidator } from '../../validators/password-match-validator'

@Component({
	selector: 'app-update-password',
	standalone: true,
	imports: [MaterialModule, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule],
	templateUrl: './update-password.component.html',
	styleUrl: './update-password.component.scss',
})
export class UpdatePasswordComponent {
	updateUserPasswordFormGroup = new FormGroup(
		{
			password: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(4)] }),
			confirmPassword: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(4)] }),
		},
		{ validators: [PasswordMatchValidator.match('password', 'confirmPassword')] },
	)

	constructor(
		@Inject(MAT_DIALOG_DATA) private readonly data: User,
		private readonly usersService: UsersService,
	) {}

	get formControls() {
		return this.updateUserPasswordFormGroup.controls
	}

	updateUserPasswordFormSubmit() {
		if (this.updateUserPasswordFormGroup.valid) {
			const userDto: Pick<CreateUserDto, 'password' | 'confirmPassword'> = {
				password: this.updateUserPasswordFormGroup.value.password!,
				confirmPassword: this.updateUserPasswordFormGroup.value.confirmPassword!,
			}

			this.usersService.updateUserPassword(this.data.id, userDto).subscribe({
				next: () => {
					this.usersService.closeModals()
				},
			})
		}
	}
}
