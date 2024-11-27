import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  fullName: string = '';
  dateOfBirth: string = '';
  gender: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  termsAccepted: boolean = false;
  loading: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastController: ToastController,
    private router: Router
  ) {}

  async onRegister() {
    // Validações adicionais para senha
    const passwordRegex = /^[a-zA-Z0-9]{1,6}$/;
    if (!passwordRegex.test(this.password)) {
      const toast = await this.toastController.create({
        message: 'A senha deve ter até 6 caracteres e conter apenas letras e números.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    // Validação para confirmar senha
    if (this.password !== this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'As senhas não coincidem!',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    // Validação para aceitar os termos e condições
    if (!this.termsAccepted) {
      const toast = await this.toastController.create({
        message: 'Você precisa aceitar os termos e condições.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    this.loading = true;

    try {
      // Criar usuário com Firebase Auth
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      // Obter o UID do usuário
      const user = userCredential.user;
      if (user) {
        // Salvar informações adicionais no Firestore
        await this.firestore.collection('users').doc(user.uid).set({
          fullName: this.fullName,
          dateOfBirth: this.dateOfBirth,
          gender: this.gender,
          email: this.email,
          createdAt: new Date(),
        });

        const toast = await this.toastController.create({
          message: 'Cadastro realizado com sucesso!',
          duration: 2000,
          color: 'success',
        });
        toast.present();

        // Redirecionar para a página de login
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      let errorMessage = 'Erro ao criar a conta. Tente novamente mais tarde.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este e-mail já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'O e-mail fornecido é inválido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha precisa atender aos critérios estabelecidos.';
      }

      const toast = await this.toastController.create({
        message: errorMessage,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    } finally {
      this.loading = false;
    }
  }
}
