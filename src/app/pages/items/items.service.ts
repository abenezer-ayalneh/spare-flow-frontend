import { Injectable } from '@angular/core'
import { Store } from '../../shared/models/store.model'
import { delay, Observable, of } from 'rxjs'
import { Shelf } from '../../shared/models/shelf.model'
import { Item } from '../../shared/models/item.model'
import { MOCK_DELAY } from '../../shared/constants/shared.constant'

/** Constants used to fill up our data base. */
const PART_NUMBERS = [
	'46410-60A10',
	'46410-60840',
	'46410-60042',
	'46430-60042',
	'46420-60112',
	'46430-60030',
	'46410-60740',
	'46410-60B20',
	'46420-60090',
	'17801-51020',
	'17801-0L040',
	'17801-61030',
	'17801-30070',
	'17801-0C010',
	'23390-51030',
	'48510-8Z005',
	'04495-60080',
	'04495-60070',
	'48510-80A87(48520-80647)',
	'48531-80822',
	'90915-YZZD2',
	'17801-54140',
	'90915-30002',
	'52119-0M979',
	'52119-60890',
	'52119-60984',
	'62221-60020',
	'DIZIRE',
	'DIZIRE',
	'DIZIRE',
]

const NAMES = [
	'CABLE ASSY, PARKING BRAKE, NO.1',
	'CABLE ASSY, PARKING BRAKE, NO.1',
	'CABLE ASSY, PARKING BRAKE, NO.1',
	'CABLE ASSY, PARKING BRAKE, NO.3',
	'CABLE ASSY, PARKING BRAKE, NO.2',
	'CABLE ASSY, PARKING BRAKE, NO.3',
	'CABLE ASSY, PARKING BRAKE, NO.1',
	'CABLE ASSY, PARKING BRAKE, NO.1',
	'CABLE ASSY, PARKING BRAKE, NO.2',
	'ELEMENT SUB-ASSY, AIR CLEANER FILTER',
	'ELEMENT SUB-ASSY, AIR CLEANER FILTER',
	'ELEMENT SUB-ASSY, AIR CLEANER FILTER',
	'ELEMENT SUB-ASSY, AIR CLEANER FILTER',
	'ELEMENT SUB-ASSY, AIR CLEANER FILTER',
	'ELEMENT ASSY, FUEL FILTER',
	'ABSORBER ASSY, SHOCK, FRONT RH',
	'SHOE KIT, REAR BRAKE',
	'SHOE KIT, REAR BRAKE',
	'ABSORBER ASSY, SHOCK, FRONT RH,LH',
	'ABSORBER ASSY, SHOCK, REAR RH',
	'FILTER SUB-ASSY, OIL',
	'ELEMENT SUB-ASSY, AIR CLEANER FILTER',
	'FILTER SUB-ASSY, OIL',
	'COVER, FRONT BUMPER',
	'COVER, FRONT BUMPER',
	'COVER, FRONT BUMPER',
	'GLASS',
	'LINER LH',
	'LINER RH',
	'MOTOR GUARD',
]

const STORES = [
	{
		id: 1,
		name: 'Store 1',
		description: 'Store One',
		createdAt: '2024-11-02T11:31:49.681Z',
		updatedAt: '2024-11-02T11:31:49.681Z',
	},
	{
		id: 2,
		name: 'Store 2',
		description: 'Store Two',
		createdAt: '2024-11-02T11:31:49.681Z',
		updatedAt: '2024-11-02T11:31:49.681Z',
	},
	{
		id: 3,
		name: 'Store 3',
		description: 'Store Three',
		createdAt: '2024-11-02T11:31:49.681Z',
		updatedAt: '2024-11-02T11:31:49.681Z',
	},
]

const SHELVES = [
	{
		id: 1,
		name: 'Shelf 1',
		description: 'Shelf One',
		storeId: 1,
		createdAt: '2024-11-02T11:31:49.681Z',
		updatedAt: '2024-11-02T11:31:49.681Z',
	},
	{
		id: 2,
		name: 'Shelf 2',
		description: 'Shelf Two',
		storeId: 2,
		createdAt: '2024-11-02T11:31:49.681Z',
		updatedAt: '2024-11-02T11:31:49.681Z',
	},
	{
		id: 3,
		name: 'Shelf 3',
		description: 'Shelf Three',
		storeId: 3,
		createdAt: '2024-11-02T11:31:49.681Z',
		updatedAt: '2024-11-02T11:31:49.681Z',
	},
]

@Injectable({
	providedIn: 'root',
})
export class ItemsService {
	constructor() {}

	/**
	 * Builds and returns a new Item.
	 */
	createNewItem(id: number): Item {
		const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' + NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.'
		const partNumber =
			PART_NUMBERS[Math.round(Math.random() * (PART_NUMBERS.length - 1))] +
			' ' +
			PART_NUMBERS[Math.round(Math.random() * (PART_NUMBERS.length - 1))].charAt(0) +
			'.'

		return {
			id: id.toString(),
			name: name,
			partNumber: partNumber,
			quantity: Math.round(Math.random() * 100),
			location: 'Location',
			price: Math.round(Math.random() * 100),
			vat: 15,
			totalPrice: Math.round(Math.random() * 100),
			boughtFrom: 'ORIGINAL',
			store: STORES[0],
			shelf: SHELVES[0],
		}
	}

	getStores() {
		return of<Store[]>(STORES).pipe(delay(MOCK_DELAY))
	}

	getShelves() {
		return of<Shelf[]>(SHELVES).pipe(delay(MOCK_DELAY))
	}

	getItemById(id: number): Observable<Item> {
		return of<Item>(this.createNewItem(id)).pipe(delay(MOCK_DELAY))
	}
}
