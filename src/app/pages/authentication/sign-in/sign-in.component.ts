import { Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { FeatherModule } from 'angular-feather'
import { CoreService } from 'src/app/shared/services/core.service'

import { MaterialModule } from '../../../material.module'
import { TranslateModule } from '@ngx-translate/core'
import { APP_NAME } from '../../../shared/constants/shared.constant'
import { FormErrorMessageComponent } from '../../../shared/components/form-error-message/form-error-message.component'
import { AuthenticationService } from '../authentication.service'
import { TokenService } from '../../../shared/services/token.service'

@Component({
	selector: 'app-sign-in',
	standalone: true,
	imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, FeatherModule, TranslateModule, FormErrorMessageComponent],
	templateUrl: './sign-in.component.html',
})
export class SignInComponent {
	options = this.settings.getOptions()
	loginFormGroup = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(4)]),
		password: new FormControl('', [Validators.required]),
	})
	protected readonly APP_NAME = APP_NAME

	constructor(
		private settings: CoreService,
		private router: Router,
		private readonly authenticationService: AuthenticationService,
		private readonly tokenService: TokenService,
	) {}

	get formControls() {
		return this.loginFormGroup.controls
	}

	submit() {
		if (this.loginFormGroup.valid) {
			this.authenticationService.login({ username: this.loginFormGroup.value.username!, password: this.loginFormGroup.value.password! }).subscribe({
				next: (loginResponse) => {
					this.tokenService.storeTokens(loginResponse)
				},
			})
		}
	}
}
