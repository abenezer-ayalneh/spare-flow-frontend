import { Component, OnInit } from '@angular/core'
import { MaterialModule } from '../../../../material.module'
import { Store } from '../../../../shared/models/store.model'
import { Shelf } from '../../../../shared/models/shelf.model'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { TranslateModule } from '@ngx-translate/core'
import { ItemsService } from '../../items.service'
import { LoadingService } from '../../../../shared/components/loading/loading.service'
import { finalize } from 'rxjs'
import { Item } from '../../../../shared/models/item.model'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
	selector: 'app-edit-item',
	standalone: true,
	imports: [MaterialModule, AsyncPipe, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule],
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
		quantity: new FormControl<number | null>({ value: null, disabled: Boolean(this.itemToEdit) }, { validators: [Validators.required, Validators.min(1)] }),
		price: new FormControl<number | null>({ value: null, disabled: Boolean(this.itemToEdit) }, { validators: [Validators.required, Validators.min(0.1)] }),
		store: new FormControl<number | null>(null, { validators: [Validators.required] }),
		shelf: new FormControl<number | null>({ value: null, disabled: !Boolean(this.itemToEdit) }, { validators: [Validators.required] }),
		boughtFrom: new FormControl<string>('', { validators: [Validators.required] }),
	})

	protected readonly Boolean = Boolean

	constructor(
		protected readonly itemsService: ItemsService,
		private readonly loadingService: LoadingService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
	) {}

	get formControls() {
		return this.editItemFormGroup.controls
	}

	ngOnInit(): void {
		this.loadingService.loadingOn()

		const itemToEditId = this.activatedRoute.snapshot.params['id']
		if (itemToEditId) {
			this.itemsService.getItemById(itemToEditId).subscribe({
				next: (item) => {
					this.itemToEdit = item
					this.editItemFormGroup.patchValue({
						name: item.name,
						partNumber: item.partNumber,
						quantity: item.quantity,
						price: item.price,
						store: item.store.id,
						shelf: item.shelf.id,
						boughtFrom: item.boughtFrom,
					})
				},
				error: async (err: HttpErrorResponse) => {
					console.error({ getItemByIdError: err })
					await this.router.navigateByUrl('/items')
				},
			})
		}

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
					this.shelvesUnderSelectedStore = shelves.filter((shelf) => shelf.storeId === this.itemToEdit?.store.id)
				}
			},
		})

		this.formControls.store.valueChanges.subscribe({
			next: (storeId: number | null) => {
				this.formControls.shelf.setValue(null)
				if (storeId) {
					this.formControls.shelf.enable()
					this.shelvesUnderSelectedStore = this.shelves.filter((shelf) => shelf.storeId === this.editItemFormGroup.controls.store.value)
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
