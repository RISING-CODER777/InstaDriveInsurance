import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApprovalComponent } from './new-approval.component';

describe('NewApprovalComponent', () => {
  let component: NewApprovalComponent;
  let fixture: ComponentFixture<NewApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
