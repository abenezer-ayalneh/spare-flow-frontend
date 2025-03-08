import { Role } from '../../../../../shared/enums/role.enum'

export interface NavItem {
	external?: boolean
	displayName?: string
	iconName?: string
	navCap?: string
	chipContent?: string
	chipClass?: string
	subtext?: string
	route?: string
	children?: NavItem[]
	ddType?: string
	roles?: Role[]
}
