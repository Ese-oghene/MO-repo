import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterailsComponent } from './add-materails.component';

describe('AddMaterailsComponent', () => {
  let component: AddMaterailsComponent;
  let fixture: ComponentFixture<AddMaterailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMaterailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaterailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
