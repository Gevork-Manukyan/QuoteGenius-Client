import { Component, OnInit } from '@angular/core';
import { Author } from './author';
import { Quote } from '../quotes/quote';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit {
  public authors!: Author[]
  public quotes!: Quote[]
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Quote[]>(environment.baseUrl + 'api/Quote').subscribe(result => {
      this.quotes = result
    }, error => console.error(error));

    this.http.get<Author[]>(environment.baseUrl + 'api/Author').subscribe(result => {
      this.authors = result
    }, error => console.error(error))
  }
}


