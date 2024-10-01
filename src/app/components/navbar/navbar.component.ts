import { Component } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { NavItems } from '../../nav-items';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterModule
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements NavItems{
  items: {
    route: string;
    icon: string;
    label: string;
  }[];

  constructor() {
    this.items = [
      {
        route: '/home',
        icon: '<i class="material-icons sidenav-link-icon">home</i>',
        label: 'Inicio'
      },
      {
        route: '/about',
        icon: '<i class="material-icons sidenav-link-icon">info</i>',
        label: 'Acerca de'
      },
      {
        route: '/contact',
        icon: '<i class="material-icons sidenav-link-icon">mail</i>',
        label: 'Contacto'
      }
    
    ];
  }
  collapsed:boolean=true;


}
