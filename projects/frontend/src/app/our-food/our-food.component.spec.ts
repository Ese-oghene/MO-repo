import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurFoodComponent } from './our-food.component';

describe('OurFoodComponent', () => {
  let component: OurFoodComponent;
  let fixture: ComponentFixture<OurFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
