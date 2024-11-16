import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddOrEditStoreComponent } from './add-or-edit-store.component'

describe('AddOrEditStoreComponent', () => {
	let component: AddOrEditStoreComponent
	let fixture: ComponentFixture<AddOrEditStoreComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddOrEditStoreComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(AddOrEditStoreComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
