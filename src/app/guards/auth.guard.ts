import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { HelperService } from '../services/helper.service';

export const authGuard: CanActivateFn = () => {
	const helperService = inject(HelperService);
	const token = helperService.getAccessToken();

	if (token) {
		return true;
	}

	window.location.href = 'authentication/login'; // This is intentional!

	return false;
};
