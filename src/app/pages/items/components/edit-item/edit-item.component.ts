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
import { Item } from '../../../../shared/models/item.model'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

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

	itemToEdit?: Item

	editItemFormGroup = new FormGroup({
		name: new FormControl<string>('', { validators: [Validators.required] }),
		partNumber: new FormControl<string>('', { validators: [Validators.required] }),
		store: new FormControl<number | null>(null, { validators: [Validators.required] }),
		shelf: new FormControl<number | null>(null, { validators: [Validators.required] }),
		boughtFrom: new FormControl<string>('', { validators: [Validators.required] }),
	})

	protected readonly Boolean = Boolean

	constructor(
		@Inject(MAT_DIALOG_DATA) private readonly data: Item,
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
			name: this.data.name,
			partNumber: this.data.partNumber,
			store: this.data.store.id,
			shelf: this.data.shelf.id,
			boughtFrom: this.data.boughtFrom,
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
					this.shelvesUnderSelectedStore = shelves.filter((shelf) => shelf.store.id === this.itemToEdit?.store.id)
				}
			},
		})

		this.formControls.store.valueChanges.subscribe({
			next: (storeId: number | null) => {
				this.formControls.shelf.setValue(null)
				if (storeId) {
					this.formControls.shelf.enable()
					this.shelvesUnderSelectedStore = this.shelves.filter((shelf) => shelf.store.id === this.editItemFormGroup.controls.store.value)
				} else {
					this.shelvesUnderSelectedStore = []
				}
			},
		})
	}

	editItemFormSubmit() {
		if (this.editItemFormGroup.valid) {
			console.log({ formData: this.editItemFormGroup.value })
		}
	}
}
