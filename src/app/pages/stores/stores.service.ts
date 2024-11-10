import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { STORES } from '../../shared/mocks/stores.mock'
import { Store } from '../../shared/models/store.model'

@Injectable({
	providedIn: 'root',
})
export class StoresService {
	constructor() {}

	getStores(): Observable<Store[]> {
		return of<Store[]>(STORES)
	}
}
