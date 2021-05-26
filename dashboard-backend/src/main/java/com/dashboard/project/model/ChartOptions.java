package com.dashboard.project.model;

import org.springframework.data.annotation.Id;

import java.util.Arrays;
import java.util.List;

public class ChartOptions {

    private String chartCanvasID;
    private String chartType;
    private List<String> chartLabels;
    private List<Integer> chartData;

    public String getChartCanvasID() {
        return chartCanvasID;
    }

    public void setChartCanvasID(String chartCanvasID) {
        this.chartCanvasID = chartCanvasID;
    }

    public String getChartType() {
        return chartType;
    }

    public void setChartType(String chartType) {
        this.chartType = chartType;
    }

    public List<String> getChartLabels() {
        return chartLabels;
    }

    public void setChartLabels(List<String> chartLabels) {
        this.chartLabels = chartLabels;
    }

    public List<Integer> getChartData() {
        return chartData;
    }

    public void setChartData(List<Integer> chartData) {
        this.chartData = chartData;
    }

    @Override
    public String toString() {
        return "ChartOptions{" +
                "chartCanvasID='" + chartCanvasID + '\'' +
                ", chartType='" + chartType + '\'' +
                ", chartLabels=" + chartLabels +
                ", chartData=" + chartData +
                '}';
    }
}
