import { Component, OnInit } from '@angular/core';
import { QuoteWithAuthor, QuoteWithAuthorDisplay } from './quote';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  public quotesWithAuthors!: QuoteWithAuthorDisplay[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let url = environment.baseUrl + 'api/Quote/WithAuthors';
    this.http.get<QuoteWithAuthor[]>(url).subscribe(result => {
      const newResult = result.map(oldObj => {
        return {
          ...oldObj,
          datePublishedString: new Date(oldObj.datePublished).toLocaleDateString()
        }
      })
      this.quotesWithAuthors = newResult;
    });
  }
}