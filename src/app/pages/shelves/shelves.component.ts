import { Component, OnInit } from '@angular/core'
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card'
import { MatFormField } from '@angular/material/form-field'
import { TranslatePipe } from '@ngx-translate/core'
import { MatInput } from '@angular/material/input'
import { MatIcon } from '@angular/material/icon'
import { MatFabButton, MatIconButton } from '@angular/material/button'
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow,
	MatRowDef,
	MatTable,
	MatTableDataSource,
} from '@angular/material/table'
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { TablerIconsModule } from 'angular-tabler-icons'
import { MatTooltip } from '@angular/material/tooltip'
import { MatPaginator } from '@angular/material/paginator'
import { Shelf } from '../../shared/models/shelf.model'
import { ShelvesService } from './shelves.service'
import { filter, map } from 'rxjs'

@Component({
	selector: 'app-shelves',
	standalone: true,
	imports: [
		MatCard,
		MatCardContent,
		MatCardTitle,
		MatFormField,
		TranslatePipe,
		MatInput,
		MatIcon,
		MatFabButton,
		MatTable,
		MatSort,
		MatColumnDef,
		MatHeaderCell,
		MatHeaderCellDef,
		MatCell,
		MatSortHeader,
		MatCellDef,
		TablerIconsModule,
		MatIconButton,
		MatTooltip,
		MatHeaderRowDef,
		MatHeaderRow,
		MatRow,
		MatPaginator,
		MatRowDef,
	],
	templateUrl: './shelves.component.html',
	styleUrl: './shelves.component.scss',
})
export class ShelvesComponent implements OnInit {
	dataSource: MatTableDataSource<Shelf>

	displayedColumns: string[] = ['name', 'description', 'store', 'actions']

	constructor(protected readonly shelvesService: ShelvesService) {}

	ngOnInit() {
		this.shelvesService.getShelves().subscribe()

		this.shelvesService.shelvesList
			.pipe(
				filter(Boolean),
				map((shelves) => {
					this.dataSource = new MatTableDataSource(shelves)
				}),
			)
			.subscribe()
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value
		this.dataSource.filter = filterValue.trim().toLowerCase()
	}
}
