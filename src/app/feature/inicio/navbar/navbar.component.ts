import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { NavItems } from './nav-items';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';




interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterModule,
    CommonModule,
    MatToolbarModule, MatButtonModule, MatIconModule

  
    
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',

})
export class NavbarComponent implements NavItems ,OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed:boolean=false;
  screenWidth:number=0;
  items: {
    route: string;
    icon: string;
    label: string;
  }[];

  constructor() {
    this.items = [
      {
        route: '/home',
        icon: 'home',
        label: 'Inicio'
      },
      {
        route: '/login',
        icon: 'info',
        label: 'Acerca de'
      },
      {
        route: '/contact',
        icon: 'mail',
        label: 'Contacto'
      }
    
    ];
  }

@HostListener('window:resize',['$event']) //decorador que escucha un evento especifico del DOM este caso la medida de la pantalla
onResize(event:any){
  this.screenWidth=window.innerWidth;
  if(this.screenWidth <= 768){
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
  }
}// controla el tamaño del nav segun la pantalla

  ngOnInit(): void {
   this.screenWidth=window.innerWidth;
  }


  toggleCollapse(){
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
  }

  closeSidenav(){
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
  }


}
