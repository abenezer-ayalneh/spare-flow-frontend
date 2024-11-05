import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { LoadingService } from './loading.service'
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router'
import { AsyncPipe, NgTemplateOutlet } from '@angular/common'
import { MaterialModule } from '../../../material.module'

@Component({
	selector: 'app-loading',
	standalone: true,
	imports: [AsyncPipe, MaterialModule, NgTemplateOutlet],
	templateUrl: './loading.component.html',
	styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {
	loading$: Observable<boolean>

	@Input()
	detectRouteTransitions = false

	@ContentChild('loading')
	customLoadingIndicator: TemplateRef<any> | null = null

	constructor(
		private loadingService: LoadingService,
		private router: Router,
	) {
		this.loading$ = this.loadingService.loading$
	}

	ngOnInit() {
		if (this.detectRouteTransitions) {
			this.router.events
				.pipe(
					tap((event) => {
						if (event instanceof RouteConfigLoadStart) {
							this.loadingService.loadingOn()
						} else if (event instanceof RouteConfigLoadEnd) {
							this.loadingService.loadingOff()
						}
					}),
				)
				.subscribe()
		}
	}
}
