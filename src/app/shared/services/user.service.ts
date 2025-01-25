import { Injectable } from '@angular/core'
import { User } from '../models/user.model'
import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private user = new BehaviorSubject<User | null>(null)

	get getUser() {
		return this.user
	}

	set setUser(user: User) {
		this.user.next(user)
	}
}
