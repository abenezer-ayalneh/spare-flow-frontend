import { Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { FeatherModule } from 'angular-feather'
import { CoreService } from 'src/app/shared/services/core.service'

import { MaterialModule } from '../../../material.module'
import { TranslateModule } from '@ngx-translate/core'
import { APP_NAME } from '../../../shared/constants/shared.constant'
import { TitleCasePipe } from '@angular/common'
import { FormErrorMessageComponent } from '../../../shared/components/form-error-message/form-error-message.component'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, FeatherModule, TranslateModule, TitleCasePipe, FormErrorMessageComponent],
	templateUrl: './login.component.html',
})
export class AppLoginComponent {
	options = this.settings.getOptions()
	loginFormGroup = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(4)]),
		password: new FormControl('', [Validators.required]),
	})
	protected readonly APP_NAME = APP_NAME

	constructor(
		private settings: CoreService,
		private router: Router,
	) {}

	get formControls() {
		return this.loginFormGroup.controls
	}

	submit() {
		this.router.navigate(['/'])
	}
}
