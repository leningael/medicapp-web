import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { InterceptorService } from './modules/auth/services/interceptor.service';
import { ToastrModule } from 'ngx-toastr';

import { es } from 'date-fns/locale';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localEs, 'es')
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: es,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es',
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
