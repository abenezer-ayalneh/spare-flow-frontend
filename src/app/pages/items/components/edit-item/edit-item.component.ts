import { Component, Inject, OnInit } from '@angular/core'
import { MaterialModule } from '../../../../material.module'
import { Store } from '../../../../shared/models/store.model'
import { Shelf } from '../../../../shared/models/shelf.model'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { TranslateModule } from '@ngx-translate/core'
import { ItemsService } from '../../items.service'
import { LoadingService } from '../../../../shared/components/loading/loading.service'
import { finalize } from 'rxjs'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ShelfItem } from '../../types/item-list.type'
import { ItemSource } from '../../types/item.type'
import { UpdateItemDto } from '../../dto/update-item.dto'

@Component({
	selector: 'app-edit-item',
	standalone: true,
	imports: [MaterialModule, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule],
	templateUrl: './edit-item.component.html',
	styleUrl: './edit-item.component.scss',
})
export class EditItemComponent implements OnInit {
	stores: Store[] = []

	shelves: Shelf[] = []

	shelvesUnderSelectedStore: Shelf[] = []

	boughtFromList: string[] = ['ORIGINAL', 'LOCAL']

	itemToEdit?: ShelfItem

	editItemFormGroup = new FormGroup({
		name: new FormControl<string>('', { validators: [Validators.required] }),
		partNumber: new FormControl<string>('', { validators: [Validators.required] }),
		description: new FormControl<string>(''),
		storeId: new FormControl<number | null>(null, { validators: [Validators.required] }),
		shelfId: new FormControl<number | null>(null, { validators: [Validators.required] }),
		source: new FormControl<ItemSource | null>(null, { validators: [Validators.required] }),
	})

	protected readonly Boolean = Boolean

	constructor(
		@Inject(MAT_DIALOG_DATA) private readonly data: ShelfItem,
		protected readonly itemsService: ItemsService,
		private readonly loadingService: LoadingService,
	) {}

	get formControls() {
		return this.editItemFormGroup.controls
	}

	ngOnInit(): void {
		this.loadingService.loadingOn()

		this.itemToEdit = this.data
		this.editItemFormGroup.patchValue({
			name: this.data.Item.name,
			partNumber: this.data.Item.partNumber,
			storeId: this.data.ShelfLocation.Store.id,
			shelfId: this.data.ShelfLocation.id,
			source: this.data.Item.source,
			description: this.data.Item.description,
		})

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

				if (this.itemToEdit) {
					this.shelvesUnderSelectedStore = shelves.filter((shelf) => shelf.storeId === this.itemToEdit?.ShelfLocation.Store.id)
				}
			},
		})

		this.formControls.storeId.valueChanges.subscribe({
			next: (storeId: number | null) => {
				this.formControls.shelfId.setValue(null)
				if (storeId) {
					this.formControls.shelfId.enable()
					this.shelvesUnderSelectedStore = this.shelves.filter((shelf) => shelf.storeId === this.editItemFormGroup.controls.storeId.value)
				} else {
					this.shelvesUnderSelectedStore = []
				}
			},
		})
	}

	editItemFormSubmit() {
		if (this.editItemFormGroup.valid) {
			const itemData: UpdateItemDto = {
				name: this.editItemFormGroup.value.name!,
				partNumber: this.editItemFormGroup.value.partNumber!,
				source: this.editItemFormGroup.value.source!,
				description: this.editItemFormGroup.value.description ?? undefined,
				storeId: this.editItemFormGroup.value.storeId!,
				shelfId: this.editItemFormGroup.value.shelfId!,
				shelfItemId: this.data.id,
			}

			this.itemsService.updateItem(this.data.Item.id, itemData).subscribe({
				next: () => {
					this.itemsService.getItemsList().subscribe()
					this.itemsService.closeModals()
				},
			})
		}
	}
}
