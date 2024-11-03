import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { MaterialModule } from '../material.module'
import { PagesRoutes } from './pages.routing.module'
import { HomeComponent } from './home/home.component'

@NgModule({
	imports: [CommonModule, MaterialModule, FormsModule, RouterModule.forChild(PagesRoutes), HomeComponent],
})
export class PagesModule {}
