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
		navCap: 'sidebar.config',
	},

	{
		displayName: 'sidebar.users',
		iconName: 'users',
		route: '/users',
	},
	{
		displayName: 'sidebar.stores',
		iconName: 'building-store',
		route: '/stores',
	},
	{
		displayName: 'sidebar.shelves',
		iconName: 'packages',
		route: '/shelves',
	},
]
