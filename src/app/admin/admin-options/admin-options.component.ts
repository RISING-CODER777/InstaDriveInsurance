import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.scss']
})
export class AdminOptionsComponent {
  adminOptionsForm: FormGroup;
  optionTypes= ['AddOn', 'AccidentCover', 'AccessoryCover'];


  constructor(private builder: FormBuilder) {
    this.adminOptionsForm = this.builder.group({
      optionDetails: this.builder.group({
        optionType: ['', Validators.required],
        optionName: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.maxLength(255)]],
        price: ['', [Validators.required, Validators.min(1)]],
        coverageAmount: ['', [Validators.required, Validators.min(1)]]
      }),

    });
  }

  ngOnInit(): void {}

  get optionDetailsForm() {
    return this.adminOptionsForm.get('optionDetails') as FormGroup;
  }


  handleSubmit() {
    if (this.adminOptionsForm.valid) {
      console.log('Form Submitted!', this.adminOptionsForm.value);
    }
  }
}
