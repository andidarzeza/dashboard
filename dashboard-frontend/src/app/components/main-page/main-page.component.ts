import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Chart, ChartAnimationObject } from 'chart.js';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { LayoutService } from 'src/app/services/layout.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

  let employeesNOTOnWork = 0;
  let employeesOnWork = 0;
  let employeesNames = [];
  let salariesThisMonth = [];
  let salariesLastMonth = [];
  let hoursArray = [];
  let onWorkEmployees = [];
  let chartColors = [];
  let employeesSalaryChart: Chart;
  let employeeHoursDayChart: Chart;
  let workingEmployeesChart: Chart;
  let allDashboard = [];

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements AfterViewInit {
  serverUrl = 'http://localhost:8081/socket';
  stompClient;

  options: GridsterConfig;
  chartPosition = [
    {x: 0, y: 0, rows: 3, cols: 4},
    {x: 3, y: 0, rows: 3, cols: 5},
    {x: 0, y: 1, rows: 3, cols: 5}
  ];

  ngAfterViewInit() {
    this.resetAllData();
    this.service.getAllDashboards().subscribe((response:any[]) => {
      allDashboard = response;
      response.forEach(item => {
        employeesNames.push(item.employee.firstName);
        hoursArray.push(item.employee.totalHours);
        salariesThisMonth.push(item.employee.salary.thisMonth);
        salariesLastMonth.push(item.employee.salary.lastMonth);
        if(item.employee.working) {
          employeesOnWork++;
        }
        else {
          employeesNOTOnWork++;
        }
      });
      onWorkEmployees.push(employeesOnWork);
      onWorkEmployees.push(employeesNOTOnWork);
      this.drawCharts();
    });
  }

  constructor(public service: LayoutService) {
    this.initializeWebSocketConnection();  
    this.options = {
      pushItems: true,
      minCols: 9,
      maxCols: 9,
      minRows: 200,
      maxRows: null,
      fixedColWidth: 175,
      fixedRowHeight: 106,
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

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        let dashboard = JSON.parse(message.body);
          employeesNames.push(dashboard.employee.firstName);
          salariesThisMonth.push(dashboard.employee.salary.thisMonth);
          salariesLastMonth.push(dashboard.employee.salary.lastMonth);
          hoursArray.push(dashboard.employee.totalHours);
          if(dashboard.employee.working) {
            employeesOnWork++;
          }
          else {
            employeesNOTOnWork++;
          }onWorkEmployees = [];
          onWorkEmployees.push(employeesOnWork);
          onWorkEmployees.push(employeesNOTOnWork);
          that.destroyall();
          that.drawCharts();

    });
    that.stompClient.subscribe("/delete", response => {
      let dashboards = JSON.parse(response.body);
      that.resetAllData();
      dashboards.forEach(item => {
        employeesNames.push(item.employee.firstName);
        hoursArray.push(item.employee.totalHours);
        salariesThisMonth.push(item.employee.salary.thisMonth);
        salariesLastMonth.push(item.employee.salary.lastMonth);
        if(item.employee.working) {
          employeesOnWork++;
        }
        else {
          employeesNOTOnWork++;
        }
      });
      onWorkEmployees.push(employeesOnWork);
      onWorkEmployees.push(employeesNOTOnWork);
      that.destroyall();
      that.drawCharts();
    });

    that.stompClient.subscribe("/getAll", response =>{
      let dashboards = JSON.parse(response.body);
      that.resetAllData();
      dashboards.forEach(item => {
        employeesNames.push(item.employee.firstName);
        hoursArray.push(item.employee.totalHours);
        salariesThisMonth.push(item.employee.salary.thisMonth);
        salariesLastMonth.push(item.employee.salary.lastMonth);
        if(item.employee.working) {
          employeesOnWork++;
        }
        else {
          employeesNOTOnWork++;
        }
      });
      onWorkEmployees.push(employeesOnWork);
      onWorkEmployees.push(employeesNOTOnWork);
      that.destroyall();
      that.drawCharts();
      
    });
    });

  }

  contains(dashboards, dashboard) {
    let flag = false;
    dashboards.forEach(d => {
      if(d === dashboard) flag = true;
    });
    return flag;
  }

  resetAllData() {
    employeesNames= [];hoursArray = [];salariesThisMonth =[];
    salariesLastMonth = [];onWorkEmployees = [];
    employeesOnWork = 0; employeesNOTOnWork = 0;
  }

  destroyall() {
    employeesSalaryChart.destroy();
    employeeHoursDayChart.destroy();    
    workingEmployeesChart.destroy();
  }
  drawCharts(){
    workingEmployeesChart = new Chart('workingEmployeesChart', {
      type: 'pie',
      data: {
        labels: ['Employees working', 'Employees NOT working'],
          datasets: [{
            label: 'Employees on work',
              data: onWorkEmployees,
              backgroundColor: [
                '#315273', '#fc7169'
              ],
              borderColor: [
                '#8f9cb5', '#fc7169'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
          scales: {
          }
      }
  });

  employeeHoursDayChart = new Chart('employeeHoursDayChart', {
    type: 'bar',
    data: {
        labels: employeesNames,
        datasets: [{
            label: 'Total hours / employee',
            data: hoursArray,
            backgroundColor: [
                '#315273',
                '#315273',
                '#315273',
                '#315273',
                '#315273',
                '#315273',
                '#315273',
                '#315273'
            ],
            borderColor: [
                '#8f9cb5',
                '#8f9cb5',
                '#8f9cb5',
                '#8f9cb5',
                '#8f9cb5',
                '#8f9cb5',
                '#8f9cb5'
            ],
            borderWidth: 1
        }]
    },
    options: {
      responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

  employeesSalaryChart = new Chart('employeesSalary', {
    type: 'line',
    data: {
      labels: employeesNames,
      datasets: [{
        label: 'Salary: This Month',
        data: salariesThisMonth,
        backgroundColor: [
          '#fc7169'
        ],
        fill: false,
        lineTension: 0,
        borderColor: [
          '#fc7169'
        ],
        borderWidth: 2
      },
      {
        label: 'Salary: Last Month',
        data: salariesLastMonth,
        backgroundColor: [
          '#315273'
        ],  
        fill: false,
        lineTension: 0,
        borderColor: [
          '#315273'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
    }
  });
}
}

