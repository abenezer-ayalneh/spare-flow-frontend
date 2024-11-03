import { NavItem } from './nav-item/nav-item'

export const navItems: NavItem[] = [
	{
		navCap: 'Reporting',
	},
	{
		displayName: 'Dashboard',
		iconName: 'dashboard',
		route: '/',
	},
	{
		navCap: 'Main',
	},
	{
		displayName: 'Items',
		iconName: 'table',
		route: '/items',
		// children: [
		// 	{
		// 		displayName: 'Menu 1',
		// 		iconName: 'point',
		// 		route: '/menu-1',
		// 		children: [
		// 			{
		// 				displayName: 'Menu 1',
		// 				iconName: 'point',
		// 				route: '/menu-1',
		// 			},
		//
		// 			{
		// 				displayName: 'Menu 2',
		// 				iconName: 'point',
		// 				route: '/menu-2',
		// 			},
		// 		],
		// 	},
		//
		// 	{
		// 		displayName: 'Menu 2',
		// 		iconName: 'point',
		// 		route: '/menu-2',
		// 	},
		// ],
	},
]
