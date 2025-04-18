import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../../../core/services/sales.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-new-order-form',
  standalone: true,
  templateUrl: './new-order-form.component.html',
  styleUrls: ['./new-order-form.component.scss'],
  imports: [
    CommonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    NewOrderFormComponent,
    ReactiveFormsModule
  ]
})
export class NewOrderFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private salesService: SalesService,
    private dialogRef: MatDialogRef<NewOrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: { customerName: string }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.required],
      shipperId: [null, Validators.required],
      shipName: [null, Validators.required],
      shipAddress: [null, Validators.required],
      shipCity: [null, Validators.required],
      orderDate: [null, Validators.required],
      requiredDate: [null, Validators.required],
      shippedDate: [null, Validators.required],
      freight: [null, Validators.required],
      shipCountry: [null, Validators.required],
      productId: [null, Validators.required],
      unitPrice: [null, Validators.required],
      qty: [null, Validators.required],
      discount: [0]
    });
  }

  save() {
    if (this.form.valid) {
      const orderData = {
        customerName: this.customer.customerName,
        ...this.form.value
      };

      this.salesService.createOrder(orderData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
