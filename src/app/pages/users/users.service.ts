import { Injectable } from '@angular/core'
import { User } from '../../shared/models/user.model'
import { BehaviorSubject, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { CreateUserDto } from './dto/create-user.dto'
import { MatDialog } from '@angular/material/dialog'
import { AddOrEditUserComponent } from './components/add-or-edit-user/add-or-edit-user.component'
import { UpdatePasswordComponent } from './components/update-password/update-password.component'

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

	openUpdateUserPasswordModal(user: User) {
		this.matDialog.open(UpdatePasswordComponent, { data: user })
	}

	closeModals() {
		this.matDialog.closeAll()
	}

	getUsers() {
		return this.httpClient.get<User[]>(`users`).pipe(tap((users) => this.usersList.next(users)))
	}

	createUser(createUserDto: CreateUserDto) {
		return this.httpClient.post<User>(`users`, createUserDto)
	}

	updateUser(id: number, updateData: Partial<CreateUserDto>) {
		return this.httpClient.patch<User>(`users/${id}`, updateData)
	}

	updateUserPassword(id: number, updatePasswordData: Pick<CreateUserDto, 'password' | 'confirmPassword'>) {
		return this.httpClient.patch<User>(`users/password/${id}`, updatePasswordData)
	}
}
