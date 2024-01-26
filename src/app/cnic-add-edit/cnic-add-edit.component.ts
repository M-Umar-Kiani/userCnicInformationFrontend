import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CnicServiceService } from '../services/cnic-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-cnic-add-edit',
  templateUrl: './cnic-add-edit.component.html',
  styleUrls: ['./cnic-add-edit.component.scss'],
})
export class CnicAddEditComponent implements OnInit {
  cnicForm: FormGroup;

  country: string[] = ['Pakistan', 'China', 'India', 'America'];

  constructor(
    private _fb: FormBuilder,
    private _coreService: CoreService,
    private _cnicServie: CnicServiceService,
    private _dialogRef: MatDialogRef<CnicAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cnicForm = this._fb.group({
      name: '',
      fatherName: '',
      cnic: '',
      gender: '',
      country: '',
      currentAddress: '',
      parmanentAddress: '',
      dob: '',
      dateOfIssue: '',
      dateOfExpire: '',
    });
  }
  onFormSubmit() {
    if (this.cnicForm.valid) {
      if (this.data) {
        this._cnicServie
          .updateCnic(this.data.id, this.cnicForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Cnic Update Successfully', 'Ok');
              this._dialogRef.close(true);
            },
            error: (error: any) => {},
          });
      } else {
        this._cnicServie.addCnic(this.cnicForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Cnic Create Successfully', 'Ok');
            this._dialogRef.close(true);
          },
          error: (error: any) => {},
        });
      }
    }
  }
  ngOnInit(): void {
    this.cnicForm.patchValue(this.data);
  }
}
