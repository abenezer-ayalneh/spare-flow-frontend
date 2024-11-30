import { Routes } from '@angular/router'

import { AppErrorComponent } from './error/error.component'
import { AppForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { AppLockscreenComponent } from './lockscreen/lockscreen.component'
import { SignInComponent } from './sign-in/sign-in.component'
import { AppMaintenanceComponent } from './maintenance/maintenance.component'
import { AppRegisterComponent } from './register/register.component'

export const AuthenticationRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'error',
				component: AppErrorComponent,
			},
			{
				path: 'maintenance',
				component: AppMaintenanceComponent,
			},
			{
				path: 'forgot',
				component: AppForgotPasswordComponent,
			},
			{
				path: 'sign-in',
				component: SignInComponent,
			},
			{
				path: 'register',
				component: AppRegisterComponent,
			},
			{
				path: 'lockscreen',
				component: AppLockscreenComponent,
			},
		],
	},
]
