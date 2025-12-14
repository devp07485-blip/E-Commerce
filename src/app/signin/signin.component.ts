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
  dropdownValue = '';
  phone = '';
  errorMessage = '';

  phonePlaceholder = 'Enter your phone number';
  phonePattern = '[0-9]{10}';

  countryFormats: { [key: string]: { placeholder: string, pattern: string } } = {
    '+91': { placeholder: '12345-67890', pattern: '[0-9]{10}' },
    '+1': { placeholder: '123-456-7890', pattern: '[0-9]{10}' },
    '+44': { placeholder: '12345 678901', pattern: '[0-9]{11}' }
  };

  onCountryChange() {
    const format = this.countryFormats[this.dropdownValue];
    if (format) {
      this.phonePlaceholder = format.placeholder;
      this.phonePattern = format.pattern;
    } else {
      this.phonePlaceholder = 'Enter your phone number';
      this.phonePattern = '[0-9]{10}';
    }
  }

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
    this.http.post('/api/signup', {
      email: this.email,
      username: this.username,
      password: this.password,
      phone: this.dropdownValue + this.phone
    }).subscribe({
      next: () => {
        // Redirect to Login Page as requested
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Signup failed, try again';
      }
    });
  }
}
