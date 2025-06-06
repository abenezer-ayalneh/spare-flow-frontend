import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { RouterModule } from '@angular/router'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { Subscription } from 'rxjs'
import { AppSettings } from 'src/app/app.config'
import { MaterialModule } from 'src/app/material.module'
import { CoreService } from 'src/app/shared/services/core.service'

import { NavService } from '../../shared/services/nav.service'
import { AppSearchDialogComponent, HeaderComponent } from './vertical/header/header.component'
import { AppNavItemComponent } from './vertical/sidebar/nav-item/nav-item.component'
import { SidebarComponent } from './vertical/sidebar/sidebar.component'
import { navItems } from './vertical/sidebar/sidebar-data'
import { Role } from '../../shared/enums/role.enum'
import { IsGrantedDirective } from '../../shared/directives/is-granted.directive'

const MOBILE_VIEW = 'screen and (max-width: 768px)'
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)'
const MONITOR_VIEW = 'screen and (min-width: 1024px)'
const BELOWMONITOR = 'screen and (max-width: 1023px)'

@Component({
	selector: 'app-full',
	templateUrl: './full.component.html',
	standalone: true,
	imports: [
		NgScrollbarModule,
		HeaderComponent,
		SidebarComponent,
		AppSearchDialogComponent,
		MaterialModule,
		RouterModule,
		CommonModule,
		AppNavItemComponent,
		IsGrantedDirective,
	],
	styleUrls: [],
	encapsulation: ViewEncapsulation.None,
})
export class FullComponent implements OnDestroy {
	navItems = navItems

	@ViewChild('leftsidenav')
	public sidenav: MatSidenav

	resView = false

	//get options from service
	options = this.settings.getOptions()

	navopt = this.navService.showClass
	protected readonly Role = Role
	private layoutChangesSubscription = Subscription.EMPTY
	private isMobileScreen = false
	private isContentWidthFixed = true
	private isCollapsedWidthFixed = false
	private htmlElement!: HTMLHtmlElement

	constructor(
		private settings: CoreService,
		private mediaMatcher: MediaMatcher,
		private navService: NavService,
		private breakpointObserver: BreakpointObserver,
	) {
		this.htmlElement = document.querySelector('html')!
		this.layoutChangesSubscription = this.breakpointObserver.observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR]).subscribe((state) => {
			// SidenavOpened must be reset true when layout changes
			this.options.sidenavOpened = true
			this.isMobileScreen = state.breakpoints[BELOWMONITOR]

			if (!this.options.sidenavCollapsed) {
				this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW]
			}
			this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW]
			this.resView = state.breakpoints[BELOWMONITOR]
		})

		// Initialize project theme with options
		this.receiveOptions(this.options)
	}

	get isOver(): boolean {
		return this.isMobileScreen
	}

	get isTablet(): boolean {
		return this.resView
	}

	ngOnDestroy() {
		this.layoutChangesSubscription.unsubscribe()
	}

	toggleCollapsed() {
		this.isContentWidthFixed = false
		this.options.sidenavCollapsed = !this.options.sidenavCollapsed
		this.resetCollapsedState()
	}

	resetCollapsedState(timer = 400) {
		setTimeout(() => this.settings.setOptions(this.options), timer)
	}

	onSidenavClosedStart() {
		this.isContentWidthFixed = false
	}

	onSidenavOpenedChange(isOpened: boolean) {
		this.isCollapsedWidthFixed = !this.isOver
		this.options.sidenavOpened = isOpened
		this.settings.setOptions(this.options)
	}

	receiveOptions(options: AppSettings): void {
		this.options = options
		this.toggleDarkTheme(options)
	}

	toggleDarkTheme(options: AppSettings) {
		if (options.theme === 'dark') {
			this.htmlElement.classList.add('dark-theme')
			this.htmlElement.classList.remove('light-theme')
		} else {
			this.htmlElement.classList.remove('dark-theme')
			this.htmlElement.classList.add('light-theme')
		}
	}
}
