import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
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
import { FilterPipe } from './shared/pipes/filter.pipe'
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor'
import { AccessTokenInterceptor } from './shared/interceptors/access-token.interceptor'
import { LoadingComponent } from './shared/components/loading/loading.component'
import { HttpErrorsInterceptor } from './shared/interceptors/http-errors.interceptor'
import { checkTokenFactory } from './shared/providers/player.provider'
import { Router } from '@angular/router'
import { UserService } from './shared/services/user.service'
import { TokenService } from './shared/services/token.service'

export function HttpLoaderFactory(http: HttpClient) {
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
			defaultLanguage: 'en',
			useDefaultLang: true,
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		NgScrollbarModule,
		FullComponent,
		LoadingComponent,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AccessTokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoadingInterceptor,
			multi: true,
		},
		{
			provide: APP_INITIALIZER,
			useFactory: checkTokenFactory,
			multi: true,
			deps: [Router, UserService, TokenService],
		},
	],
	exports: [TablerIconsModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
