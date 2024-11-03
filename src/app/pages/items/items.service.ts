import { Injectable } from '@angular/core'
import { Item } from './types/items.type'

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

@Injectable({
	providedIn: 'root',
})
export class ItemsService {
	constructor() {}

	/** Builds and returns a new Item. */
	createNewItem(id: number): Item {
		const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' + NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.'
		const partNumber =
			PART_NUMBERS[Math.round(Math.random() * (PART_NUMBERS.length - 1))] +
			' ' +
			PART_NUMBERS[Math.round(Math.random() * (PART_NUMBERS.length - 1))].charAt(0) +
			'.'

		// tslint:disable-next-line - Disables all
		return {
			id: id.toString(),
			name: name,
			partNumber: partNumber,
			quantity: Math.round(Math.random() * 100),
			location: 'Location',
			price: Math.round(Math.random() * 100),
			vat: 15,
			totalPrice: Math.round(Math.random() * 100),
		}
	}
}
