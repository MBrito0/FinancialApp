import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  fullName: string = 'Nome do Usuário';
  email: string = 'usuario@exemplo.com';
  dateOfBirth: string = '1990-01-01'; // Formato YYYY-MM-DD
  gender: string = 'male'; // Valor padrão

  constructor() {}

  saveProfile() {
    // Lógica para salvar as alterações
    alert('Perfil atualizado com sucesso!');
  }
}
