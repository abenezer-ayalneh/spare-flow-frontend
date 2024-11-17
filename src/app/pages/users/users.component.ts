import { Component } from '@angular/core'
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
import { MatDialog } from '@angular/material/dialog'
import { User } from '../../shared/models/user.model'
import { UsersService } from './users.service'
import { AddOrEditUserComponent } from './components/add-or-edit-user/add-or-edit-user.component'
import { TitleCasePipe } from '@angular/common'
import { MatChipOption } from '@angular/material/chips'

@Component({
	selector: 'app-users',
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
		TitleCasePipe,
		MatChipOption,
	],
	templateUrl: './users.component.html',
	styleUrl: './users.component.scss',
})
export class UsersComponent {
	dataSource: MatTableDataSource<User>

	displayedColumns: string[] = ['name', 'username', 'phoneNumber', 'role', 'active', 'actions']

	constructor(
		private readonly matDialog: MatDialog,
		private readonly usersService: UsersService,
	) {}

	ngOnInit() {
		this.usersService.getUsers().subscribe({
			next: (users) => {
				this.dataSource = new MatTableDataSource(users)
			},
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value
		this.dataSource.filter = filterValue.trim().toLowerCase()
	}

	openAddUserModal() {
		this.matDialog.open(AddOrEditUserComponent)
	}

	openEditUserModal(user: User) {
		this.matDialog.open(AddOrEditUserComponent, { data: user })
	}
}
