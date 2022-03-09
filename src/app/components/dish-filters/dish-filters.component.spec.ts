import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFiltersComponent } from './dish-filters.component';

describe('DishFiltersComponent', () => {
  let component: DishFiltersComponent;
  let fixture: ComponentFixture<DishFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
