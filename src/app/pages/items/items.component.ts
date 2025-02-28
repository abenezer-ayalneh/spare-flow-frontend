import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MaterialModule } from '../../material.module'
import { ItemsService } from './items.service'
import { TablerIconsModule } from 'angular-tabler-icons'
import { TranslateModule } from '@ngx-translate/core'
import { filter, map, Subscription } from 'rxjs'
import { ItemForTable, ShelfItemForTable } from './types/item-list.type'
import { DecimalPipe } from '@angular/common'
import { FeatherModule } from 'angular-feather'
import { CartService } from './components/cart/cart.service'

@Component({
	selector: 'app-items',
	standalone: true,
	imports: [MaterialModule, TablerIconsModule, TranslateModule, DecimalPipe, FeatherModule],
	templateUrl: './items.component.html',
	styleUrl: './items.component.scss',
})
export class ItemsComponent implements OnInit, OnDestroy {
	subscriptions$ = new Subscription()

	displayedColumns = ['name', 'partNumber', 'store', 'shelf', 'quantity', 'price', 'vat', 'totalPrice', 'source', 'description', 'actions']

	dataSource: MatTableDataSource<ItemForTable>

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null)

	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null)

	constructor(
		protected readonly itemsService: ItemsService,
		protected readonly cartService: CartService,
	) {}

	ngOnInit() {
		this.prepareTableData()
	}

	ngOnDestroy() {
		this.subscriptions$.unsubscribe()
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value
		this.dataSource.filter = filterValue.trim().toLowerCase()
	}

	calculateVat(price: string) {
		return Number(price) * 0.15
	}

	calculateTotalPrice(price: string) {
		return Number(price) + this.calculateVat(price)
	}

	convertShelfItemForTableToItemForTable(shelfItemsForTable: ShelfItemForTable[]): ItemForTable[] {
		return shelfItemsForTable.map((shelfItem) => ({
			id: shelfItem.id,
			name: shelfItem.Item.name,
			partNumber: shelfItem.Item.partNumber,
			store: shelfItem.ShelfLocation.Store.name,
			shelf: shelfItem.ShelfLocation.name,
			quantity: shelfItem.quantity,
			price: Number(shelfItem.Item.price),
			vat: this.calculateVat(shelfItem.Item.price),
			totalPrice: this.calculateTotalPrice(shelfItem.Item.price),
			source: shelfItem.Item.source,
			description: shelfItem.Item.description,
			original: shelfItem,
		}))
	}

	private prepareTableData() {
		this.subscriptions$.add(this.itemsService.getItemsList().subscribe())

		this.subscriptions$.add(
			this.itemsService.itemsList
				.pipe(
					filter(Boolean),
					map((items) => this.convertShelfItemForTableToItemForTable(items)),
				)
				.subscribe({
					next: (items) => {
						// Assign the data to the data source for the table to render
						this.dataSource = new MatTableDataSource(items)
						this.dataSource.paginator = this.paginator
						this.dataSource.sort = this.sort
					},
				}),
		)
	}
}
