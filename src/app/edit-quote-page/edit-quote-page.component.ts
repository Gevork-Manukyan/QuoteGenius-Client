import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { environment } from '../environment/environment';
import { QuoteWithAuthor } from '../quotes/quote';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-quote-page',
  templateUrl: './edit-quote-page.component.html',
  styleUrls: ['./edit-quote-page.component.css']
})
export class EditQuotePageComponent implements OnInit {
  quotesWithAuthor?: QuoteWithAuthor;
  form!: FormGroup;
  id!: number;
  datePickerEvent!: MatDatepickerInputEvent<Date>;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      quoteText: [''],
      authorName: [''],
      datePublished: [''],
    });

    this.loadData();
  }

  loadData(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    let url = environment.baseUrl + `api/Quote/WithAuthor/${idParam}`;
    this.http.get<QuoteWithAuthor>(url).subscribe(result => {
      this.quotesWithAuthor = result;
      this.form.patchValue(this.quotesWithAuthor)
    });
  }

  onSubmit() {
    let quotesWithAuthor = this.quotesWithAuthor!;

    quotesWithAuthor.quoteText = this.form.controls['quoteText'].value;
    quotesWithAuthor.authorName = this.form.controls['authorName'].value;
    quotesWithAuthor.datePublished = this.form.controls['datePublished'].value;

    let url = environment.baseUrl + `api/Quote/WithAuthor/${quotesWithAuthor.quoteId}`;

    this.http.put<QuoteWithAuthor>(url, quotesWithAuthor).subscribe({
      next: () => {
        console.log(`Quote ${quotesWithAuthor.quoteId} was updated successfully`);
        this.router.navigate(['/edit-quotes']);
      }
    });
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>): void {
    this.datePickerEvent = event;
    this.form.get('datePublished')?.setValue(event.value);
  }
}
