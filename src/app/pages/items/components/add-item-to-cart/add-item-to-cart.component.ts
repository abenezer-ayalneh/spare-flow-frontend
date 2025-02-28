import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog'
import { TranslatePipe } from '@ngx-translate/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { MatError } from '@angular/material/form-field'
import { MatButton, MatIconButton } from '@angular/material/button'
import { ItemsService } from '../../items.service'
import { ShelfItemForTable } from '../../types/item-list.type'
import { MatIcon } from '@angular/material/icon'
import { CartService } from '../cart/cart.service'

@Component({
	selector: 'app-add-item-to-cart',
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
		MatIconButton,
		MatIcon,
	],
	templateUrl: './add-item-to-cart.component.html',
	styleUrl: './add-item-to-cart.component.scss',
})
export class AddItemToCartComponent implements OnInit {
	addItemToCartFormGroup = new FormGroup({
		quantity: new FormControl<number>(1, { validators: [Validators.required, Validators.min(1)] }),
	})

	constructor(
		@Inject(MAT_DIALOG_DATA) protected readonly data: ShelfItemForTable,
		private readonly cartService: CartService,
		private readonly itemsService: ItemsService,
	) {}

	get formControls() {
		return this.addItemToCartFormGroup.controls
	}

	ngOnInit() {
		this.setMinimumAvailableQuantity()
	}

	setMinimumAvailableQuantity() {
		const item = this.cartService.cartItems().find((cartItem) => cartItem.id === this.data.id)

		if (item) {
			this.addItemToCartFormGroup.controls.quantity.addValidators([Validators.max(Math.max(this.data.quantity - item.quantity, 0))])
		} else {
			this.addItemToCartFormGroup.controls.quantity.addValidators([Validators.max(this.data.quantity)])
		}
	}

	addItemToCartFormSubmit() {
		if (this.addItemToCartFormGroup.valid) {
			this.cartService.addToCart(this.data, this.addItemToCartFormGroup.value.quantity ?? 1)
			this.itemsService.closeModals()
		}
	}

	changeQuantity(change: 'INCREMENT' | 'DECREMENT') {
		if (change === 'INCREMENT' && this.data.quantity >= Number(this.formControls.quantity.value ?? '0') + 1) {
			this.formControls.quantity.setValue(Number(this.formControls.quantity.value ?? '0') + 1)
		}
		if (change === 'DECREMENT' && Number(this.formControls.quantity.value ?? '0') - 1 >= 1) {
			this.formControls.quantity.setValue(Number(this.formControls.quantity.value ?? '0') - 1)
		}
	}
}
