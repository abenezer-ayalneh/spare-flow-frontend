import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { SHELVES } from '../../shared/mocks/shelves.mock'
import { Shelf } from '../../shared/models/shelf.model'

@Injectable({
	providedIn: 'root',
})
export class ShelvesService {
	constructor() {}

	getShelves() {
		return of<Shelf[]>(SHELVES)
	}
}
