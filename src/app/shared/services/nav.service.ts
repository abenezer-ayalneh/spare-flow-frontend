import { Injectable } from '@angular/core'
import { Event, NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class NavService {
	showClass: boolean = false
	public currentUrl = new BehaviorSubject<string | undefined>(undefined)

	constructor(private router: Router) {
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				this.currentUrl.next(event.urlAfterRedirects)
			}
		})
	}
}
