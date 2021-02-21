import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  info(message: string, vPos = 'top', hPos = 'right'): void {
    this.toastr.info(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>${message}`,
      '',
      {
        disableTimeOut: false,
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-info alert-with-icon',
        positionClass: 'toast-' + vPos + '-' + hPos,
      }
    );
  }
  success(message: string, vPos = 'top', hPos = 'right'): void {
    this.toastr.success(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>${message}`,
      '',
      {
        disableTimeOut: false,
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-success alert-with-icon',
        positionClass: 'toast-' + vPos + '-' + hPos,
      }
    );
  }
  warning(message: string, vPos = 'top', hPos = 'right'): void {
    this.toastr.warning(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>${message}`,
      '',
      {
        disableTimeOut: false,
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-warning alert-with-icon',
        positionClass: 'toast-' + vPos + '-' + hPos,
      }
    );
  }
  error(message: string, vPos = 'top', hPos = 'right'): void {
    this.toastr.error(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>${message}`,
      '',
      {
        disableTimeOut: false,
        timeOut: 3000,
        enableHtml: true,
        closeButton: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-' + vPos + '-' + hPos,
      }
    );
  }
  deafualt(message: string, vPos = 'top', hPos = 'right'): void {
    this.toastr.show(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>${message}`,
      '',
      {
        disableTimeOut: false,
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
        positionClass: 'toast-' + vPos + '-' + hPos,
      }
    );
  }
}
