import { CanActivateFn, Router } from '@angular/router'
import { RbacService } from '../services/rbac.service'
import { inject } from '@angular/core'
import { Role } from '../enums/role.enum'

export const roleGuard: CanActivateFn = async (route) => {
	const rbacService = inject(RbacService)
	const router = inject(Router)

	// Get roles from the data passed down
	const roles: Role[] | undefined = route.data['roles']
	// Initiate the isGranted value as false
	let isGranted = false

	// Set the isGranted value
	if (roles) {
		isGranted = rbacService.isGranted(roles)
	}

	// If the role is granted, allow the routing
	if (isGranted) {
		return true
	}

	await router.navigate(['/'])

	return false
}
