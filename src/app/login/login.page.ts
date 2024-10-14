import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // Simulação de autenticação, aqui você colocaria a lógica de autenticação real.
    if (this.email === 'admin@admin.com' && this.password === '123456') {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciais incorretas.');
    }
  }
}