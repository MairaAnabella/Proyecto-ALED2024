import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],

  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  waveState: 'start' | 'end' = 'start';

  constructor(private router: Router) {}

  ngOnInit() {
   
  }



  // Navigate to the home page
  goToHomePage() {
    this.router.navigate(['/home']);
  }
}
