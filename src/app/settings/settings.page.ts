import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  notificationsEnabled: boolean = true; // Valor padrão
  darkModeEnabled: boolean = false; // Valor padrão
  selectedLanguage: string = 'pt'; // Valor padrão

  constructor() {}

  saveSettings() {
    // Lógica para salvar configurações
    alert('Configurações salvas com sucesso!');
  }

  clearCache() {
    // Lógica para limpar cache
    alert('Cache limpo com sucesso!');
  }

  showAbout() {
    // Lógica para exibir informações sobre o aplicativo
    alert('Este aplicativo foi desenvolvido para fins educacionais.');
  }
}
