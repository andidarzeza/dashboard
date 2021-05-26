package com.dashboard.project.model;

import org.springframework.data.annotation.Id;

import java.util.Arrays;
import java.util.List;

public class Dashboard {
    private Employee employee;
    @Id
    private String dashboardID;
    private List<ChartOptions> charts;
    private List<GridsterItem> gridsterItems;

    public String getDashboardID() {
        return dashboardID;
    }

    public void setDashboardID(String dashboardID) {
        this.dashboardID = dashboardID;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public List<ChartOptions> getCharts() {
        return charts;
    }

    public void setCharts(List<ChartOptions> charts) {
        this.charts = charts;
    }

    public List<GridsterItem> getGridsterItems() {
        return gridsterItems;
    }

    public void setGridsterItems(List<GridsterItem> gridsterItems) {
        this.gridsterItems = gridsterItems;
    }
}
