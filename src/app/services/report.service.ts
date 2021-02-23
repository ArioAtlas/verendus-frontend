import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  newVehicleByDay(days: number): Observable<NewVehicleByDay[]> {
    return this.http.get<NewVehicleByDay[]>(
      environment.apiUrl + '/report/new/in-days/' + days
    );
  }

  getChassisByInspectionDates(): Observable<ChassisByInspectionDate[]> {
    return this.http.get<ChassisByInspectionDate[]>(environment.apiUrl + '/report');
  }
}

export interface NewVehicleByDay {
  _id: NewVehicleByDayID;
  count: number;
}

export interface NewVehicleByDayID {
  day: number;
  month: number;
}

export interface ChassisByInspectionDate {
  chassisNumber: string;
  inspection: Inspection;
}

export interface Inspection {
  latestInspectionDate: number;
  nextInspectionDate: number;
}
