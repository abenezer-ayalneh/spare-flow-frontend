import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog'
import { TranslatePipe } from '@ngx-translate/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatButton } from '@angular/material/button'
import { MatInput } from '@angular/material/input'
import { ItemsService } from '../../items.service'
import { ShelfItemForTable } from '../../types/item-list.type'

@Component({
	selector: 'app-edit-quantity',
	standalone: true,
	imports: [
		MatDialogContent,
		MatDialogTitle,
		TranslatePipe,
		FormsModule,
		ReactiveFormsModule,
		FormErrorMessageComponent,
		MatError,
		MatButton,
		MatLabel,
		MatFormField,
		MatInput,
	],
	templateUrl: './edit-quantity.component.html',
	styleUrl: './edit-quantity.component.scss',
})
export class EditQuantityComponent {
	editQuantityFormGroup = new FormGroup({
		quantity: new FormControl<string>('', { validators: [Validators.required] }),
	})

	constructor(
		@Inject(MAT_DIALOG_DATA) private readonly data: ShelfItemForTable,
		private readonly itemsService: ItemsService,
	) {}

	get formControls() {
		return this.editQuantityFormGroup.controls
	}

	editQuantityFormSubmit() {
		if (this.editQuantityFormGroup.valid) {
			this.itemsService.editItemQuantity(this.data.id, Number(this.editQuantityFormGroup.value.quantity!)).subscribe({
				next: () => {
					this.itemsService.getItemsList().subscribe()
					this.itemsService.closeModals()
				},
			})
		}
	}
}
