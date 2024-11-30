import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { BlankComponent } from './layouts/blank/blank.component'
import { FullComponent } from './layouts/full/full.component'
import { authGuard } from './shared/guards/auth.guard'

const routes: Routes = [
	{
		path: '',
		component: FullComponent,
		canActivate: [authGuard],
		children: [
			{
				path: '',
				loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
			},
		],
	},
	{
		path: '',
		component: BlankComponent,
		children: [
			{
				path: 'authentication',
				loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
			},
		],
	},
	{
		path: '**',
		redirectTo: 'authentication/error',
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
