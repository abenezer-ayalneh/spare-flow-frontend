import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { HelperService } from '../services/helper.service'

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
	constructor(private readonly helperService: HelperService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let nextRequest = request

		const accessToken = this.helperService.getAccessToken()

		if (accessToken) {
			nextRequest = request.clone({
				headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
			})
		}

		return next.handle(nextRequest)
	}
}
