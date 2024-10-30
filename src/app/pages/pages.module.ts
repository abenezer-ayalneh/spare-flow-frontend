import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { PagesRoutes } from './pages.routing.module';
import { StarterComponent } from './starter/starter.component';

@NgModule({
	imports: [CommonModule, MaterialModule, FormsModule, RouterModule.forChild(PagesRoutes), StarterComponent],
})
export class PagesModule {}
