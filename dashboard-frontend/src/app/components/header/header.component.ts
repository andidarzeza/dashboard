import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MainPageComponent } from '../main-page/main-page.component';
import { CreateDashboardComponent } from '../create-dashboard/create-dashboard.component';
import {Router} from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { UpdatedashboardComponent } from '../updatedashboard/updatedashboard.component';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  dashboards;
  serverUrl = 'http://localhost:8081/socket';
  stompClient;

  constructor(private dialog: MatDialog, private createDashboardRef: MatDialogRef<CreateDashboardComponent>, private service: LayoutService, private router: Router,
    private updateDashboardRef: MatDialogRef<UpdatedashboardComponent>,
    private dialogService: DialogService) {
      this.initializeWebSocketConnection();
     }

  ngAfterViewInit() {
    this.service.getAllDashboards().subscribe(response => {
      this.dashboards = response; 
    });
  }

  createDashboard(){
    let options = {
      panelClass: 'dialog',
      minWidth: '95%',
      disableClose: true,
      maxHeight: '100%'
    };
    this.createDashboardRef = this.dialog.open(CreateDashboardComponent, options);
    this.createDashboardRef.afterClosed().subscribe(reponse => {
      
    });
  }

  //Delete dashboard here by using the service.First write the delete request method 
  //to the back and then call that method to delete dashboard and after that update
  //the view.
  deleteDashboard(dashboard: any) {
    this.dialogService.openDialog("Delete selected dashboard?").afterClosed().subscribe(dialog => {
      if(dialog){
        const index = this.dashboards.indexOf(dashboard, 0);
        if (index > -1) this.dashboards.splice(index, 1);
        this.service.deleteDashboard(dashboard.dashboardID).subscribe(deletedDashboard => {
              
        });
      }  
    });
  }

  updateDashboard(id) {
    let options = {
      panelClass: 'dialog',
      minWidth: '95%',
      maxHeight: '100%',
      disableClose: true,
      data: {dashboardID: id}
    };
    this.updateDashboardRef = this.dialog.open(UpdatedashboardComponent, options);
  }

  navigateToDashboard(id) {
    this.router.navigate(['/dashboard-template', id]);
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        let dashboard = JSON.parse(message.body);
        that.dashboards.push(dashboard);
      });
    });
  }

  navigateHome() {
    this.router.navigate(["/main-page"]);
  }

}
