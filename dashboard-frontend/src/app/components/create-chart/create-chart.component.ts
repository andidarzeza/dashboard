import { Component, OnInit, AfterViewInit, Inject, Optional } from '@angular/core';
import { Chart } from 'chart.js';
import { LayoutService } from 'src/app/services/layout.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-chart',
  templateUrl: './create-chart.component.html',
  styleUrls: ['./create-chart.component.css']
})

export class CreateChartComponent implements AfterViewInit {

  constructor(private service: LayoutService,private dialogRef: MatDialogRef<CreateChartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data) { }

  cType = 'bar';
  chart: Chart;
  typeIndex = 2;
  myLabels = [];
  myData = [];
  chartType = ['doughnut', 'bar', 'line'];

  canceled = false;
  chartOptions = {
    type: this.cType,
    data: {
      labels: this.myLabels,
      datasets: [{
        label: 'Employee Data Chart',
        data: this.myData,
        backgroundColor: [
          '#1C2833',
          '#27AE60',
          '#145A32'
        ],
        fill: false,
        borderColor: [
          '#48C9B0',
          '#48C9B0',
          '#48C9B0'
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
  };

  ngAfterViewInit() {
    this.drawChart();
  }

  next() {
    if(this.typeIndex === this.chartType.length-1){
      this.typeIndex = 0;
      this.repaint(this.typeIndex);
    } else {
      this.typeIndex++;
      this.repaint(this.typeIndex);
    }
  }

  previous() {
    if(this.typeIndex === 0){
      this.typeIndex = this.chartType.length - 1;
      this.repaint(this.typeIndex);
    }else{
      this.typeIndex--;
      this.repaint(this.typeIndex);

    }
  }

  drawChart(type = 'bar'){
    this.chartOptions.type = type;
    this.chart = new Chart('chart-sample', this.chartOptions);
  }
  includeSLM(){
    this.includeOrRemove('Salary (Last Month)', this.data.salaryLM);
  }
  includeSTM(){
    this.includeOrRemove('Salary (This Month)', this.data.salaryTM);
  }
  includeHW() {
    this.includeOrRemove('Hours Worked', this.data.hours);
  }

  contains(array, i) {
    let flag = false;
    array.map(
    item => {
      if(item === i){
        flag = true;
      }
    });
    return flag;
  }

  repaint(index){
    this.chart.destroy();
    this.drawChart(this.chartType[index]);
  }

  addChart() {
    this.service.sendData({
      opts: this.chartOptions,
      cancel: this.canceled
    });
    this.dialogRef.close();
  }

  remove(array: any[], item){
    let darray = [];
    let larray = [];
    for(let i = 0;i<array.length;i++){
      if(array[i] !== item){
        darray.push(this.myData[i]);
        larray.push(this.myLabels[i]);
      }
    }
    this.myData = darray;
    this.myLabels = larray;
  }

  includeOrRemove(label, d) {
    if(!this.contains(this.myLabels, label)){
      this.myLabels.push(label);
      this.myData.push(d);
      this.chartOptions.data.labels = this.myLabels;
      this.chartOptions.data.datasets[0].data = this.myData;   
      this.repaint(this.typeIndex);
    }else{
      this.remove(this.myLabels, label);
      this.chartOptions.data.labels = this.myLabels;
      this.chartOptions.data.datasets[0].data = this.myData;
      this.repaint(this.typeIndex);
    }
  }

  cancel(){
    this.canceled = true;
    this.service.sendData({
      opts: this.chartOptions,
      cancel: this.canceled
    });
    this.dialogRef.close();
  } 
}
