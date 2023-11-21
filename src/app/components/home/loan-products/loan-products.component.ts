import { Component } from '@angular/core';
import { InsightsService } from 'src/app/services/insights.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-loan-products',
  templateUrl: './loan-products.component.html',
  styleUrls: ['./loan-products.component.css'],
})
export class LoanProductsComponent {
  years = [2023, 2022, 2021, 2020];

  monthsData: { [key: string]: number } = {
    January: 90,
    February: 40,
    March: 60,
    April: 60,
    May: 45,
    June: 75,
    July: 62,
    August: 23,
    September: 43,
    October: 49,
    Novemeber: 29,
    December: 39,
  };

  constructor(
    private insightsService: InsightsService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.getLoanDataByYear(this.years[0]);
  }

  getFirstHalfMonths() {
    const halfLength = Math.ceil(Object.keys(this.monthsData).length / 2);
    const monthsArray = Object.keys(this.monthsData).slice(0, halfLength);
    return monthsArray.map((month: string) => ({
      name: month,
      count: this.monthsData[month],
    }));
  }

  getSecondHalfMonths() {
    const halfLength = Math.ceil(Object.keys(this.monthsData).length / 2);
    const monthsArray = Object.keys(this.monthsData).slice(halfLength);
    return monthsArray.map((month) => ({
      name: month,
      count: this.monthsData[month],
    }));
  }

  getBackground(count: number) {
    const percentage = (count / 100) * 100;
    return `linear-gradient(to right, #00E38C ${percentage}%, #F5F6F8 ${percentage}%)`;
  }
  getLoanDataByYear(year: number) {
    this.insightsService.getLoanProducts(year).subscribe(
      (res) => {
        console.log(res);
        this.monthsData = res;
      },
      (err) => {
        this.snackBarService.showSnackBar(
          'Unable to fetch data for loan products for the year ' + year
        );
        console.log(err);
      }
    );
  }
  onYearSelect(event: any) {
    let selectedYear = event.target.value;
    this.getLoanDataByYear(selectedYear);
  }
}
