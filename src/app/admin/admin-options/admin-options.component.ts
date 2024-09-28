import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { AdminOptions } from '../models/admin-options.model';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.scss']
})

export class AdminOptionsComponent implements OnInit {
  adminOptionsForm: FormGroup;
  optionTypes= ['Add On', 'Accident Cover', 'Accessory Cover'];


  constructor(private builder: FormBuilder, private adminService: AdminService) {
    this.adminOptionsForm = this.builder.group({
      optionType: ['', Validators.required],
      optionName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      coverageAmount: ['', [Validators.required, Validators.min(1)]]
    });
  }


  ngOnInit(): void {}

  get optionDetailsForm() {
    return this.adminOptionsForm.get('optionDetails') as FormGroup;
  }


  handleSubmit() {
    if (this.adminOptionsForm.valid) {
      const adminOption: AdminOptions = this.adminOptionsForm.value;
      this.adminService.addOption(adminOption).subscribe({
        next: (res) => {
          console.log('Option added successfully', res);
          this.adminOptionsForm.reset();
        },
        error: (err) => {
          console.error('Error adding option', err);
        }
      });
    }
  }

}
