import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { SalesService } from '../../../core/services/sales.service';
import { Order } from '../../../core/models/order';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders-view',
  standalone: true,
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ]
})
export class OrdersViewComponent implements OnInit {
  orders: MatTableDataSource<Order> = new MatTableDataSource();
  displayedColumns = ['orderId', 'requiredDate', 'shippedDate', 'shipName', 'shipAddress', 'shipCity'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public customer: { customerName: string },
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.salesService.getOrdersByCustomer(this.customer.customerName).subscribe(data => {
      this.orders = new MatTableDataSource(data);
      this.orders.paginator = this.paginator;
      this.orders.sort = this.sort;
    });
  }
}
