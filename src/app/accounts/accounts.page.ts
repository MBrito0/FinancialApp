import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  searchQuery: string = '';
  accounts = [
    { name: 'Conta Corrente', balance: 10000 },
    { name: 'Poupança', balance: 5000 },
    { name: 'Cartão de Crédito', balance: -3000 },
  ];
  recentTransactions = [
    { description: 'Pagamento de Conta de Luz', amount: -200 },
    { description: 'Recebimento Salário', amount: 3000 },
  ];

  constructor() { }

  ngOnInit() {
    // Inicialização, como buscar dados de contas
  }

  // Método para filtrar contas baseado no searchQuery
  filterAccounts() {
    return this.accounts.filter(account =>
      account.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
