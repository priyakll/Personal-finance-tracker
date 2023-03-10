import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import Transaction from './components/Transaction';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const res = await axios.get('/api/transactions');
      setTransactions(res.data);
    }

    fetchTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    const res = await axios.post('/api/transactions', transaction);
    setTransactions([...transactions, res.data]);
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`/api/transactions/${id}`);
    setTransactions(transactions.filter((transaction) => transaction._id !== id));
  };

  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="container">
      <h1>Personal Finance Tracker</h1>
      <Balance balance={balance} />
      <IncomeExpense income={income} expense={expense} />
      <Transaction transactions={transactions} deleteTransaction={deleteTransaction} />
      <AddTransaction addTransaction={addTransaction} />
    </div>
  );
}

export default App;
