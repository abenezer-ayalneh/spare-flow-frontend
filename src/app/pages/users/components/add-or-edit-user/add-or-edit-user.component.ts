import { Component, Inject, OnInit } from '@angular/core'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MaterialModule } from '../../../../material.module'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { User } from '../../../../shared/models/user.model'
import { Role } from '../../../../shared/models/role.model'
import { UsersService } from '../../users.service'
import { finalize } from 'rxjs'
import { LoadingService } from '../../../../shared/components/loading/loading.service'

@Component({
	selector: 'app-add-or-edit-user',
	standalone: true,
	imports: [MaterialModule, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule],
	templateUrl: './add-or-edit-user.component.html',
	styleUrl: './add-or-edit-user.component.scss',
})
export class AddOrEditUserComponent implements OnInit {
	isEditing: boolean

	roles: Role[] = []

	addUserFormGroup = new FormGroup({
		name: new FormControl<string>('', { validators: [Validators.required] }),
		username: new FormControl<string>('', { validators: [Validators.required] }),
		phoneNumber: new FormControl<string>('', { validators: [Validators.required] }),
		role: new FormControl<number | null>(null, { validators: [Validators.required] }),
		active: new FormControl<boolean>(true, { validators: [Validators.required] }),
	})

	constructor(
		@Inject(MAT_DIALOG_DATA) private readonly data: User,
		private readonly usersService: UsersService,
		private readonly loadingService: LoadingService,
	) {
		this.isEditing = Boolean(this.data)
	}

	get formControls() {
		return this.addUserFormGroup.controls
	}

	ngOnInit(): void {
		this.loadingService.loadingOn()

		this.usersService
			.getRoles()
			.pipe(finalize(() => this.loadingService.loadingOff()))
			.subscribe({
				next: (roles) => {
					this.roles = roles
				},
			})

		if (this.isEditing)
			this.addUserFormGroup.patchValue({
				name: this.data.name,
				phoneNumber: this.data.phoneNumber,
				username: this.data.username,
				role: this.data.role.id,
				active: this.data.active,
			})
	}

	addUserFormSubmit() {
		if (this.addUserFormGroup.valid) {
			console.log({ formData: this.addUserFormGroup.value })
		}
	}
}
