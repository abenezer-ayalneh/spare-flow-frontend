import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { RbacService } from '../services/rbac.service'
import { Role } from '../enums/role.enum'

@Directive({
	selector: '[appIsGranted]',
	standalone: true,
})
export class IsGrantedDirective implements OnInit {
	@Input({ required: true }) appIsGranted: Role[] | undefined

	constructor(
		private readonly rbacService: RbacService,
		private readonly templateRef: TemplateRef<HTMLElement>,
		private readonly viewContainer: ViewContainerRef,
	) {}

	ngOnInit() {
		if (!this.appIsGranted || (this.appIsGranted && this.rbacService.isGranted(this.appIsGranted))) {
			this.viewContainer.clear()
			this.viewContainer.createEmbeddedView(this.templateRef)
		}
	}
}
