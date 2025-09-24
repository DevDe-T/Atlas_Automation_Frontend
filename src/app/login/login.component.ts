// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   providers: [ AuthService], 
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService : AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/app']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      }
  });
  console.log("Hello");
  }
}
