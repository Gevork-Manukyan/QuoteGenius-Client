import { Component, OnInit } from '@angular/core';
import { Quote } from './quote';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  public quotes!: Quote[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let url = environment.baseUrl + 'api/Quote';
    this.http.get<Quote[]>(url).subscribe(result => {
      this.quotes = result;
      console.log("QUOTES: ", this.quotes[0])
    });
  }
}
