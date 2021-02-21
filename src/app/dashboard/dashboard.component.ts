import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx: any;
  public datasets: any;
  public data: any;
  public myChartData: any;

  constructor() {}

  ngOnInit(): void {
    const gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: 'transparent',
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: '#9e9e9e',
            },
          },
        ],

        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: '#9e9e9e',
            },
          },
        ],
      },
    };

    this.canvas = document.getElementById('chartLineRed');
    this.ctx = this.canvas.getContext('2d');

    const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    // green colors
    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)');
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)');

    const myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
        datasets: [
          {
            label: ' New Vehicle',
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: '#2cccd1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [53, 20, 10, 80, 100, 45],
          },
        ],
      },
      options: gradientBarChartConfiguration,
    });
  }
  public updateOptions(): void {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
}
