import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransaction {
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
    let inc = 0;
    let out = 0;
    this.transactions.forEach(transact => {
      if (transact.type === 'income') {
        inc += transact.value;
      } else {
        out += transact.value;
      }
    });
    const ac = inc - out;
    return {
      income: inc,
      outcome: out,
      total: ac,
    };
  }

  public create({ value, type, title }: CreateTransaction): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
