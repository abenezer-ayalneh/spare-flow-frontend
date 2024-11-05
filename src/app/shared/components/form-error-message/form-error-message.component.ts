import { Component, Input } from '@angular/core'
import { MaterialModule } from '../../../material.module'
import { FormControl } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { JsonPipe } from '@angular/common'

@Component({
	selector: 'app-form-error-message',
	standalone: true,
	imports: [MaterialModule, TranslateModule, JsonPipe],
	templateUrl: './form-error-message.component.html',
	styleUrl: './form-error-message.component.scss',
})
export class FormErrorMessageComponent {
	@Input({ required: true }) control: FormControl
}
