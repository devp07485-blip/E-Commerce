import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Enter username and password';
      return;
    }

    this.http.post<any>('http://localhost:5000/api/login', {
      username: this.username.trim(),
      password: this.password.trim()
    })
      .subscribe({
        next: () => {
          this.errorMessage = '';
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Login failed';
        }
      });
  }
}
