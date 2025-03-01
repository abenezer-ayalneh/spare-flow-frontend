export class CreateUserDto {
	name: string

	username: string

	phoneNumber: string

	roleId: number

	password: string

	confirmPassword: string

	active?: boolean
}
