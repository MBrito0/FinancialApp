import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private afAuth: AngularFireAuth, // Serviço de autenticação Firebase
    private router: Router, // Navegação
    private toastController: ToastController // Mensagens ao usuário
  ) {}

  // Método para logout
  async logout() {
    try {
      // Realiza o logout do Firebase
      await this.afAuth.signOut();

      // Exibe mensagem de sucesso
      const toast = await this.toastController.create({
        message: 'Você saiu com sucesso.',
        duration: 2000,
        color: 'success',
        position: 'top',
      });
      await toast.present();

      // Redireciona para a tela de login
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      // Exibe mensagem de erro em caso de falha
      const toast = await this.toastController.create({
        message: 'Erro ao sair. Tente novamente.',
        duration: 2000,
        color: 'danger',
        position: 'top',
      });
      await toast.present();
    }
  }


}
