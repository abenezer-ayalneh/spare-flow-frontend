import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { RouterModule } from '@angular/router'
// icons
import { TablerIconsModule } from 'angular-tabler-icons'
import * as TablerIcons from 'angular-tabler-icons/icons'

import { AuthenticationRoutes } from './authentication.routing'
import { AppErrorComponent } from './error/error.component'
import { AppForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { AppLockscreenComponent } from './lockscreen/lockscreen.component'
import { SignInComponent } from './sign-in/sign-in.component'
import { AppMaintenanceComponent } from './maintenance/maintenance.component'
import { AppRegisterComponent } from './register/register.component'

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(AuthenticationRoutes),
		MatIconModule,
		MatCardModule,
		MatInputModule,
		MatCheckboxModule,
		MatButtonModule,
		FormsModule,
		ReactiveFormsModule,
		TablerIconsModule.pick(TablerIcons),

		AppErrorComponent,
		AppMaintenanceComponent,
		AppForgotPasswordComponent,
		SignInComponent,
		AppRegisterComponent,
		AppLockscreenComponent,
	],
})
export class AuthenticationModule {}
