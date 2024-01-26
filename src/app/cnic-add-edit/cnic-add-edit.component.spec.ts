import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnicAddEditComponent } from './cnic-add-edit.component';

describe('CnicAddEditComponent', () => {
  let component: CnicAddEditComponent;
  let fixture: ComponentFixture<CnicAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnicAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnicAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
