import { Component, OnInit } from '@angular/core'
import { MaterialModule } from '../../../../material.module'
import { Store } from '../../../../shared/models/store.model'
import { Shelf } from '../../../../shared/models/shelf.model'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { TranslateModule } from '@ngx-translate/core'
import { ItemsService } from '../../items.service'

@Component({
	selector: 'app-add-item',
	standalone: true,
	imports: [MaterialModule, AsyncPipe, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule],
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
		store: new FormControl<number | null>(null, { validators: [Validators.required] }),
		shelf: new FormControl<number | null>({ value: null, disabled: true }, { validators: [Validators.required] }),
		boughtFrom: new FormControl<string>('', { validators: [Validators.required] }),
	})

	constructor(protected readonly itemsService: ItemsService) {}

	get formControls() {
		return this.addItemFormGroup.controls
	}

	ngOnInit(): void {
		this.itemsService.getStores().subscribe({
			next: (stores) => {
				this.stores = stores
			},
		})

		this.itemsService.getShelves().subscribe({
			next: (shelves) => {
				this.shelves = shelves
			},
		})

		this.formControls.store.valueChanges.subscribe({
			next: (storeId: number | null) => {
				this.formControls.shelf.setValue(null)
				if (storeId) {
					this.formControls.shelf.enable()
					this.shelvesUnderSelectedStore = this.shelves.filter((shelf) => shelf.storeId === this.addItemFormGroup.controls.store.value)
				} else {
					this.shelvesUnderSelectedStore = []
				}
			},
		})
	}

	addItem() {
		if (this.addItemFormGroup.valid) {
			console.log({ formData: this.addItemFormGroup.value })
		}
	}
}
