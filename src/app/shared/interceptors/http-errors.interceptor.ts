import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { Injectable } from '@angular/core'
import { SnackbarService } from '../services/snackbar.service'
import FilterResponseInterface from '../interfaces/error-response.interface'
import { TokenService } from '../services/token.service'

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
	constructor(
		private readonly snackbarService: SnackbarService,
		private readonly tokenService: TokenService,
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				const backendError = err.error as FilterResponseInterface

				if (typeof backendError.data === 'object' && typeof (backendError.data as any)['message'] === 'string') {
					this.snackbarService.showSnackbar((backendError.data as any)['message'])
				} else if (backendError.error) {
					this.snackbarService.showSnackbar(backendError.error)
				} else {
					this.snackbarService.showSnackbar('Unexpected error occurred. Please try again.')
				}

				if (err.status === 401) {
					this.tokenService.clearTokens()
					window.location.assign('/authentication/sign-in')
				}

				return throwError(() => new Error(err.message))
			}),
		)
	}
}
