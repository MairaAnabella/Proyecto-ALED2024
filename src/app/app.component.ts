import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";


interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent],
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
