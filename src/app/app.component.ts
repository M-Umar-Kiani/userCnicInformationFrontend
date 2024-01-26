import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CnicAddEditComponent } from './cnic-add-edit/cnic-add-edit.component';
import { CnicServiceService } from './services/cnic-service.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'fatherName',
    'cnic',
    'gender',
    'country',
    'currentAddress',
    'parmanentAddress',
    'dob',
    'dateOfIssue',
    'dateOfExpire',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _cnicService: CnicServiceService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getCnicList();
  }

  addEmployeeCnicInformation() {
    const dialogRef = this._dialog.open(CnicAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCnicList();
        }
      },
    });
  }

  getCnicList() {
    this._cnicService.getCnicList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {},
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCnic(id: number) {
    this._cnicService.deleteCnic(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee Delete Successfully', 'Ok');
        this.getCnicList();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editEmployeeCnicInformation(data: any) {
    const dialogRef = this._dialog.open(CnicAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCnicList();
        }
      },
    });
  }
}
