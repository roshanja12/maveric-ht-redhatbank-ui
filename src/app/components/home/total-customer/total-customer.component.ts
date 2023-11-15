import { Component } from '@angular/core';
import { InsightsService } from 'src/app/services/insights.service';

@Component({
  selector: 'app-total-customer',
  templateUrl: './total-customer.component.html',
  styleUrls: ['./total-customer.component.css'],
})
export class TotalCustomerComponent {
  cities = ['Hyderabad', 'Bangalore', 'Chennai', 'Pune'];

  currentValue = 60;
  constructor(private insightsService: InsightsService) {}

  get fillPercentage(): number {
    return this.currentValue;
  }

  getBackground(count: number) {
    const percentage = count;
    const verticalGradient = `linear-gradient(180deg, transparent ${percentage}%, #6672FA ${percentage}%)`;
    const horizontalGradient = `linear-gradient(90deg, transparent ${percentage}%, #6672FA ${percentage}%)`;
    return `${verticalGradient}, ${horizontalGradient}`;
  }

  getTotalCustomerPercentageByCity(city: string) {
    this.insightsService
      .getTotalCustomerPercentageByCity(city.toLowerCase())
      .subscribe(
        (res) => {
          console.log(res);
          this.currentValue = res;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getGraph(city: string) {
    this.getTotalCustomerPercentageByCity(city);
  }
}
