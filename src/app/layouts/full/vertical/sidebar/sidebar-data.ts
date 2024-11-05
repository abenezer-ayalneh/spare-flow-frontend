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
