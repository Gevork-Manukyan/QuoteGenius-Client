import { Component, OnInit } from '@angular/core';
import { Author } from './author';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit {
  public authors!: Author[]
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Author[]>(environment.baseUrl + 'api/Author').subscribe(result => {
      this.authors = result
      console.log("AUTHORS: ", this.authors)
    }, error => console.error(error))
  }
}


