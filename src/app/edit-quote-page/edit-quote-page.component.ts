import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from '../environment/environment';
import { QuoteWithAuthor } from '../quotes/quote';

@Component({
  selector: 'app-edit-quote-page',
  templateUrl: './edit-quote-page.component.html',
  styleUrls: ['./edit-quote-page.component.css']
})
export class EditQuotePageComponent implements OnInit {
  quotesWithAuthor?: QuoteWithAuthor;
  form!: FormGroup;
  id!: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        quoteText: new FormControl(''),
        authorName: new FormControl(''),
        datePublished: new FormControl(''),
      }
    );

    this.loadData();
  }

  loadData(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    let url = environment.baseUrl + `api/Quote/WithAuthor/${idParam}`;
    this.http.get<QuoteWithAuthor>(url).subscribe(result => {
      const newResult = {
          ...result,
          datePublished: new Date(result.datePublished).toLocaleDateString()
      }
      this.quotesWithAuthor = newResult;
      this.form.patchValue(this.quotesWithAuthor)
    });
  }

  onSubmit() {
    // let quote = this.quote!;

    // quote.name = this.form.controls['name'].value;
    // quote.iso2 = this.form.controls['iso2'].value;
    // quote.iso3 = this.form.controls['iso3'].value;

    // let url = environment.baseUrl + `api/Countries/${quote.id}`;

    // this.http.put<QuoteWithAuthor>(url, quote).subscribe({
    //   next: () => {
    //     console.log(`Quote ${quote.id} was updated successfully`);
    //     this.router.navigate(['/countries']);
    //   }
    // });
  }


}
