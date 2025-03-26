import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ItemsComponent } from './items/items.component'
import { StoresComponent } from './stores/stores.component'
import { ShelvesComponent } from './shelves/shelves.component'
import { UsersComponent } from './users/users.component'
import { Role } from '../shared/enums/role.enum'
import { roleGuard } from '../shared/guards/role.guard'
import { TransactionLogComponent } from './transaction-log/transaction-log.component'

export const PagesRoutes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: {
			title: 'Home Page',
		},
	},
	{
		path: 'items',
		component: ItemsComponent,
		canActivate: [roleGuard],
		data: {
			roles: [Role.ADMIN, Role.SALES],
		},
	},
	{
		path: 'stores',
		component: StoresComponent,
		canActivate: [roleGuard],
		data: {
			roles: [Role.ADMIN],
		},
	},
	{
		path: 'shelves',
		component: ShelvesComponent,
		canActivate: [roleGuard],
		data: {
			roles: [Role.ADMIN],
		},
	},
	{
		path: 'users',
		component: UsersComponent,
		canActivate: [roleGuard],
		data: {
			roles: [Role.ADMIN],
		},
	},
	{
		path: 'transaction-log',
		component: TransactionLogComponent,
		canActivate: [roleGuard],
		data: {
			roles: [Role.ADMIN],
		},
	},
]
