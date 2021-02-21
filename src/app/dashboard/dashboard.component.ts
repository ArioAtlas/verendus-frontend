import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {
  VehicleService,
  Vehicle,
  VehicleUpdateLog,
  VehicleDiffResult,
} from '../services/vehicle.service';
import { NewVehicleByDay, ReportService } from '../services/report.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';

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
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  canvas: any;
  ctx: any;
  datasets: any;
  gradientStroke: any;
  data: any;
  myChartData: any;
  myChart: Chart | undefined;
  vehicles: Vehicle[] = [];
  updateLog: VehicleUpdateLog[] = [];
  updatedVehicle = 0;
  addedVehicle = 0;
  vehicleFile: File | undefined;
  totalNewVehicle = 0;

  vehicleFileForm = new FormGroup({
    reportFile: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(
    private vehicleService: VehicleService,
    private toast: ToastService,
    private reportService: ReportService
  ) {
    vehicleService.getAll().subscribe((data) => {
      this.vehicles.push(...data);
    });
  }

  onSubmit(): void {
    if (this.vehicleFileForm.get('fileSource')?.value) {
      const formData = new FormData();
      formData.append(
        'reportFile',
        this.vehicleFileForm.get('fileSource')?.value
      );

      this.updateLog = [];

      this.vehicleService.sendVehicleFile(formData).subscribe((res) => {
        console.log(res);
        this.addedVehicle = res.totalAdded;
        this.updatedVehicle = res.totalUpdated;
        this.updateLog.push(...res.vehicles);
        this.toast.success(
          `Vehicle file has been parsed successfully in ${res.processTime} ms`
        );
        this.updateReports();
      });
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.vehicleFileForm.patchValue({
        fileSource: file,
      });
    }
  }

  remainingDays(date: number): string {
    if (!date) {
      return 'Unkown';
    } else {
      const remYear: number = Math.floor(date / 10000);
      const remMonth: number = Math.floor((date % 10000) / 100);
      const remDays: number = date % 100;
      const then: Date = new Date(remYear + '-' + remMonth + '-' + remDays);
      const now: Date = new Date();
      return `${Math.floor(
        (then.getTime() - now.getTime()) / (1000 * 3600 * 24)
      )} Days`;
    }
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('chartLineRed');
    this.ctx = this.canvas.getContext('2d');

    this.gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    // green colors
    this.gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    this.gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)');
    this.gradientStroke.addColorStop(0, 'rgba(66,134,121,0)');

    this.updateReports();
  }

  updateReports(): void {
    this.reportService
      .newVehicleByDay(7)
      .subscribe((data: NewVehicleByDay[]) => {
        const labels: string[] = [];
        const values: number[] = [];

        for (const record of data) {
          labels.push(`${record._id.day} / ${record._id.month}`);
          values.push(record.count);
        }

        this.updateChart(labels, values);
        this.totalNewVehicle = values.reduce((a, b) => a + b, 0);
      });
  }

  updateChart(labels: string[], values: number[]): void {
    this.myChart?.clear();
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: ' New Vehicle',
            fill: true,
            backgroundColor: this.gradientStroke,
            hoverBackgroundColor: this.gradientStroke,
            borderColor: '#2cccd1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: values,
          },
        ],
      },
      options: gradientBarChartConfiguration,
    });
  }

  formatDate(date: number, divider: string): string {
    const day = (date % 100).toString().padStart(2, '0');
    const month = (Math.floor(date / 100) % 100).toString().padStart(2, '0');
    const year = Math.floor(date / 10000)
      .toString()
      .padStart(4, '0');

    if (year === '0000') {
      if (month === '00') {
        if (day === '00') {
          return '-';
        }
        return day;
      }
      return month + divider + day;
    }
    return year + divider + month + divider + day;
  }

  hasOldValue(key: string, diff: VehicleDiffResult[]): string {
    for (const iterator of diff) {
      if (iterator.name === key) {
        return iterator.oldValue;
      }

      if (iterator.sub.length) {
        const sub = this.hasOldValue(key, iterator.sub);
        if (sub.length) {
          return sub;
        }
      }
    }

    return '';
  }
}
