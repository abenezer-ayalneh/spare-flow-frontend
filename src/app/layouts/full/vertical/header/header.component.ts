import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Router, RouterModule } from '@angular/router'
import { FeatherModule } from 'angular-feather'
import { TablerIconsModule } from 'angular-tabler-icons'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { MaterialModule } from 'src/app/material.module'

import { navItems } from '../sidebar/sidebar-data'
import { UserService } from '../../../../shared/services/user.service'
import { TranslatePipe } from '@ngx-translate/core'
import { TokenService } from '../../../../shared/services/token.service'

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterModule, CommonModule, NgScrollbarModule, TablerIconsModule, MaterialModule, FeatherModule, TranslatePipe],
	templateUrl: './header.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
	@Input() showToggle = true
	@Input() toggleChecked = false
	@Output() toggleMobileNav = new EventEmitter<void>()
	@Output() toggleMobileFilterNav = new EventEmitter<void>()
	@Output() toggleCollapsed = new EventEmitter<void>()

	constructor(
		public dialog: MatDialog,
		private readonly tokenService: TokenService,
		private readonly router: Router,
		protected readonly userService: UserService,
	) {}

	logout() {
		this.router.navigate(['/authentication/sign-in']).then(() => this.tokenService.clearTokens())
	}
}

@Component({
	selector: 'app-vertical-search-dialog',
	standalone: true,
	imports: [RouterModule, MaterialModule, TablerIconsModule, FormsModule],
	templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
	searchText = ''
	navItems = navItems

	navItemsData = navItems.filter((navitem) => navitem.displayName)

	// filtered = this.navItemsData.find((obj) => {
	//   return obj.displayName == this.searchinput;
	// });
}
