import React from 'react';
import Transaction from './Transaction';

function TransactionList({ transactions, deleteTransaction }) {
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} deleteTransaction={deleteTransaction} />
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
