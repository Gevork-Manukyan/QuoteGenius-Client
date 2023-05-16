import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';
import { QuotesComponent } from './quotes/quotes.component';
import { EditQuotesComponent } from './edit-quotes/edit-quotes.component';
import { EditQuotePageComponent } from './edit-quote-page/edit-quote-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'edit-quotes', component: EditQuotesComponent },
  { path: 'edit-quote/:id', component: EditQuotePageComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
