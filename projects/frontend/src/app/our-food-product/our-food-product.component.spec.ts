import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurFoodProductComponent } from './our-food-product.component';

describe('OurFoodProductComponent', () => {
  let component: OurFoodProductComponent;
  let fixture: ComponentFixture<OurFoodProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurFoodProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurFoodProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
