import { Employee } from './Employee';
import { ChartOptions } from './ChartOptions';
import { GridsterItem } from 'angular-gridster2';

export class Dashboard {
    dashboardID: string;
    employee: Employee;
    charts: ChartOptions[];
    gridsterItems : GridsterItem[];
    public constructor(dashboardID: string,
        employee: Employee,
        charts: ChartOptions[],
        gridsterItems: GridsterItem[]
        ){
            this.employee = employee;
            this.charts = charts;
            this.gridsterItems = gridsterItems;
        }
}