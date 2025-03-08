import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError, timeout } from 'rxjs'
import { Injectable } from '@angular/core'
import { SnackbarService } from '../services/snackbar.service'
import FilterResponseInterface from '../interfaces/error-response.interface'
import { TokenService } from '../services/token.service'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'

const TIMEOUT = environment.timeout

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
	constructor(
		private readonly snackbarService: SnackbarService,
		private readonly tokenService: TokenService,
		private readonly router: Router,
	) {}

	intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
		return next.handle(request).pipe(
			timeout(TIMEOUT),
			catchError((err: HttpErrorResponse) => {
				const backendError = err.error as FilterResponseInterface

				if (typeof backendError.data === 'object' && typeof (backendError.data as unknown as { message: string })['message'] === 'string') {
					this.snackbarService.showSnackbar((backendError.data as unknown as { message: string })['message'])
				} else if (backendError.error) {
					this.snackbarService.showSnackbar(backendError.error)
				} else {
					this.snackbarService.showSnackbar('Unexpected error occurred. Please try again.')
				}

				if (err.status === 401) {
					this.tokenService.clearTokens()
					if (this.router.routerState.snapshot.url !== '/authentication/sign-in') {
						window.location.assign('/authentication/sign-in')
					}
				}

				return throwError(() => new Error(err.message))
			}),
		)
	}
}
