import { Component, Inject, OnInit } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MaterialModule } from '../../../../material.module'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '../../../../shared/models/store.model'
import { StoresService } from '../../stores.service'

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

	constructor(
		@Inject(MAT_DIALOG_DATA) private readonly data: Store | undefined,
		private readonly storesService: StoresService,
	) {
		this.isEditing = Boolean(this.data)
	}

	get formControls() {
		return this.addStoreFormGroup.controls
	}

	ngOnInit(): void {
		if (this.isEditing && this.data) {
			this.addStoreFormGroup.patchValue({
				name: this.data.name,
				description: this.data.description,
			})
		}
	}

	submitAddStoreForm() {
		if (this.addStoreFormGroup.valid) {
			const storeData = {
				name: this.addStoreFormGroup.value.name!,
				description: this.addStoreFormGroup.value.description ?? undefined,
			}

			if (this.isEditing && this.data) {
				this.storesService.updateStore(this.data.id, storeData).subscribe({
					next: () => {
						this.storesService.getStores().subscribe()
						this.storesService.closeModals()
					},
				})
			} else {
				this.storesService.createStore(storeData).subscribe({
					next: () => {
						this.storesService.getStores().subscribe()
						this.storesService.closeModals()
					},
				})
			}
		}
	}
}
