import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuotesComponent } from './quotes/quotes.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from '@angular/forms';
import { EditQuotesComponent } from './edit-quotes/edit-quotes.component';
import { EditQuotePageComponent } from './edit-quote-page/edit-quote-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FetchDataComponent,
    HomeComponent,
    LoginComponent,
    QuotesComponent,
    EditQuotesComponent,
    EditQuotePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
