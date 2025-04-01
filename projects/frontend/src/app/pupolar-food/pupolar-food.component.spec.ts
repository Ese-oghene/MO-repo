import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupolarFoodComponent } from './pupolar-food.component';

describe('PupolarFoodComponent', () => {
  let component: PupolarFoodComponent;
  let fixture: ComponentFixture<PupolarFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupolarFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupolarFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
