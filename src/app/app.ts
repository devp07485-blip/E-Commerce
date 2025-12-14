import { Component, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('food');
  username = signal('');

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('error', (e: ErrorEvent) => {
        console.log('Window error:', e.error);
      });

      window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
        console.log('Promise error:', e.reason);
      });
    }
  }

  hideNavbar = computed(() => {
    const url = this.router.url;
    return url.includes('login') || url.includes('signup');
  });
}
