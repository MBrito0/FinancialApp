import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  fullName: string = '';
  email: string = '';
  dateOfBirth: string = '';
  gender: string = '';
  userId: string | null = null;
  loading: boolean = true; // Indica se os dados estão sendo carregados

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid; // Pega o ID do usuário autenticado
        this.loadProfile(); // Carrega os dados do Firestore
      } else {
        this.loading = false; // Desativa o spinner caso o usuário não esteja autenticado
        this.showToast('Usuário não autenticado. Faça login novamente.');
      }
    });
  }

  // Carregar dados do perfil do Firestore
  loadProfile() {
    if (!this.userId) return;

    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe(
        (profile: any) => {
          this.loading = false; // Dados carregados, desativa o spinner
          if (profile) {
            this.fullName = profile.fullName || '';
            this.email = profile.email || '';
            this.dateOfBirth = profile.dateOfBirth || '';
            this.gender = profile.gender || '';
          }
        },
        (error) => {
          this.loading = false; // Mesmo em caso de erro, desativa o spinner
          console.error('Erro ao carregar perfil:', error);
          this.showToast('Erro ao carregar os dados do perfil.');
        }
      );
  }

  // Validação de e-mail
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Salvar alterações no Firestore
  saveProfile() {
    if (!this.userId) {
      this.showToast('Usuário não autenticado.');
      return;
    }

    if (!this.fullName || !this.email || !this.dateOfBirth || !this.gender) {
      this.showToast('Por favor, preencha todos os campos.');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showToast('Por favor, insira um e-mail válido.');
      return;
    }

    const profileData = {
      fullName: this.fullName,
      email: this.email,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
    };

    this.firestore
      .collection('users')
      .doc(this.userId)
      .set(profileData, { merge: true }) // Atualiza ou cria o documento
      .then(() => {
        this.showToast('Perfil atualizado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao salvar perfil:', error);
        this.showToast('Erro ao atualizar perfil.');
      });
  }

  // Exibir mensagem de feedback
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
