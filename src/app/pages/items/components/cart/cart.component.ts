import { Component, computed } from '@angular/core'
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog'
import { TranslatePipe } from '@ngx-translate/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatButton, MatIconButton } from '@angular/material/button'
import { TablerIconsModule } from 'angular-tabler-icons'
import { DecimalPipe, NgClass } from '@angular/common'
import { MatIcon } from '@angular/material/icon'
import { CartService } from './cart.service'
import { PageState } from '../../../../shared/enums/page-state.enum'
import { ShelfItemForTable } from '../../types/item-list.type'
import { AdjustmentType } from './types/cart-item.type'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { CreateSalesDto } from './dto/create-sales.dto'
import { ItemsService } from '../../items.service'

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [
		MatDialogContent,
		MatDialogTitle,
		TranslatePipe,
		FormsModule,
		ReactiveFormsModule,
		MatCheckbox,
		TablerIconsModule,
		DecimalPipe,
		MatIconButton,
		MatIcon,
		MatButton,
		NgClass,
		FormErrorMessageComponent,
		MatError,
		MatLabel,
		MatFormField,
		MatInput,
	],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss',
})
export class CartComponent {
	cartFormGroup = new FormGroup({
		client: new FormControl<string>('', { validators: [Validators.required] }),
	})

	pageState = computed<PageState>(() => (this.cartService.cartItems().length > 0 ? PageState.LOADED : PageState.EMPTY))

	selectAll = computed<'ALL' | 'SOME' | 'NONE'>(() => {
		const checkedItemsLength = this.cartService.cartItems().filter((cartItem) => cartItem.selected).length
		if (checkedItemsLength === this.cartService.cartItems().length) return 'ALL'
		else if (checkedItemsLength === 0) return 'NONE'
		else return 'SOME'
	})

	subTotal = computed<number>(() =>
		this.cartService
			.cartItems()
			.filter((cartItem) => cartItem.selected)
			.reduce((previousValue, currentValue) => previousValue + currentValue.quantity * Number(currentValue.shelfItemForTable.Item.price), 0),
	)

	vat = computed<number>(() => this.subTotal() * 0.15)

	total = computed<number>(() => this.subTotal() + this.vat())

	protected readonly PageState = PageState

	protected readonly AdjustmentType = AdjustmentType

	constructor(
		protected readonly cartService: CartService,
		private readonly itemsService: ItemsService,
	) {}

	toggleSelectAll(event: MouseEvent) {
		const checked = (event.target as HTMLInputElement).checked
		this.cartService.setItemsSelectionValue(
			this.cartService.cartItems().map((cartItem) => cartItem.id),
			checked,
		)
	}

	toggleItemSelection(event: MouseEvent, cartItemId: number) {
		const checked = (event.target as HTMLInputElement).checked
		this.cartService.setItemsSelectionValue([cartItemId], checked)
	}

	removeItem(cartItemId: number) {
		this.cartService.removeFromCart([cartItemId])
	}

	removeSelectedItems() {
		this.cartService.removeFromCart(
			this.cartService
				.cartItems()
				.filter((cartItem) => cartItem.selected)
				.map((cartItem) => cartItem.id),
		)
	}

	adjustQuantity(shelfItemForTable: ShelfItemForTable, adjustmentType: AdjustmentType) {
		this.cartService.adjustQuantity(shelfItemForTable, adjustmentType)
	}

	cartFormSubmit() {
		if (this.cartFormGroup.valid) {
			const selectedCartItems = this.cartService.cartItems().filter((cartItem) => cartItem.selected)

			const createSalesDto: CreateSalesDto = {
				clientName: this.cartFormGroup.value.client!,
				itemQuantityPairs: selectedCartItems.map((cartItem) => ({ itemId: cartItem.shelfItemForTable.Item.id, quantity: cartItem.quantity })),
			}

			this.cartService.sellSelectedItemsInTheCart(createSalesDto).subscribe({
				next: () => {
					this.itemsService.getItemsList().subscribe()
					this.cartService.removeFromCart(selectedCartItems.map((item) => item.id))
					this.itemsService.closeModals()
				},
			})
		}
	}
}
