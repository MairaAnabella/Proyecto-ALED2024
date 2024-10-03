import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
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
