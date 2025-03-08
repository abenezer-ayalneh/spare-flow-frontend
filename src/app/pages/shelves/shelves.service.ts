import { Injectable } from '@angular/core'
import { Shelf } from '../../shared/models/shelf.model'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, tap } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { AddOrEditShelvesComponent } from './components/add-or-edit-shelves/add-or-edit-shelves.component'
import { CreateShelfDto } from './dto/create-shelf.dto'

@Injectable({
	providedIn: 'root',
})
export class ShelvesService {
	shelvesList = new BehaviorSubject<Shelf[] | null>(null)

	constructor(
		private readonly httpClient: HttpClient,
		private readonly matDialog: MatDialog,
	) {}

	getShelves() {
		return this.httpClient.get<Shelf[]>(`shelves`).pipe(tap((shelves) => this.shelvesList.next(shelves)))
	}

	openAddShelfModal() {
		this.matDialog.open(AddOrEditShelvesComponent)
	}

	openEditShelfModal(shelf: Shelf) {
		this.matDialog.open(AddOrEditShelvesComponent, { data: shelf })
	}

	closeModals() {
		this.matDialog.closeAll()
	}

	createShelf(createShelfDto: CreateShelfDto) {
		return this.httpClient.post<Shelf>(`shelves`, createShelfDto)
	}

	updateShelf(id: number, updateData: Partial<CreateShelfDto>) {
		return this.httpClient.patch<Shelf>(`shelves/${id}`, updateData)
	}
}
