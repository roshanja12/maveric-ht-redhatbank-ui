import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ChartDataset, ChartOptions } from 'chart.js';
import { InsightsService } from 'src/app/services/insights.service';

@Component({
  selector: 'app-customer-count',
  templateUrl: './customer-count.component.html',
  styleUrls: ['./customer-count.component.css'],
})
export class CustomerCountComponent {
  totalCustomerCount: number = 0;
  data: number[] = [45, 65, 22, 33, 55, 58, 23, 44, 67, 59, 60, 69];
  yearAvailable: number[] = this.createNumberArray(2019, 2024);
  currentYearChosen: number = this.yearAvailable[0];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: { size: 14 }, // Increase the font size of y-axis labels
        },
        grid: {
          display: false, // Hide y-axis grid lines
        },
      },
      x: {
        type: 'category',
        display: false,
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
    },
  };

  public lineChartLabels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public lineChartLegend = false;
  public lineChartData: ChartDataset[] = [
    {
      data: this.data,
      label: 'Customer Count',
      backgroundColor: 'rgba(255, 165, 0, 0.6)', // Orange color with 60% opacity
      borderColor: 'rgba(255, 165, 0, 1)', // Border color (optional)
      barThickness: 4,
      borderRadius: 5,
      pointRadius: 5, // Size of data points on the line chart (optional)
      fill: false, // Disable fill under the line (optional)
    },
  ];

  constructor(private insightsService: InsightsService) {}

  ngOnInit() {
    this.updateChartData(this.yearAvailable[0]);
  }

  createNumberArray(x: number, y: number): number[] {
    // Use Array.from() to create an array of numbers from x to y
    return Array.from({ length: y - x + 1 }, (_, index) => index + x);
  }

  getCustomerCountByYear(year: number) {
    this.insightsService.getCustomerCount(year).subscribe(
      (res) => {
        console.log(res);
        this.data = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateChartData(yearChosen: number) {
    this.getCustomerCountByYear(yearChosen);
    this.lineChartData[0].data = this.data;
  }
  customerCountYearChoose(yearChosen: number) {
    this.currentYearChosen = yearChosen;
    this.updateChartData(this.currentYearChosen);
  }
}
