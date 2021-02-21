import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(environment.apiUrl + '/vehicle');
  }

  sendVehicleFile(formData: any): Observable<VehicleFileParseResult> {
    return this.http.post<VehicleFileParseResult>(
      environment.apiUrl + '/vehicle',
      formData
    );
  }
}

export interface Vehicle {
  identity: string;
  chassisNumber: string;
  modelYear: number;
  typeApprovalNo: number;
  privatelyImported: boolean;
  color: string;
  registration: Registration;
  inspection: Inspection;
}

export interface Registration {
  firstRegistration: number;
  latestRegistration: number;
  monthlyRegistration: number;
  dateOfDeregistration: number;
}

export interface Inspection {
  latestInspectionDate: number;
  nextInspectionDate: number;
}

export interface VehicleUpdateLog {
  data: Vehicle;
  isNew: boolean;
  diff: VehicleDiffResult[];
}
export interface VehicleFileParseResult {
  vehicles: VehicleUpdateLog[];
  totalAdded: number;
  totalUpdated: number;
  errors: VehicleFileParseError[];
  processTime: number;
}

export interface VehicleDiffResult {
  name: string;
  oldValue: any;
  sub: VehicleDiffResult[];
}

export interface VehicleFileParseError {
  line: number;
  text: string;
}
