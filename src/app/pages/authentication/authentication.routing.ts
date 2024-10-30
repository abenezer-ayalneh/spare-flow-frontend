import { Routes } from '@angular/router';

import { AppErrorComponent } from './error/error.component';
import { AppForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppLockscreenComponent } from './lockscreen/lockscreen.component';
import { AppLoginComponent } from './login/login.component';
import { AppMaintenanceComponent } from './maintenance/maintenance.component';
import { AppRegisterComponent } from './register/register.component';

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
				path: 'login',
				component: AppLoginComponent,
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
];
