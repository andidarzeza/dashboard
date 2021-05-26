import {AfterViewInit, Component, OnInit, Optional, Inject} from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Chart } from 'chart.js';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateChartComponent } from '../create-chart/create-chart.component';
import { LayoutService } from 'src/app/services/layout.service';
import { Salary } from 'src/app/model/Salary';
import { Employee } from 'src/app/model/Employee';
import { Dashboard } from 'src/app/model/Dashboard';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


let chartOptions;
let canceled;
@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.css']
})

export class CreateDashboardComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private service: LayoutService, private dialogRef: MatDialogRef<CreateChartComponent>,
    private dialogService: DialogService) {  
    this.options = {
        pushItems: true,
        minCols: 9,
        maxCols: 9,
        minRows: 7,
        maxRows: 100,
        fixedColWidth: 164,
        fixedRowHeight: 90,
        setGridSize: true,
        mobileBreakpoint: 0,
        gridType: 'fixed',
        resizable: {
            enabled: true
        },
        draggable: {
            enabled: true
        }
     };
  }

  //Gridster position Data
  xPos = 5;
  yPos = 1;
  gRows = 4;
  gCols = 4;
  //Chart.js Data
  chartNumber = 0;
  chartTypes = ['bar', 'line', 'pie'];
  charts: any = [];
  chartIDs: string[] = [];

  //Employee Data
  firstName: string = '';
  lastName: string = '';
  lastMonthSalary = 0;
  thisMonthSalary = 0;
  hoursWorked = 0;
  working = false;

  //Gridster Data
  options: GridsterConfig;
  myItem = [
    {x: 0, y: 0, rows: 4, cols: 5},
    {x: 5, y: 0, rows: 4, cols: 4}
  ];
  items: GridsterItem[] = [];
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  addWidget(){
    const dialogRef = this.dialog.open(CreateChartComponent, {
      panelClass: 'create-chart',
      disableClose: true,
      data: {
        salaryLM: this.lastMonthSalary,
        salaryTM: this.thisMonthSalary,
        hours: this.hoursWorked
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.service.data$.subscribe(dataResponse => {
        if(dataResponse !==null){
          chartOptions = dataResponse.opts;
          canceled = dataResponse.cancel;
        }
      });
      if(!canceled){
        this.items.push({x: 0, y: 4, rows: 4, cols: 4});
        var ID = this.generateID();
        this.chartIDs.push(ID);
        this.delay(10).then(any=>{
          this.drawChart(ID, chartOptions);
          this.chartNumber++;
        });
      }
      this.delay(10).then(any=>{
        this.items.forEach(item => {
          console.log(item);
        });  
      });
      
    });    
  }
  
  generateID(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  addDashboard() {
    let salary = new Salary(this.lastMonthSalary, this.thisMonthSalary);
    let employee = new Employee(this.hoursWorked, this.firstName, this.lastName,salary, this.working);
    let dashboard = new Dashboard(null, employee, this.charts, this.items);
    console.log(dashboard);
    this.service.addDashboard(dashboard).subscribe(response => {
        this.service.sendData2(response);
        this.dialogRef.close();
        this.router.navigate(['/main-page']);
    });
  }

  closePanel() {
    this.dialogService.openDialog("Close Create Panel?").afterClosed().subscribe(response => {
      if(response) this.dialogRef.close();
    });
  }

  onWork() {
    this.working = !this.working;
  }

  drawChart(id, options) {
    let currOptions = {
      chartCanvasID: id,
      chartType: options.type,
      chartLabels: options.data.labels,
      chartData: options.data.datasets[0].data
    }
    //this.charts is used to hold the configuration of all Charts that will be send 
    //to the database.
    //DO NOT REMOVE.
    this.charts.push(currOptions);
    new Chart(id, options); 
  }

  ngOnInit() {
    
  }
  
}
