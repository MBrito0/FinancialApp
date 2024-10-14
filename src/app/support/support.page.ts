import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage {

  constructor() {}

  openFAQ() {
    // Lógica para abrir a página de FAQs
    alert('Abrindo a FAQ...');
  }

  sendEmail() {
    const email = 'suporte@exemplo.com';
    const subject = 'Suporte';
    const body = 'Por favor, descreva seu problema...';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  }

  openChat() {
    // Lógica para iniciar um chat
    alert('Iniciando o chat com o suporte...');
  }

  openSocialMedia() {
    // Lógica para abrir redes sociais
    alert('Abrindo redes sociais...');
  }
}
