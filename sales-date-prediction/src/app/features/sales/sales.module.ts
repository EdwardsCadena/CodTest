import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalesPredictionComponent } from './sales-prediction/sales-prediction.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { NewOrderFormComponent } from './new-order-form/new-order-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SalesPredictionComponent }]),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SalesPredictionComponent,
    OrdersViewComponent,
    NewOrderFormComponent
  ]
})
export class SalesModule {}
