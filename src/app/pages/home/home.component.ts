import { Component, ViewEncapsulation } from '@angular/core';

import { MaterialModule } from '../../material.module';
@Component({
	selector: 'app-home',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './home.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {}
