import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { QuoteWithAuthor } from '../quotes/quote';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-quotes',
  templateUrl: './edit-quotes.component.html',
  styleUrls: ['./edit-quotes.component.css']
})
export class EditQuotesComponent implements OnInit {
  public quotesWithAuthors!: QuoteWithAuthor[];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    let url = environment.baseUrl + 'api/Quote/WithAuthors';
    this.http.get<QuoteWithAuthor[]>(url).subscribe(result => {
      const newResult = result.map(oldObj => {
        return {
          ...oldObj,
          datePublished: new Date(oldObj.datePublished).toLocaleDateString()
        }
      })
      this.quotesWithAuthors = newResult;
    });
  }

  handleClick(): void {
    this.router.navigate(['/edit-quote/'])
  }
}
