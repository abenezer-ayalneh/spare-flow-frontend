import { Component, OnInit } from '@angular/core'
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { TranslatePipe } from '@ngx-translate/core'
import { MatInput } from '@angular/material/input'
import { MatIcon } from '@angular/material/icon'
import { MatFabButton, MatIconButton } from '@angular/material/button'
import { RouterLink } from '@angular/router'
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
import { Store } from '../../shared/models/store.model'
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { TablerIconsModule } from 'angular-tabler-icons'
import { MatTooltip } from '@angular/material/tooltip'
import { MatPaginator } from '@angular/material/paginator'
import { StoresService } from './stores.service'
import { MatDialog } from '@angular/material/dialog'
import { AddStoreComponent } from './components/add-store/add-store.component'

@Component({
	selector: 'app-stores',
	standalone: true,
	imports: [
		MatCard,
		MatCardContent,
		MatCardTitle,
		MatLabel,
		MatFormField,
		TranslatePipe,
		MatInput,
		MatIcon,
		MatFabButton,
		RouterLink,
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
	templateUrl: './stores.component.html',
	styleUrl: './stores.component.scss',
})
export class StoresComponent implements OnInit {
	dataSource: MatTableDataSource<Store>

	displayedColumns: string[] = ['name', 'description', 'actions']

	constructor(
		private readonly storesService: StoresService,
		private readonly matDialog: MatDialog,
	) {}

	ngOnInit() {
		this.storesService.getStores().subscribe({
			next: (stores) => {
				this.dataSource = new MatTableDataSource(stores)
			},
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value
		this.dataSource.filter = filterValue.trim().toLowerCase()
	}

	openAddStoreModal() {
		this.matDialog.open(AddStoreComponent)
	}

	openEditStoreModal(store: Store) {
		this.matDialog.open(AddStoreComponent, { data: store })
	}
}
