import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ItemsComponent } from './items/items.component'
import { StoresComponent } from './stores/stores.component'
import { ShelvesComponent } from './shelves/shelves.component'
import { UsersComponent } from './users/users.component'

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
	},
	{
		path: 'stores',
		component: StoresComponent,
	},
	{
		path: 'shelves',
		component: ShelvesComponent,
	},
	{
		path: 'users',
		component: UsersComponent,
	},
]
