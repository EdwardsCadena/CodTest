import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { SalesService } from '../../../core/services/sales.service';
import { Customer } from '../../../core/models/customer';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { OrdersViewComponent } from '../orders-view/orders-view.component';
import { NewOrderFormComponent } from '../new-order-form/new-order-form.component';

@Component({
  selector: 'app-sales-prediction',
  standalone: true,
  templateUrl: './sales-prediction.component.html',
  styleUrls: ['./sales-prediction.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    OrdersViewComponent,
    NewOrderFormComponent
  ]
})
export class SalesPredictionComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns = ['customerName', 'lastOrderDate', 'nextPredictedOrder', 'actions'];

  constructor(private salesService: SalesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(search: string = '') {
    this.salesService.getPredictions(search).subscribe(data => this.customers = data);
  }

  viewOrders(customer: Customer) {
    this.dialog.open(OrdersViewComponent, { data: customer });
  }

  createOrder(customer: Customer) {
    this.dialog.open(NewOrderFormComponent, { data: customer });
  }
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.loadData(input.value);
  }
}
