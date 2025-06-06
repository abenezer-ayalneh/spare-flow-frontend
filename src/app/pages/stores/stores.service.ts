import { Injectable } from '@angular/core'
import { BehaviorSubject, tap } from 'rxjs'
import { Store } from '../../shared/models/store.model'
import { HttpClient } from '@angular/common/http'
import { CreateStoreDto } from './dto/create-store.dto'
import { AddOrEditStoreComponent } from './components/add-or-edit-store/add-or-edit-store.component'
import { MatDialog } from '@angular/material/dialog'

@Injectable({
	providedIn: 'root',
})
export class StoresService {
	storesList = new BehaviorSubject<Store[] | null>(null)

	constructor(
		private readonly httpClient: HttpClient,
		private readonly matDialog: MatDialog,
	) {}

	openAddStoreModal() {
		this.matDialog.open(AddOrEditStoreComponent)
	}

	openEditStoreModal(store: Store) {
		this.matDialog.open(AddOrEditStoreComponent, { data: store })
	}

	closeModals() {
		this.matDialog.closeAll()
	}

	getStores() {
		return this.httpClient.get<Store[]>(`stores`).pipe(tap((stores) => this.storesList.next(stores)))
	}

	createStore(createStoreDto: CreateStoreDto) {
		return this.httpClient.post<Store>(`stores`, createStoreDto)
	}

	updateStore(id: number, updateData: Partial<CreateStoreDto>) {
		return this.httpClient.patch<Store>(`stores/${id}`, updateData)
	}
}
