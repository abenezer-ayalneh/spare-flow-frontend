import { Component, Inject, OnInit } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MaterialModule } from '../../../../material.module'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '../../../../shared/models/store.model'

@Component({
	selector: 'app-add-or-edit-store',
	standalone: true,
	imports: [MaterialModule, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule],
	templateUrl: './add-or-edit-store.component.html',
	styleUrl: './add-or-edit-store.component.scss',
})
export class AddOrEditStoreComponent implements OnInit {
	isEditing: boolean

	addStoreFormGroup = new FormGroup({
		name: new FormControl<string>('', { validators: [Validators.required] }),
		description: new FormControl<string>(''),
	})

	constructor(@Inject(MAT_DIALOG_DATA) private readonly data: Store) {
		this.isEditing = Boolean(this.data)
	}

	get formControls() {
		return this.addStoreFormGroup.controls
	}

	ngOnInit(): void {
		if (this.isEditing)
			this.addStoreFormGroup.patchValue({
				name: this.data.name,
				description: this.data.description,
			})
	}

	addStoreFormSubmit() {
		if (this.addStoreFormGroup.valid) {
			console.log({ formData: this.addStoreFormGroup.value })
		}
	}
}
