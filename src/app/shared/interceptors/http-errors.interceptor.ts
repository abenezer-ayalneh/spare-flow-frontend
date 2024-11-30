import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { Injectable } from '@angular/core'
import { SnackbarService } from '../services/snackbar.service'
import FilterResponseInterface from '../interfaces/error-response.interface'

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
	constructor(private readonly snackbarService: SnackbarService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				const backendError = err.error as FilterResponseInterface

				if (typeof backendError.data === 'object' && typeof (backendError.data as any)['message'] === 'string') {
					this.snackbarService.showSnackbar((backendError.data as any)['message'])
				} else {
					this.snackbarService.showSnackbar(backendError.error)
				}

				return throwError(() => new Error(err.message))
			}),
		)
	}
}
