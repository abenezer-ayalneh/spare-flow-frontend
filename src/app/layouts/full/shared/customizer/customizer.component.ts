import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TablerIconsModule } from 'angular-tabler-icons'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { AppSettings } from 'src/app/app.config'
import { MaterialModule } from 'src/app/material.module'
import { CoreService } from 'src/app/shared/services/core.service'

import { BrandingComponent } from '../../vertical/sidebar/branding.component'

@Component({
	selector: 'app-customizer',
	standalone: true,
	imports: [BrandingComponent, TablerIconsModule, MaterialModule, FormsModule, NgScrollbarModule],
	templateUrl: './customizer.component.html',
	styleUrls: ['./customizer.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CustomizerComponent {
	@Output() optionsChange = new EventEmitter<AppSettings>()
	constructor(private settings: CoreService) {}
	options = this.settings.getOptions()

	setDark() {
		this.optionsChange.emit(this.options)
	}

	setColor() {
		this.optionsChange.emit(this.options)
	}

	setDir() {
		this.optionsChange.emit(this.options)
	}

	setSidebar() {
		this.optionsChange.emit(this.options)
	}
}
