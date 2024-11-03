import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TablerIconsModule } from 'angular-tabler-icons'
import { MaterialModule } from 'src/app/material.module'

import { BrandingComponent } from './branding.component'

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [BrandingComponent, TablerIconsModule, MaterialModule],
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
	constructor() {}
	@Input() showToggle = true
	@Output() toggleMobileNav = new EventEmitter<void>()
	@Output() toggleCollapsed = new EventEmitter<void>()
}
