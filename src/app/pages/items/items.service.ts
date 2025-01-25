import { Injectable } from '@angular/core'
import { StoresService } from '../stores/stores.service'
import { ShelvesService } from '../shelves/shelves.service'
import { Item } from '../../shared/models/item.model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, tap } from 'rxjs'
import { CreateItemDto } from './dto/create-item.dto'
import { AddItemComponent } from './components/add-item/add-item.component'
import { EditItemComponent } from './components/edit-item/edit-item.component'
import { MatDialog } from '@angular/material/dialog'
import { ItemList } from './types/item-list.type'
import { UpdateItemDto } from './dto/update-item.dto'
import { EditPriceComponent } from './components/edit-price/edit-price.component'

const API_URL = environment.apiUrl

@Injectable({
	providedIn: 'root',
})
export class ItemsService {
	itemsList = new BehaviorSubject<ItemList[] | null>(null)

	constructor(
		private readonly httpClient: HttpClient,
		private readonly storesService: StoresService,
		private readonly shelvesService: ShelvesService,
		private readonly matDialog: MatDialog,
	) {}

	getItemsList() {
		return this.httpClient.get<ItemList[]>(`${API_URL}/items/list`).pipe(tap((items) => this.itemsList.next(items)))
	}

	getStores() {
		return this.storesService.getStores()
	}

	getShelves() {
		return this.shelvesService.getShelves()
	}

	createItem(createItemDto: CreateItemDto) {
		return this.httpClient.post<Item>(`${API_URL}/items`, createItemDto)
	}

	updateItem(id: number, updateItemDto: UpdateItemDto) {
		return this.httpClient.patch<Item>(`${API_URL}/items/${id}`, updateItemDto)
	}

	openAddItemModal() {
		this.matDialog.open(AddItemComponent)
	}

	openEditItemModal(item: Item) {
		this.matDialog.open(EditItemComponent, { data: item })
	}

	openEditItemPriceModal(item: Item) {
		this.matDialog.open(EditPriceComponent, { data: item })
	}

	editItemPrice(id: number, price: number) {
		return this.httpClient.patch<Item>(`${API_URL}/items/${id}/price`, { price })
	}

	closeModals() {
		this.matDialog.closeAll()
	}
}
