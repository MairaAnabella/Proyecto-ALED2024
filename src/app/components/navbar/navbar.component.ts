import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { NavItems } from '../../nav-items';
import { RouterModule } from '@angular/router';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { animate, keyframes, style, transition, trigger } from '@angular/animations';


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
    
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations:[
    trigger('fadeInOut',[
      transition(':enter',[
        style({opacity:0}),
        animate('350ms',
          style({opacity:1})
        )
      ])
    ]),
    transition(':leave',[
      style({opacity:1}),
      animate('350ms', 
        style({opacity:0})
      )
    ]),

    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
          keyframes([
            style({transform:'rotate(0deg)',offset:'0'}),
            style({transform:'rotate(2turn)',offset:'1'})
          ])
        )
      ])
    ])
  ]
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
        route: '/login',
        icon: '<i class="material-icons sidenav-link-icon">home</i>',
        label: 'Inicio'
      },
      {
        route: '/component',
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
