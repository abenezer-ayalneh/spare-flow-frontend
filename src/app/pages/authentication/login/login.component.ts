import { Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { FeatherModule } from 'angular-feather'
import { CoreService } from 'src/app/shared/services/core.service'

import { MaterialModule } from '../../../material.module'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, FeatherModule],
	templateUrl: './login.component.html',
})
export class AppLoginComponent {
	options = this.settings.getOptions()

	constructor(
		private settings: CoreService,
		private router: Router,
	) {}

	loginFormGroup = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(4)]),
		password: new FormControl('', [Validators.required]),
	})

	get formControls() {
		return this.loginFormGroup.controls
	}

	submit() {
		// console.log(this.form.value);
		this.router.navigate(['/'])
	}
}
