import { Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { FeatherModule } from 'angular-feather'
import { CoreService } from 'src/app/shared/services/core.service'

import { MaterialModule } from '../../../material.module'

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, FeatherModule],
	templateUrl: './register.component.html',
})
export class AppRegisterComponent {
	options = this.settings.getOptions()

	constructor(
		private settings: CoreService,
		private router: Router,
	) {}

	form = new FormGroup({
		uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
		email: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	})

	get f() {
		return this.form.controls
	}

	submit() {
		// console.log(this.form.value);
		this.router.navigate(['/'])
	}
}
