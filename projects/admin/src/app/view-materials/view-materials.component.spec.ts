import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaterialsComponent } from './view-materials.component';

describe('ViewMaterialsComponent', () => {
  let component: ViewMaterialsComponent;
  let fixture: ComponentFixture<ViewMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
