import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MaterialModule } from '../../material.module'
import { ItemsService } from './items.service'
import { TablerIconsModule } from 'angular-tabler-icons'
import { TranslateModule } from '@ngx-translate/core'
import { filter } from 'rxjs'
import { ShelfItem } from './types/item-list.type'
import { DecimalPipe } from '@angular/common'

@Component({
	selector: 'app-items',
	standalone: true,
	imports: [MaterialModule, TablerIconsModule, TranslateModule, DecimalPipe],
	templateUrl: './items.component.html',
	styleUrl: './items.component.scss',
})
export class ItemsComponent implements OnInit {
	displayedColumns = ['name', 'partNumber', 'store', 'shelf', 'quantity', 'price', 'vat', 'totalPrice', 'source', 'description', 'actions']

	dataSource: MatTableDataSource<ShelfItem>

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null)

	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null)

	constructor(protected readonly itemsService: ItemsService) {}

	ngOnInit() {
		this.itemsService.getItemsList().subscribe()

		this.itemsService.itemsList.pipe(filter(Boolean)).subscribe({
			next: (items) => {
				// Assign the data to the data source for the table to render
				this.dataSource = new MatTableDataSource(items)
				this.dataSource.paginator = this.paginator
				this.dataSource.sort = this.sort
			},
		})
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
}
