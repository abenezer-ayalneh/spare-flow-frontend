import { Component, OnInit } from '@angular/core'
import { MaterialModule } from '../../../../material.module'
import { Store } from '../../../../shared/models/store.model'
import { Shelf } from '../../../../shared/models/shelf.model'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { TranslateModule } from '@ngx-translate/core'
import { ItemsService } from '../../items.service'
import { LoadingService } from '../../../../shared/components/loading/loading.service'
import { finalize } from 'rxjs'
import { CreateItemDto } from '../../dto/create-item.dto'
import { ItemSource } from '../../types/item.type'

@Component({
	selector: 'app-add-item',
	standalone: true,
	imports: [MaterialModule, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule],
	templateUrl: './add-item.component.html',
	styleUrl: './add-item.component.scss',
})
export class AddItemComponent implements OnInit {
	stores: Store[] = []

	shelves: Shelf[] = []

	shelvesUnderSelectedStore: Shelf[] = []

	boughtFromList: string[] = ['ORIGINAL', 'LOCAL']

	addItemFormGroup = new FormGroup({
		name: new FormControl<string>('', { validators: [Validators.required] }),
		partNumber: new FormControl<string>('', { validators: [Validators.required] }),
		quantity: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] }),
		price: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(0.1)] }),
		storeId: new FormControl<number | null>(null, { validators: [Validators.required] }),
		shelfId: new FormControl<number | null>({ value: null, disabled: true }, { validators: [Validators.required] }),
		source: new FormControl<ItemSource | null>(null, { validators: [Validators.required] }),
		description: new FormControl<string>(''),
	})

	protected readonly Boolean = Boolean

	constructor(
		protected readonly itemsService: ItemsService,
		private readonly loadingService: LoadingService,
	) {}

	get formControls() {
		return this.addItemFormGroup.controls
	}

	ngOnInit(): void {
		this.loadingService.loadingOn()

		this.itemsService
			.getStores()
			.pipe(finalize(() => this.loadingService.loadingOff()))
			.subscribe({
				next: (stores) => {
					this.stores = stores
				},
			})

		this.itemsService.getShelves().subscribe({
			next: (shelves) => {
				this.shelves = shelves
			},
		})

		this.formControls.storeId.valueChanges.subscribe({
			next: (storeId: number | null) => {
				this.formControls.shelfId.setValue(null)
				if (storeId) {
					this.formControls.shelfId.enable()
					this.shelvesUnderSelectedStore = this.shelves.filter((shelf) => shelf.storeId === this.addItemFormGroup.controls.storeId.value)
				} else {
					this.shelvesUnderSelectedStore = []
				}
			},
		})
	}

	addItemFormSubmit() {
		if (this.addItemFormGroup.valid) {
			const itemData: CreateItemDto = {
				name: this.addItemFormGroup.value.name!,
				partNumber: this.addItemFormGroup.value.partNumber!,
				price: this.addItemFormGroup.value.price!,
				source: this.addItemFormGroup.value.source!,
				description: this.addItemFormGroup.value.description ?? undefined,
				storeId: this.addItemFormGroup.value.storeId!,
				shelfId: this.addItemFormGroup.value.shelfId!,
				quantity: this.addItemFormGroup.value.quantity!,
			}

			this.itemsService.createItem(itemData).subscribe({
				next: () => {
					this.itemsService.getItemsList().subscribe()
					this.itemsService.closeModals()
				},
			})
		}
	}
}
