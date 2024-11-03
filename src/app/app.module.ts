import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { FeatherModule } from 'angular-feather'
import { allIcons } from 'angular-feather/icons'
// icons
import { TablerIconsModule } from 'angular-tabler-icons'
import * as TablerIcons from 'angular-tabler-icons/icons'
// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BlankComponent } from './layouts/blank/blank.component'
//Import Layouts
import { FullComponent } from './layouts/full/full.component'
//Import all material modules
import { MaterialModule } from './material.module'
import { FilterPipe } from './pipes/filter.pipe'
import { AccessTokenInterceptor } from './shared/interceptors/access-token.interceptor'

export function HttpLoaderFactory(http: HttpClient): any {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
	declarations: [AppComponent, BlankComponent, FilterPipe],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		TablerIconsModule.pick(TablerIcons),
		FeatherModule.pick(allIcons),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		NgScrollbarModule,
		FullComponent,
	],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AccessTokenInterceptor, multi: true }],
	exports: [TablerIconsModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
