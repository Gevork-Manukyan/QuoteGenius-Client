import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotePageComponent } from './edit-quote-page.component';

describe('EditQuotePageComponent', () => {
  let component: EditQuotePageComponent;
  let fixture: ComponentFixture<EditQuotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuotePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
