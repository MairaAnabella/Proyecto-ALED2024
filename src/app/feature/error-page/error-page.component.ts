import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  animations: [
    trigger('waveAnimation', [
      state('start', style({
        transform: 'translateX(0)'
      })),
      state('end', style({
        transform: 'translateX(-1440px)'
      })),
      transition('start => end', animate('15s linear')),
      transition('end => start', animate('0s'))
    ])
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  waveState: 'start' | 'end' = 'start';

  constructor(private router: Router) {}

  ngOnInit() {
    this.animateWave();
  }

  // Animate the wave continuously
  animateWave() {
    setInterval(() => {
      this.waveState = 'end';
      setTimeout(() => {
        this.waveState = 'start';
      }, 100);
    }, 15000);
  }

  // Navigate to the home page
  goToHomePage() {
    this.router.navigate(['/']);
  }
}
