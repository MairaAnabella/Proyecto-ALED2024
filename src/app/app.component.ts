import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './feature/inicio/navbar/navbar.component';
import { HomeComponent } from './feature/inicio/home/home.component';

import { BodyComponent } from './feature/inicio/body/body.component';



interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'gestion-educativa';

    isSidenavCollapsed=false;
    screenWidth=0;
  onTogleSideNav(data:SideNavToggle){
    this.screenWidth=data.screenWidth;
    this.isSidenavCollapsed=data.collapsed;
    


  }
}
