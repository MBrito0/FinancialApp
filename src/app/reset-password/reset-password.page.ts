import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';  // Importe o tipo FirebaseError

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = ''; // Armazena o e-mail do usuário
  loading: boolean = false; // Indicador de carregamento para o botão

  constructor(
    private afAuth: AngularFireAuth, // Serviço de autenticação do Firebase
    private toastController: ToastController, // Para mostrar mensagens de feedback
    private router: Router // Para navegação entre páginas
  ) {}

  // Função para enviar o link de recuperação de senha
  async onSubmit() {
    if (this.email.trim() === '') {
      const toast = await this.toastController.create({
        message: 'Por favor, insira seu e-mail.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    this.loading = true; // Ativa o carregamento
    try {
      // Envia o link de recuperação de senha
      await this.afAuth.sendPasswordResetEmail(this.email);
      const toast = await this.toastController.create({
        message: 'Link de recuperação enviado para seu e-mail.',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.router.navigate(['/login']); // Redireciona para a tela de login após sucesso
    } catch (error) {
      // Verifique se o erro é do tipo FirebaseError
      if ((error as FirebaseError).code) {
        const firebaseError = error as FirebaseError;
        let errorMessage = 'Erro ao enviar o link. Tente novamente mais tarde.';

        // Verifica o tipo de erro e ajusta a mensagem de erro
        if (firebaseError.code === 'auth/invalid-email') {
          errorMessage = 'E-mail inválido. Por favor, verifique o e-mail.';
        } else if (firebaseError.code === 'auth/user-not-found') {
          errorMessage = 'Nenhum usuário encontrado com este e-mail.';
        }

        const toast = await this.toastController.create({
          message: errorMessage,
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      } else {
        // Caso o erro não seja do Firebase, mostra uma mensagem genérica
        const toast = await this.toastController.create({
          message: 'Ocorreu um erro desconhecido.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    } finally {
      this.loading = false; // Desativa o carregamento
    }
  }
}
