import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-quote-page',
  templateUrl: './edit-quote-page.component.html',
  styleUrls: ['./edit-quote-page.component.css']
})
export class EditQuotePageComponent implements OnInit {
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
