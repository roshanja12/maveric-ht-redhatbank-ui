import { Component } from '@angular/core';

@Component({
  selector: 'app-total-customer',
  templateUrl: './total-customer.component.html',
  styleUrls: ['./total-customer.component.css'],
})
export class TotalCustomerComponent {
  cities = ['Hyderabad', 'Bangalore', 'Chennai', 'Mumbai'];

  //fillPercentage: number = 0;

  get fillPercentage(): number {
    return Math.min(100, 80);
  }

  get percentage(): number {
    return this.fillPercentage / 100;
  }

  getBackground(count: number) {
    const percentage = (count / 100) * 100;
    return `linear-gradient(270deg, #6672FA ${percentage}%, transparent ${percentage}%), linear-gradient(0deg, #6672FA ${percentage}%, lightgray ${percentage}%)`;
  }

  getGraph(city: string) {}
}
