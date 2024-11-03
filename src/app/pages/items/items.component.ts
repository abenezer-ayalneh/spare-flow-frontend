import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MaterialModule } from '../../material.module';
import { Item } from './types/items.type';
import { ItemsService } from './items.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-items',
	standalone: true,
	imports: [MaterialModule, TablerIconsModule, RouterLink, RouterLinkActive],
	templateUrl: './items.component.html',
	styleUrl: './items.component.scss',
})
export class ItemsComponent {
	displayedColumns = ['name', 'partNumber', 'location', 'quantity', 'price', 'vat', 'totalPrice'];
	dataSource: MatTableDataSource<Item>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

	constructor(
		breakpointObserver: BreakpointObserver,
		private readonly itemsService: ItemsService,
	) {
		breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
			this.displayedColumns = result.matches
				? ['name', 'partNumber', 'location', 'quantity', 'price', 'vat', 'totalPrice']
				: ['name', 'partNumber', 'location', 'quantity', 'price', 'vat', 'totalPrice'];
		});

		// Create 100 items
		const items: Item[] = [];
		for (let i = 1; i <= 100; i++) {
			items.push(this.itemsService.createNewItem(i));
		}

		// Assign the data to the data source for the table to render
		this.dataSource = new MatTableDataSource(items);
	}

	/**
	 * Set the paginator and sort after the view init since this component will
	 * be able to query its view for the initialized paginator and sort.
	 */
	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
