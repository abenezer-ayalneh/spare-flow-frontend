import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ItemsComponent } from './items/items.component'
import { AddItemComponent } from './items/components/add-item/add-item.component'

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
		children: [
			{
				path: '',
				component: ItemsComponent,
			},
			{
				path: 'add',
				component: AddItemComponent,
			},
			{
				path: 'edit/:id',
				component: AddItemComponent,
			},
		],
	},
]
