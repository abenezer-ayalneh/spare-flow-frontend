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
import { TitleCasePipe } from '@angular/common'
import { CreateUserDto } from '../../dto/create-user.dto'
import { PasswordMatchValidator } from '../../validators/password-match-validator'
import { UserService } from '../../../../shared/services/user.service'

@Component({
	selector: 'app-add-or-edit-user',
	standalone: true,
	imports: [MaterialModule, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule, TitleCasePipe],
	templateUrl: './add-or-edit-user.component.html',
	styleUrl: './add-or-edit-user.component.scss',
})
export class AddOrEditUserComponent implements OnInit {
	isEditing: boolean

	isSelfUpdate = false

	roles: Role[] = []

	addUserFormGroup = new FormGroup(
		{
			name: new FormControl<string>('', { validators: [Validators.required] }),
			username: new FormControl<string>('', { validators: [Validators.required] }),
			phoneNumber: new FormControl<string>('', { validators: [Validators.required] }),
			role: new FormControl<number | null>(null, { validators: [Validators.required] }),
			password: new FormControl<string>(''),
			confirmPassword: new FormControl<string>(''),
			active: new FormControl<boolean>(true, { validators: [Validators.required] }),
		},
		{ validators: [PasswordMatchValidator.match('password', 'confirmPassword')] },
	)

	constructor(
		private readonly usersService: UsersService,
		private readonly loadingService: LoadingService,
		protected readonly userService: UserService,
		@Inject(MAT_DIALOG_DATA) private readonly data: User | undefined,
	) {
		this.isEditing = Boolean(this.data)
	}

	get formControls() {
		return this.addUserFormGroup.controls
	}

	ngOnInit(): void {
		this.loadingService.loadingOn()

		if (this.data && this.userService.getUser.getValue()?.id === this.data.id) {
			this.isSelfUpdate = true
			this.formControls.role.disable()
			this.formControls.active.disable()
		}

		this.usersService
			.getRoles()
			.pipe(finalize(() => this.loadingService.loadingOff()))
			.subscribe({
				next: (roles) => {
					this.roles = roles
				},
			})

		if (this.isEditing && this.data) {
			this.formControls.password.disable()
			this.formControls.confirmPassword.disable()
			this.addUserFormGroup.patchValue({
				name: this.data.name,
				phoneNumber: this.data.phoneNumber,
				username: this.data.username,
				role: this.data.roleId,
				active: this.data.active,
			})
		} else {
			this.formControls.password.addValidators([Validators.required, Validators.minLength(4)])
			this.formControls.confirmPassword.addValidators([Validators.required, Validators.minLength(4)])
		}
	}

	addUserFormSubmit() {
		if (this.addUserFormGroup.valid) {
			const userDto: CreateUserDto = {
				name: this.addUserFormGroup.value.name!,
				username: this.addUserFormGroup.value.username!,
				phoneNumber: this.addUserFormGroup.value.phoneNumber!,
				roleId: this.addUserFormGroup.value.role!,
				password: this.addUserFormGroup.value.password!,
				confirmPassword: this.addUserFormGroup.value.confirmPassword!,
				active: this.addUserFormGroup.value.active!,
			}

			if (this.isEditing && this.data) {
				this.usersService.updateUser(this.data.id, userDto).subscribe({
					next: () => {
						this.usersService.getUsers().subscribe()
						this.usersService.closeModals()
					},
				})
			} else {
				this.usersService.createUser(userDto).subscribe({
					next: () => {
						this.usersService.getUsers().subscribe()
						this.usersService.closeModals()
					},
				})
			}
		}
	}
}
