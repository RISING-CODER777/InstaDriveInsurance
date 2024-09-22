import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSignupComponent } from './user-signup.component';

describe('UserSignupComponent', () => {
  let component: UserSignupComponent;
  let fixture: ComponentFixture<UserSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ UserSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to next step', () => {
    component.next();
    expect(component.currentStep).toBe(2);
  });

  it('should navigate back', () => {
    component.currentStep = 2;
    component.back();
    expect(component.currentStep).toBe(1);
  });

  // it('should submit form', () => {
  //   component.signupForm.controls['username'].setValue('testuser');
  //   component.signupForm.controls['email'].setValue('test@gmail.com');
  //   component.signupForm.controls['phone'].setValue('1234567890');
  //   component.signupForm.controls['fullName'].setValue('Test User');
  //   component.signupForm.controls['dob'].setValue('2000-01-01');
  //   component.signupForm.controls['pincode'].setValue('123456');
  //   component.signupForm.controls['door'].setValue('12A');
  //   component.signupForm.controls['street'].setValue('Main St');
  //   component.signupForm.controls['districtState'].setValue('City, State');
  //   component.signupForm.controls['password'].setValue('password123');
  //   component.signupForm.controls['confirmPassword'].setValue('password123');

  //   spyOn(console, 'log');
  //   component.onSubmit();
  //   expect(console.log).toHaveBeenCalledWith(component.signupForm.value);
  // });

});
