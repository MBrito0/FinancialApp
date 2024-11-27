import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, IonicModule } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule], // Importando módulos necessários
})
export class LoginPage {
  email: string = '';
  password: string = '';
  loginAttempts: number = 0; // Contador de tentativas
  loading: boolean = false; // Controle de loading

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController
  ) {}

  // Método para realizar login
  async onLogin() {
    // Verifica campos obrigatórios
    if (!this.email || !this.password) {
      this.showToast('Por favor, preencha todos os campos.', 'warning');
      return;
    }

    // Limita o número de tentativas
    if (this.loginAttempts >= 3) {
      this.showToast(
        'Você excedeu o número de tentativas. Aguarde ou recupere sua senha.',
        'danger'
      );
      setTimeout(() => {
        this.router.navigate(['/reset-password']); // Redireciona para recuperação de senha após 5 segundos
      }, 5000);
      return;
    }

    this.loading = true; // Ativa o spinner de carregamento

    try {
      // Realiza login com Firebase Authentication
      const userCredential = await this.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );

      if (userCredential) {
        this.showToast('Login realizado com sucesso!', 'success');
        this.loginAttempts = 0; // Reseta o contador de tentativas
        this.router.navigate(['/home']); // Redireciona para a página inicial
      }
    } catch (error: any) {
      this.loginAttempts++; // Incrementa o contador em caso de erro
      const errorMessage = this.getErrorMessage(error.code);
      this.showToast(errorMessage, 'danger');
    } finally {
      this.loading = false; // Desativa o spinner de carregamento
    }
  }

  // Método para exibir mensagens de erro baseadas no código de erro
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado.';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/invalid-email':
        return 'E-mail inválido.';
      default:
        return 'Erro ao fazer login. Verifique suas credenciais.';
    }
  }

  // Método para exibir um Toast com mensagem
  private async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top',
    });
    await toast.present();
  }
}
