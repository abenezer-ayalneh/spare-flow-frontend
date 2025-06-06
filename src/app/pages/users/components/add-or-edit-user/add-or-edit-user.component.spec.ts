import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddOrEditUserComponent } from './add-or-edit-user.component'

describe('AddOrEditUserComponent', () => {
	let component: AddOrEditUserComponent
	let fixture: ComponentFixture<AddOrEditUserComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddOrEditUserComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(AddOrEditUserComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
