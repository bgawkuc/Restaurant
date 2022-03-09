import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishReviewsComponent } from './dish-reviews.component';

describe('DishReviewsComponent', () => {
  let component: DishReviewsComponent;
  let fixture: ComponentFixture<DishReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
