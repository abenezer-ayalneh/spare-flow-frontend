import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

const BASE_URL = environment.apiUrl

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
		if (!request.url.includes('assets/i18n')) {
			const newRequest = request.clone({
				url: `${BASE_URL}/${request.url}`,
			})
			return next.handle(newRequest)
		}

		return next.handle(request)
	}
}
