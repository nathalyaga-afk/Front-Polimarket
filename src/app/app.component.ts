import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <ng-container *ngIf="!hideNavbar">
      <app-navbar></app-navbar>
    </ng-container>

    <main class="p-3">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  hideNavbar = false;

  constructor(private router: Router) {
    // Oculta navbar en rutas de auth 
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url.split('?')[0];
        this.hideNavbar = url.startsWith('/auth');
      });
  }
}
