import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = this.transactions.reduce(
      (acc: Balance, value: Transaction) => {
        if (value.type === 'income') acc.income += value.value;
        else acc.outcome += value.value;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, value, type }: CreateTransactionData): Transaction {
    const newTransaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
