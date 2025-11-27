import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('food');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Safe to use window here
      window.addEventListener('error', (e: ErrorEvent) => {
        console.log('Window error:', e.error);
      });

      window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
        console.log('Promise error:', e.reason);
      });
    }
  }
}
