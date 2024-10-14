import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  recentTransactions = [
    { description: 'Compra em Supermercado', amount: -50 },
    { description: 'Salário Recebido', amount: 2000 },
    { description: 'Pagamento de Conta', amount: -100 },
  ];

  monthlyIncome = 1500;
  monthlyExpenses = 800;

  constructor() { }

  ngOnInit() {
    // Aqui você pode inicializar gráficos ou buscar dados de uma API
  }

  addTransaction() {
    // Lógica para adicionar uma nova transação
  }

  setGoals() {
    // Lógica para definir novas metas financeiras
  }

  createBudget() {
    // Lógica para criar um novo orçamento
  }
}
