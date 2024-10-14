import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  fullName: string ='';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  dateOfBirth: string = '';
  gender: string = '';
  termsAccepted: boolean = false ;

  constructor() {}

  onRegister() {
    // Lógica para registrar o usuário
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    
    // Enviar dados para o backend ou outro processo
    alert('Cadastro realizado com sucesso!');
  }
}
