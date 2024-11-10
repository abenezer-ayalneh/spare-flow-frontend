import { NavItem } from './nav-item/nav-item'

export const navItems: NavItem[] = [
	{
		navCap: 'sidebar.reporting',
	},
	{
		displayName: 'sidebar.dashboard',
		iconName: 'dashboard',
		route: '/',
	},
	{
		navCap: 'sidebar.main',
	},
	{
		displayName: 'sidebar.items',
		iconName: 'table',
		route: '/items',
	},
	{
		displayName: 'sidebar.stores',
		iconName: 'building-store',
		route: '/stores',
	},
]
