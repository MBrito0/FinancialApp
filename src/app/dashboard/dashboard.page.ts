import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

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
    // Inicializa o gráfico e outras funcionalidades
    this.createAnnualComparisonChart();
  }

  // Função para criar o gráfico de comparação anual
  createAnnualComparisonChart() {
    const ctx = document.getElementById('annualComparisonChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Receitas',
            data: [4500, 4200, 4700, 4900, 5100, 5200, 5300, 5400, 5600, 5700, 5900, 6100],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Despesas',
            data: [2000, 2100, 1800, 1900, 2200, 2300, 2500, 2400, 2600, 2700, 2900, 3100],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Funções para adicionar transações, definir metas e criar orçamento
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
