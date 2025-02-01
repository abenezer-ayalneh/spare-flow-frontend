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
	selector: 'app-sell-item',
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
	templateUrl: './sell-item.component.html',
	styleUrl: './sell-item.component.scss',
})
export class SellItemComponent {
	sellItemFormGroup = new FormGroup({
		client: new FormControl<string>('', { validators: [Validators.required] }),
		quantity: new FormControl<string>('', { validators: [Validators.required] }),
	})

	constructor(
		@Inject(MAT_DIALOG_DATA) private readonly data: ShelfItemForTable,
		private readonly itemsService: ItemsService,
	) {}

	get formControls() {
		return this.sellItemFormGroup.controls
	}

	sellItemFormSubmit() {
		if (this.sellItemFormGroup.valid) {
			this.itemsService
				.sellItem({
					clientName: this.sellItemFormGroup.value.client!,
					itemId: this.data.Item.id,
					quantity: Number(this.sellItemFormGroup.value.quantity)!,
				})
				.subscribe({
					next: () => {
						this.itemsService.getItemsList().subscribe()
						this.itemsService.closeModals()
					},
				})
		}
	}
}
