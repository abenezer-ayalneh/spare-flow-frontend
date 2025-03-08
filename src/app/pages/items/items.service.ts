import { Injectable } from '@angular/core'
import { StoresService } from '../stores/stores.service'
import { ShelvesService } from '../shelves/shelves.service'
import { Item } from '../../shared/models/item.model'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, tap } from 'rxjs'
import { CreateItemDto } from './dto/create-item.dto'
import { AddItemComponent } from './components/add-item/add-item.component'
import { EditItemComponent } from './components/edit-item/edit-item.component'
import { MatDialog } from '@angular/material/dialog'
import { ShelfItemForTable } from './types/item-list.type'
import { UpdateItemDto } from './dto/update-item.dto'
import { EditPriceComponent } from './components/edit-price/edit-price.component'
import { EditQuantityComponent } from './components/edit-quantity/edit-quantity.component'
import { AddItemToCartComponent } from './components/add-item-to-cart/add-item-to-cart.component'
import { CartComponent } from './components/cart/cart.component'

@Injectable({
	providedIn: 'root',
})
export class ItemsService {
	itemsList = new BehaviorSubject<ShelfItemForTable[] | null>(null)

	constructor(
		private readonly httpClient: HttpClient,
		private readonly storesService: StoresService,
		private readonly shelvesService: ShelvesService,
		private readonly matDialog: MatDialog,
	) {}

	getItemsList() {
		return this.httpClient.get<ShelfItemForTable[]>(`items/list`).pipe(tap((items) => this.itemsList.next(items)))
	}

	getStores() {
		return this.storesService.getStores()
	}

	getShelves() {
		return this.shelvesService.getShelves()
	}

	createItem(createItemDto: CreateItemDto) {
		return this.httpClient.post<Item>(`items`, createItemDto)
	}

	updateItem(id: number, updateItemDto: UpdateItemDto) {
		return this.httpClient.patch<Item>(`items/${id}`, updateItemDto)
	}

	openAddItemModal() {
		this.matDialog.open(AddItemComponent)
	}

	openEditItemModal(item: ShelfItemForTable) {
		this.matDialog.open(EditItemComponent, { data: item })
	}

	openEditItemPriceModal(item: ShelfItemForTable) {
		this.matDialog.open(EditPriceComponent, { data: item })
	}

	editItemPrice(id: number, price: number) {
		return this.httpClient.patch<Item>(`items/${id}/price`, { price })
	}

	openEditItemQuantityModal(item: ShelfItemForTable) {
		this.matDialog.open(EditQuantityComponent, { data: item })
	}

	editItemQuantity(id: number, quantity: number) {
		return this.httpClient.patch<ShelfItemForTable>(`shelf-item/${id}/quantity`, { quantity })
	}

	openAddItemToCartModal(item: ShelfItemForTable) {
		this.matDialog.open(AddItemToCartComponent, { data: item })
	}

	openCartModal() {
		this.matDialog.open(CartComponent)
	}

	closeModals() {
		this.matDialog.closeAll()
	}
}
