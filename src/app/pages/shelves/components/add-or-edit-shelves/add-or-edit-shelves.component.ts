import { Component, Inject, OnInit } from '@angular/core'
import { MaterialModule } from '../../../../material.module'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { TranslateModule } from '@ngx-translate/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Shelf } from '../../../../shared/models/shelf.model'
import { filter, finalize } from 'rxjs'
import { ItemsService } from '../../../items/items.service'
import { LoadingService } from '../../../../shared/components/loading/loading.service'
import { Store } from '../../../../shared/models/store.model'
import { StoresService } from '../../../stores/stores.service'
import { ShelvesService } from '../../shelves.service'

@Component({
	selector: 'app-add-or-edit-shelves',
	standalone: true,
	imports: [MaterialModule, ReactiveFormsModule, FormErrorMessageComponent, TranslateModule],
	templateUrl: './add-or-edit-shelves.component.html',
	styleUrl: './add-or-edit-shelves.component.scss',
})
export class AddOrEditShelvesComponent implements OnInit {
	isEditing: boolean

	stores: Store[] = []

	addShelfFormGroup = new FormGroup({
		name: new FormControl<string>('', { validators: [Validators.required] }),
		description: new FormControl<string>(''),
		storeId: new FormControl<number | null>(null, { validators: [Validators.required] }),
	})

	constructor(
		@Inject(MAT_DIALOG_DATA) private readonly data: Shelf,
		private readonly shelvesService: ShelvesService,
		private readonly itemsService: ItemsService,
		private readonly loadingService: LoadingService,
		private readonly storesService: StoresService,
	) {
		this.isEditing = Boolean(this.data)
	}

	get formControls() {
		return this.addShelfFormGroup.controls
	}

	ngOnInit(): void {
		this.loadingService.loadingOn()

		if (this.isEditing)
			this.addShelfFormGroup.patchValue({
				name: this.data.name,
				description: this.data.description,
				storeId: this.data.storeId,
			})

		this.itemsService.getStores().subscribe()

		this.storesService.storesList
			.pipe(
				filter(Boolean),
				finalize(() => this.loadingService.loadingOff()),
			)
			.subscribe({
				next: (stores) => {
					this.stores = stores
				},
			})
	}

	addShelfFormSubmit() {
		if (this.addShelfFormGroup.valid) {
			const shelfData = {
				name: this.addShelfFormGroup.value.name!,
				description: this.addShelfFormGroup.value.description ?? undefined,
				storeId: this.addShelfFormGroup.value.storeId!,
			}

			if (this.isEditing) {
				this.shelvesService.updateShelf(this.data.id, shelfData).subscribe({
					next: () => {
						this.shelvesService.getShelves().subscribe()
						this.shelvesService.closeModals()
					},
				})
			} else {
				this.shelvesService.createShelf(shelfData).subscribe({
					next: () => {
						this.shelvesService.getShelves().subscribe()
						this.shelvesService.closeModals()
					},
				})
			}
		}
	}
}
