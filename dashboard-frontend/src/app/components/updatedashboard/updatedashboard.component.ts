import { Component, OnInit, Optional, Inject, AfterViewInit, HostListener, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { LayoutService } from 'src/app/services/layout.service';
import { CreateChartComponent } from '../create-chart/create-chart.component';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Salary } from 'src/app/model/Salary';
import { Employee } from 'src/app/model/Employee';
import { Dashboard } from 'src/app/model/Dashboard';
import { DialogService } from 'src/app/services/dialog.service';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { ConcatSource } from 'webpack-sources';

let chartOptions;
let canceled;
let previousPosition;

@Component({
  selector: 'app-updatedashboard',
  templateUrl: './updatedashboard.component.html',
  styleUrls: ['./updatedashboard.component.css']
})
export class UpdatedashboardComponent implements OnInit {
 

  constructor(private service: LayoutService, @Optional() @Inject(MAT_DIALOG_DATA) private data,
   private dialog: MatDialog,  private dialogRef: MatDialogRef<UpdatedashboardComponent>
   , private dialogService: DialogService) {
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

  //Holds the default template of the charts that will be displayed.

  //Gridster Data
  myItems: GridsterItem[] = [];
  options: GridsterConfig;
  //This variable will hold the items of configuration for the form.
  formGridsterItems: GridsterItem[] = [{x: 0 , y: 0, rows: 4, cols: 5}, {x: 6, y: 0, rows: 4, cols: 4}];

  //Holds the name of the employee being selected.
  firstName: string = '';

  //Holds the last name of the employee being selected.
  lastName: string = '';

  //Holds the salary of the last month for the selected employee.
  lastMonthSalary: number = 0;

  //Holds the salary of the this month for the selected employee.
  thisMonthSalary: number = 0;

  //Holds the total hours that the employee worked this month.
  hoursWorked: number = 0;

  //Holds the current state of the employee.Working or not Working.
  working: boolean = true;

  //Holds the dashboard which was selected for an update.
  selectedDashboard: any;
  
  //Holds all the chart options of the selected dashboard.
  charts: any[] = [];

  @ViewChild('myCheckBox', {static: false}) checkBox;

  //Holds the ids of the canvases for update.
  canvasIds: any[] = [];

  //Holds the previous position of the gridster item.
  currentPosition;

  ngOnInit() {
    this.service.getDashboardByID(this.data.dashboardID).subscribe(dashboard => {
      this.selectedDashboard = dashboard;
      this.getEmployeeData(this.selectedDashboard);
      this.getAllCharts(this.selectedDashboard);
      this.getCanvasIds(this.charts);
      this.setUpGridsterItems(this.selectedDashboard.gridsterItems);
      this.drawAllCharts(this.charts);
    });
  }

  //This method will serve to get all the ids of the canvases.
  getCanvasIds(charts: any){
    charts.forEach(chart => {
      const id = chart.chartCanvasID + "a";
      const realID = id.toString();
      this.canvasIds.push(realID);
    });
  }

  //This method will serve to get the employee data from the selected dashboard.
  getEmployeeData(dashboard: any) {
    this.firstName = dashboard.employee.firstName;
    this.lastName = dashboard.employee.lastName;
    this.thisMonthSalary = dashboard.employee.salary.thisMonth;
    this.lastMonthSalary = dashboard.employee.salary.lastMonth;
    this.hoursWorked = dashboard.employee.totalHours;
    this.working = dashboard.employee.working;
  }
  
  //This method will serve to get all the options from the dashboard.
  getAllCharts(dashboard: any) {
    this.charts = dashboard.charts;
  }

  //This method will set up the gridster items for the charts.
  setUpGridsterItems(gridsterItems: any[]) {
    gridsterItems.forEach(gridsterItem => {
      this.myItems.push(gridsterItem);
    });
  }

  //This function will draw all charts by calling the drawChart method for each 
  //chart in the array : "charts".
  drawAllCharts(charts: any[]) {
    charts.forEach(chart => {
      this.drawChart(chart);
    });
  }

 
  //This method will serve to draw the chart by passing the chart options into it.
  drawChart(chart: any) {
    this.delay(10).then(() => {
      const chartTemplate = this.getChartOptions(chart);
      const id =chart.chartCanvasID + 'a';
      console.log(id); 
      new Chart(id, chartTemplate); 
    });
  }

  //This method will serve to get the chart options from the current chart.
  getChartOptions(chart: any) {
    const chartTemplate = { type: chart.chartType,
      data: {
        labels: chart.chartLabels,
        datasets: [{
          label: 'Employee Data Chart',
          data: chart.chartData,
          backgroundColor: [
          '#1C2833',
          '#27AE60',
          '#145A32'],
          fill: false,
          borderColor: ['#48C9B0',
          '#48C9B0',
          '#48C9B0'],
          borderWidth: 1
        }]
      },
      options: {responsive: true,scales: {yAxes: [{ticks: {beginAtZero: true}}]}}
    };
    return chartTemplate;
  }

  onMouseDown(item :GridsterItem) {
    previousPosition = {xVal: item.x,
    yVal: item.y,
    gcolumns: item.cols,
    grows: item.rows};
  }

  onClick(item) {
    this.currentPosition = item;
  }

  @HostListener('window:keydown',['$event'])
  reset($event: KeyboardEvent) {
    if(($event.ctrlKey || $event.metaKey) && $event.keyCode == 90) {
    
    }
  }
  //This method will serve to send an update request to the server for the update of
  //the dashboard.
  saveChanges() {
    const salary:Salary = new Salary(this.lastMonthSalary, this.thisMonthSalary);
    const employee:Employee = new Employee(this.hoursWorked, this.firstName, this.lastName, salary, this.working);
    const dashboard:Dashboard = new Dashboard(this.data.dashboardID, employee, this.charts, this.myItems);
    this.service.updateDashboard(dashboard, this.data.dashboardID).subscribe(response => {
      
    });
    this.dialogRef.close();
  }

  //This method will serve to change the state of the employee from working to not working
  //or vice versa.
  onWork(event) {
   event.checked? this.working = true : this.working = false;
  }

  closePanel() {
    this.dialogService.openDialog("Close Update Panel?").afterClosed().subscribe(response => {
      if(response) this.dialogRef.close();
    });
  }

  addNewChart(){
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
        this.myItems.push({x: 5, y: 1, rows: 4, cols: 4});
        var ID = this.generateID();
        this.canvasIds.push(ID);
        this.charts.push({
          chartCanvasID: ID,
          chartType: chartOptions.type,
          chartLabels: chartOptions.data.labels,
          chartData: chartOptions.data.datasets[0].data
        });
        this.delay(10).then(any=>{
          //Replace this.chartNumber with a random id and push it to an array of ids.
          console.log(ID);
          new Chart(ID, chartOptions);
        });
      }
    }); 
  }

  deleteChart(item: any) {
    this.dialogService.openDialog("Delete Selected Chart?").afterClosed().subscribe(response => {
      if(response){
        const index = this.myItems.indexOf(item, 0);
        if (index > -1) {
          this.myItems.splice(index, 1);
          this.charts.splice(index, 1);
          this.canvasIds.splice(index, 1);
        }
      } 
    });
  }

  //Generates unique ids.
  generateID(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  //The delay function will serve to call functions after a period of time.
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
