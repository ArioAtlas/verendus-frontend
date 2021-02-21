import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'icon-chart-pie-36',
    class: '',
  },
  {
    path: '/api-docs',
    title: 'API Docs',
    icon: 'icon-settings-gear-63',
    class: '',
  },
  {
    path: '/docs',
    title: 'Documents',
    icon: 'icon-single-copy-04',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  constructor() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  ngOnInit(): void {}
}
