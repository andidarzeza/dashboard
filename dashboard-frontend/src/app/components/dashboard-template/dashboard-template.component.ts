import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {Chart} from "chart.js";
import {GridsterConfig, GridsterItem} from "angular-gridster2";
import { LayoutService } from 'src/app/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.css']
})
export class DashboardTemplateComponent implements AfterViewInit {
  serverUrl = 'http://localhost:8081/socket';
  stompClient;
  constructor(private service: LayoutService, private activatedRoute: ActivatedRoute) {
    this.options = {pushItems: true, minCols: 9, maxCols: 9, minRows: 7, maxRows: 100,
      fixedColWidth: 174, fixedRowHeight: 90, setGridSize: true, mobileBreakpoint: 0,
      gridType: 'fixed', resizable: { enabled: true}, draggable: {enabled: true}};
      this.initializeWebSocketConnection();
  }

  //These two variables hold the first name and last name of the selected employee.
  firstName: string = '';
  lastName: string = '';

  //These two variables hold the last month salary and the current salary 
  //of the selected employee.
  lastMonthSalary = 0;
  thisMonthSalary = 0;

  allChartObjects: Chart[] = [];

  //This variable holds the total number of hours that
  //the selected employee has worked.
  hoursWorked = 0;

  //This variable holds the id of the selected dashboard from the dashboard list.
  //This variable is used as an input parameter to get the dashboard from the back-end.
  selectedID;
  
  //This variable holds the dashboard selected from the dashboard list.
  selectedDashboard;

  //This variable holds all the charts that the seleced dashboard contains.
  charts: any[];

  //This variable will hold all the ids of the canvases where the charts will be drawed.
  canvasIds: any[];

  //This variable holds all the chart templates.
  allChartTemplates: any[] = [];
  //Gridster Data  
  options: GridsterConfig;
  myItem = [{x: 0, y: 0, rows: 4, cols: 4}, {x: 5, y: 0, rows: 4, cols: 4}];
  items: GridsterItem[] = [];

  ngAfterViewInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      this.selectedID = this.getSelectedID(param);
      this.service.getDashboardByID(this.selectedID).subscribe(dashboard => {
        this.selectedDashboard = dashboard;
        this.getEmployeeData(this.selectedDashboard);
        this.getAllCharts(this.selectedDashboard);
        this.canvasIds = this.getChartCanvasID(this.charts);
        this.setUpGridsterItems(this.selectedDashboard.gridsterItems);
        this.drawAllCharts(this.charts);
      });
    }); 
  }

  //This method will make possible to get all the chart options that a dashboard contains.
  getAllCharts(dashboard: any) {
    this.charts = dashboard.charts;
  }

  destroyAllCharts() {
    this.allChartObjects.forEach(chart => {
      chart.destroy();
    });
  }

  //This method will set up all the gridster items needed for the charts.
  setUpGridsterItems(gridsterItems: any[]) {
    this.resetGrid();
    this.myItem = [];
    this.myItem.push({x: 0, y: 0, rows: 4, cols: 5});
    gridsterItems.forEach(gridsterItem => this.items.push(gridsterItem));
  }

  //Gets the selected id of the dashboard which was selected in the dashboard list.
  getSelectedID(param){
    return param.get('id');
  }

  //This method will draw all the charts by calling the drawChart() for each chart 
  //in the charts array.
  drawAllCharts(charts: any[]) {
    charts.forEach(chart => this.drawChart(chart));
  }

  //This method will serve to return the array of chartCanvas ids.
  getChartCanvasID(charts: any) {
    let chartIds = [];
    charts.forEach(chart => {
      chartIds.push(chart.chartCanvasID);
    });
    return chartIds;
  }

  //This method draws the chart given the canvas id and the template needed 
  //to show the chart.
  drawChart(chart){
    const id = chart.chartCanvasID;
    this.delay(10).then(() => {
      const options = this.getChartOptions(chart);
      const chartObject: Chart = new Chart(id, options);
      this.allChartObjects.push(chartObject);
    });
  }

  //This method will get a chart and will return the current options with data
  //for the chart to be displayed.
  getChartOptions(chart: any) {
      const chartTemplate = {
        type: chart.chartType,
        data: {
          labels: chart.chartLabels,
          datasets: [{
            label: 'Employee Data Chart',
            data: chart.chartData,
            backgroundColor: [
              '#1C2833',
              '#27AE60',
              '#145A32'
            ],
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

  //This method will get all the employee data from the selected dashboard.
  getEmployeeData(dashboard: any) {
    this.firstName = dashboard.employee.firstName;
    this.lastName = dashboard.employee.lastName;
    this.lastMonthSalary = dashboard.employee.salary.lastMonth;
    this.thisMonthSalary = dashboard.employee.salary.thisMonth;
    this.hoursWorked = dashboard.employee.totalHours;
  }

  //The delay function is required to run some code after some time has passed.
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  //This method will serve to clean up the template after changing the selected
  //dashboard from the list.
  resetGrid() {
    this.items = [];
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/update", (message) => {
        let dashboard = JSON.parse(message.body);
        that.charts = dashboard.charts;
        let gridsterItems = dashboard.gridsterItems;
        console.log(gridsterItems);
        that.canvasIds = that.getChartCanvasID(that.charts);
        that.destroyAllCharts();
        that.resetGrid();
        that.setUpGridsterItems(gridsterItems);
        that.delay(10).then(() => {
          that.drawAllCharts(that.charts);  
        });
      });
    });
  }
}
