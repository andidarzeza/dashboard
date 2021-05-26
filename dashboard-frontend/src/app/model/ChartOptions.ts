export class ChartOptions {
    chartCanvasID: string;
    chartType: string;
    chartLabels: string[];
    chartData: number[];

    public constructor(chartCanvasID: string,
        chartType: string,
        chartLabels: string[],
        chartData: number[]) {
            this.chartCanvasID = chartCanvasID;
            this.chartType = chartType;
            this.chartLabels = chartLabels;
            this.chartData = chartData;
        }
}