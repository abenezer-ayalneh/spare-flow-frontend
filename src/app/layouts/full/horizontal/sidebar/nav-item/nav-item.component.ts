import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';

import { NavService } from '../../../../../services/nav.service';

@Component({
	selector: 'app-horizontal-nav-item',
	standalone: true,
	imports: [TablerIconsModule, CommonModule, MatIconModule],
	templateUrl: './nav-item.component.html',
})
export class AppHorizontalNavItemComponent {
	@Input() depth: any;
	@Input() item: any;

	constructor(
		public navService: NavService,
		public router: Router,
	) {
		if (this.depth === undefined) {
			this.depth = 0;
		}
	}

	onItemSelected(item: any) {
		if (!item.children || !item.children.length) {
			this.router.navigate([item.route]);
		}
	}
}
