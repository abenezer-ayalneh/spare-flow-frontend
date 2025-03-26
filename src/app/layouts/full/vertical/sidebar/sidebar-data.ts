import { NavItem } from './nav-item/nav-item'
import { Role } from '../../../../shared/enums/role.enum'

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
		roles: [Role.ADMIN, Role.SALES],
	},
	{
		displayName: 'sidebar.items',
		iconName: 'table',
		route: '/items',
		roles: [Role.ADMIN, Role.SALES],
	},
	{
		navCap: 'sidebar.config',
		roles: [Role.ADMIN],
	},

	{
		displayName: 'sidebar.users',
		iconName: 'users',
		route: '/users',
		roles: [Role.ADMIN],
	},
	{
		displayName: 'sidebar.stores',
		iconName: 'building-store',
		route: '/stores',
		roles: [Role.ADMIN],
	},
	{
		displayName: 'sidebar.shelves',
		iconName: 'packages',
		route: '/shelves',
		roles: [Role.ADMIN],
	},
	{
		displayName: 'sidebar.transactions',
		iconName: 'arrows-exchange-2',
		route: '/transaction-log',
		roles: [Role.ADMIN],
	},
]
