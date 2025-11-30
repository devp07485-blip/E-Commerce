import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  step = 1;
  email = '';
  password = '';
  username = '';
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient) { }

  nextStep() {
    this.step++;
  }

  previousStep() {
    if (this.step > 1) this.step--;
  }

  submit() {
    if (!this.email || !this.password || !this.username) {
      this.errorMessage = 'All fields are required';
      return;
    }

    // 1) CREATE ACCOUNT
    this.http.post('http://localhost:5000/api/signup', {
      email: this.email,
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        // 2) AUTO-LOGIN AFTER SIGNUP
        this.http.post<any>('http://localhost:5000/api/login', {
          username: this.username,
          password: this.password
        }).subscribe({
          next: () => this.router.navigate(['/home']),
          error: (err) => {
            this.errorMessage = 'Signup success but login failed: ' + (err.error?.message || 'Server error');
          }
        });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Signup failed, try again';
      }
    });
  }
}
