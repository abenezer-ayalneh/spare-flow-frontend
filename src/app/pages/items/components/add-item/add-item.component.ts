import { Component, OnInit } from '@angular/core'
import { MaterialModule } from '../../../../material.module'
import { BehaviorSubject, startWith } from 'rxjs'
import { Store } from '../../../../shared/models/store.model'
import { Shelf } from '../../../../shared/models/shelf.model'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { HelperService } from '../../../../shared/services/helper.service'
import { FormErrorMessageComponent } from '../../../../shared/components/form-error-message/form-error-message.component'
import { TranslateModule } from '@ngx-translate/core'

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

	boughtFromList: string[] = ['ORIGINAL', 'LOCAL']

	filteredStores$ = new BehaviorSubject<Store[]>([])

	filteredShelves$ = new BehaviorSubject<Shelf[]>([])

	addItemFormGroup = new FormGroup({
		name: new FormControl<string>('', { validators: [Validators.required] }),
		partNumber: new FormControl<string>('', { validators: [Validators.required] }),
		quantity: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] }),
		price: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(0.1)] }),
		store: new FormControl<string | Store>('', { validators: [Validators.required] }),
		shelf: new FormControl<string | Shelf>('', { validators: [Validators.required] }),
		boughtFrom: new FormControl<string>('', { validators: [Validators.required] }),
	})

	constructor(protected readonly helperService: HelperService) {}

	ngOnInit(): void {
		// TODO remove the code block below
		this.stores = [
			{
				id: 1,
				name: 'Store 1',
				description: 'Store One',
				createdAt: '2024-11-02T11:31:49.681Z',
				updatedAt: '2024-11-02T11:31:49.681Z',
			},
			{
				id: 2,
				name: 'Store 2',
				description: 'Store Two',
				createdAt: '2024-11-02T11:31:49.681Z',
				updatedAt: '2024-11-02T11:31:49.681Z',
			},
			{
				id: 3,
				name: 'Store 3',
				description: 'Store Three',
				createdAt: '2024-11-02T11:31:49.681Z',
				updatedAt: '2024-11-02T11:31:49.681Z',
			},
		]

		// TODO remove the code block below
		this.shelves = [
			{
				id: 1,
				name: 'Shelf 1',
				description: 'Shelf One',
				storeId: 1,
				createdAt: '2024-11-02T11:31:49.681Z',
				updatedAt: '2024-11-02T11:31:49.681Z',
			},
			{
				id: 2,
				name: 'Shelf 2',
				description: 'Shelf Two',
				storeId: 2,
				createdAt: '2024-11-02T11:31:49.681Z',
				updatedAt: '2024-11-02T11:31:49.681Z',
			},
			{
				id: 3,
				name: 'Shelf 3',
				description: 'Shelf Three',
				storeId: 3,
				createdAt: '2024-11-02T11:31:49.681Z',
				updatedAt: '2024-11-02T11:31:49.681Z',
			},
		]

		this.addItemFormGroup.controls.store.valueChanges.pipe(startWith('')).subscribe({
			next: (store) => {
				const name = typeof store === 'string' ? store : store?.name

				this.filteredStores$.next(this.filterByName<Store>(name, this.stores))
			},
		})

		this.addItemFormGroup.controls.shelf.valueChanges.pipe(startWith('')).subscribe({
			next: (shelf) => {
				const name = typeof shelf === 'string' ? shelf : shelf?.name

				this.filteredShelves$.next(this.filterByName<Shelf>(name, this.shelves))
			},
		})
	}

	displayWith(option: { name: string }): string {
		return option && option.name ? option.name : ''
	}

	filterByName<T extends { name: string }>(key: string | undefined, list: T[]): T[] {
		let filterValue: string = key?.toLowerCase() ?? ''

		return list.filter((option) => option.name?.toLowerCase().includes(filterValue))
	}

	addItem() {
		if (this.addItemFormGroup.valid) {
			console.log({ formData: this.addItemFormGroup.value })
		}
	}
}
