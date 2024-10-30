import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

import { NavService } from '../../../../services/nav.service';
import { AppHorizontalNavItemComponent } from './nav-item/nav-item.component';
import { navItems } from './sidebar-data';

@Component({
	selector: 'app-horizontal-sidebar',
	standalone: true,
	imports: [AppHorizontalNavItemComponent, CommonModule],
	templateUrl: './sidebar.component.html',
})
export class AppHorizontalSidebarComponent {
	navItems = navItems;
	parentActive = '';

	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor(
		public navService: NavService,
		public router: Router,
		media: MediaMatcher,
		changeDetectorRef: ChangeDetectorRef,
	) {
		this.mobileQuery = media.matchMedia('(min-width: 1100px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
		this.router.events.subscribe(() => (this.parentActive = this.router.url.split('/')[1]));
	}
}
