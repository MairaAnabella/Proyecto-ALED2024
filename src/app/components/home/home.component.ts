import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { style } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    RouterOutlet
  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() collapsed=false;
  @Input() screenWidth=0;


getBodyClass(){
  let styleClass='';
  if (this.collapsed && this.screenWidth > 768){
    styleClass='body-trimmed';

  }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
    styleClass='body-md-screen';
  }
  return styleClass;
}



}
