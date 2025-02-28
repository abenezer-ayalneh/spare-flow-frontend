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
}
