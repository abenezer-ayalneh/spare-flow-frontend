import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddOrEditShelvesComponent } from './add-or-edit-shelves.component'

describe('AddOrEditShelvesComponent', () => {
	let component: AddOrEditShelvesComponent
	let fixture: ComponentFixture<AddOrEditShelvesComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddOrEditShelvesComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(AddOrEditShelvesComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
