import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../model/Employee';
import { Dashboard } from '../model/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient) { }

  private _dataSource = new BehaviorSubject<any>(null);
  data$ = this._dataSource.asObservable();

  private _dataSource2 = new BehaviorSubject<any>(null);
  data2$ = this._dataSource2.asObservable();

  sendData(data: any){
    this._dataSource.next(data);
  }
  sendData2(data: any){
    this._dataSource2.next(data);
  }

  getAllDashboards() {
    return this.http.get<Dashboard[]>('http://localhost:8081/getDashboards');
  }

  addDashboard(dashboard: Dashboard) {
    return this.http.post<Dashboard>('http://localhost:8081/dashboard', dashboard);
  }

  updateDashboard(dashboard: Dashboard, id: number){
    return this.http.put<Dashboard>('http://localhost:8081/dashboards/'+id, dashboard);
  }

  getDashboardByID(id: string) {
    return this.http.get<Dashboard>('http://localhost:8081/dashboard/'+id);
  }

  deleteDashboard(id: string) {
    return this.http.delete<Dashboard>('http://localhost:8081/dashboard/'+id);
  }

}
