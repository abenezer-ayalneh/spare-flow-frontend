import { Injectable } from '@angular/core'
import { User } from '../models/user.model'
import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	#user = new BehaviorSubject<User | null>(null)

	get user() {
		return this.#user.getValue()
	}

	set setUser(user: User) {
		this.#user.next(user)
	}
}
