import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog'
import { TranslatePipe } from '@ngx-translate/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatButton } from '@angular/material/button'
import { MatInput } from '@angular/material/input'
import { ItemsService } from '../../items.service'
import { ItemList } from '../../types/item-list.type'

@Component({
	selector: 'app-edit-price',
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
	templateUrl: './edit-price.component.html',
	styleUrl: './edit-price.component.scss',
})
export class EditPriceComponent implements OnInit {
	editPriceFormGroup = new FormGroup({
		price: new FormControl<string>('', Validators.required),
	})

	constructor(
		@Inject(MAT_DIALOG_DATA) private readonly data: ItemList,
		private readonly itemsService: ItemsService,
	) {}

	get formControls() {
		return this.editPriceFormGroup.controls
	}

	ngOnInit(): void {
		this.editPriceFormGroup.patchValue({
			price: this.data.Item.price,
		})
	}

	editPriceFormSubmit() {
		if (this.editPriceFormGroup.valid) {
			this.itemsService.editItemPrice(this.data.Item.id, Number(this.editPriceFormGroup.value.price!)).subscribe({
				next: () => {
					this.itemsService.getItemsList().subscribe()
					this.itemsService.closeModals()
				},
			})
		}
	}
}
