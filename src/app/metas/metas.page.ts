import { Component } from '@angular/core';

@Component({
  selector: 'app-metas',
  templateUrl: 'metas.page.html',
  styleUrls: ['metas.page.scss'],
})
export class MetasPage {
  metas: { nome: string; valor: number; prazo: string }[] = [
    { nome: 'Economizar para Emergência', valor: 1000, prazo: 'mensal' },
    { nome: 'Investir em Fundo Imobiliário', valor: 500, prazo: 'semanal' },
  ];

  novaMeta: { nome: string; valor: number | null; prazo: string } = {
    nome: '',
    valor: null,
    prazo: '',
  };

  adicionarMeta() {
    if (this.novaMeta.nome && this.novaMeta.valor !== null && this.novaMeta.prazo) {
      this.metas.push({
        nome: this.novaMeta.nome,
        valor: this.novaMeta.valor || 0, // Use um valor padrão caso necessário
        prazo: this.novaMeta.prazo,
      });
      this.novaMeta = { nome: '', valor: null, prazo: '' }; // Limpar o formulário
    } else {
      alert('Preencha todos os campos antes de salvar a meta.');
    }
  }


  removerMeta(meta: { nome: string; valor: number; prazo: string }) {
    this.metas = this.metas.filter((m) => m !== meta);
  }
}
