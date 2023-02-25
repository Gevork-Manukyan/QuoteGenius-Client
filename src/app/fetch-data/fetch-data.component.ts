import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent {
  public quotes: Quote[] = []
  baseUrl = "https://localhost:7064/"

  constructor(http: HttpClient) {
    http.get<Quote[]>(this.baseUrl + 'quote').subscribe(result => {
      this.quotes = result
    }, error => console.error(error));
  }
}

interface Quote {
  date: string,
  text: string,
  author: string
}