import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;
  errorMsg = '';

  constructor(private http: HttpClient) { }

  login() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Email and Password are required';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    const body = {
      email: this.email,
      password: this.password
    };

    this.http.post('/api/login', body)
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          // Save user info
          localStorage.setItem('email', res.email);
          localStorage.setItem('username', res.username);

          // Redirect
          window.location.href = '/dashboard';
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err.error?.message || 'Invalid Credentials';
        }
      });
  }
}