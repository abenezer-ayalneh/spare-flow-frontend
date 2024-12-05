import { Injectable } from '@angular/core'
import { User } from '../../shared/models/user.model'
import { BehaviorSubject } from 'rxjs'
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

	fetchUsers() {
		return this.httpClient.get<User[]>(`${API_URL}/users`).subscribe({
			next: (users: User[]) => this.usersList.next(users),
		})
	}

	getRoles() {
		return this.httpClient.get<Role[]>(`${API_URL}/roles`)
	}

	createUser(data: CreateUserDto) {
		return this.httpClient.post<User>(`${API_URL}/users`, data)
	}

	updateUser(id: number, data: Partial<CreateUserDto>) {
		return this.httpClient.patch<User>(`${API_URL}/users/${id}`, data)
	}
}
