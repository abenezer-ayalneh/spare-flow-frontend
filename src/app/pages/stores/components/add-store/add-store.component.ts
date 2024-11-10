import { Component, Inject, OnInit } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MaterialModule } from '../../../../material.module'
import { AsyncPipe } from '@angular/common'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '../../../../shared/models/store.model'

@Component({
	selector: 'app-add-store',
	standalone: true,
	imports: [MaterialModule, AsyncPipe, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule],
	templateUrl: './add-store.component.html',
	styleUrl: './add-store.component.scss',
})
export class AddStoreComponent implements OnInit {
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
