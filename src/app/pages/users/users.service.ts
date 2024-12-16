import { Injectable } from '@angular/core'
import { User } from '../../shared/models/user.model'
import { BehaviorSubject, tap } from 'rxjs'
import { Role } from '../../shared/models/role.model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { CreateUserDto } from './dto/create-user.dto'
import { MatDialog } from '@angular/material/dialog'
import { AddOrEditUserComponent } from './components/add-or-edit-user/add-or-edit-user.component'

const API_URL = environment.apiUrl

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	usersList = new BehaviorSubject<User[] | null>(null)

	constructor(
		private readonly httpClient: HttpClient,
		private readonly matDialog: MatDialog,
	) {}

	openAddUserModal() {
		this.matDialog.open(AddOrEditUserComponent)
	}

	openEditUserModal(user: User) {
		this.matDialog.open(AddOrEditUserComponent, { data: user })
	}

	closeModals() {
		this.matDialog.closeAll()
	}

	getUsers() {
		return this.httpClient.get<User[]>(`${API_URL}/users`).pipe(tap((users) => this.usersList.next(users)))
	}

	getRoles() {
		return this.httpClient.get<Role[]>(`${API_URL}/roles`)
	}

	createUser(createUserDto: CreateUserDto) {
		return this.httpClient.post<User>(`${API_URL}/users`, createUserDto)
	}

	updateUser(id: number, updateData: Partial<CreateUserDto>) {
		return this.httpClient.patch<User>(`${API_URL}/users/${id}`, updateData)
	}
}
