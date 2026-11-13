
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFinance } from '../hooks/useFinance'

function Transactions() {
  const { transactions, addTransaction, deleteTransaction } = useFinance()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const formatMoney = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim() || Number(amount) <= 0) {
      alert('Please enter a title and a valid amount.')
      return
    }

    addTransaction({
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    })

    setTitle('')
    setAmount('')
    setType('expense')
    setCategory('Food')
    setDate(new Date().toISOString().split('T')[0])
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Transactions</h1>
          <p>Track and manage your income and expenses.</p>
        </div>
      </div>

      <section className="content-card transaction-form-card">
        <h2>Add Transaction</h2>

        <form onSubmit={handleSubmit} className="transaction-form">
          <label>
            Description
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: Grocery shopping"
              required
            />
          </label>

          <label>
            Amount ($)
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              required
            />
          </label>

          <label>
            Type
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>

          <label>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Food</option>
              <option>Housing</option>
              <option>Transportation</option>
              <option>Utilities</option>
              <option>Entertainment</option>
              <option>Shopping</option>
              <option>Income</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="add-button">
            Add Transaction
          </button>
        </form>
      </section>

      <section className="content-card transaction-list-card">
        <h2>Transaction History</h2>

        {transactions.length === 0 ? (
          <p>No transactions yet. Add your first transaction above.</p>
        ) : (
          <div className="transaction-table">
            {transactions.map((transaction) => (
              <div className="transaction-entry" key={transaction.id}>
                <div>
                  <Link
                    to={`/transactions/${transaction.id}`}
                    className="transaction-title"
                  >
                    {transaction.title}
                  </Link>
                  <p>
                    {transaction.category} · {transaction.date}
                  </p>
                </div>

                <div className="transaction-actions">
                  <strong
                    className={
                      transaction.type === 'income'
                        ? 'income-text'
                        : 'expense-text'
                    }
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatMoney(transaction.amount)}
                  </strong>

                  <button
                    className="delete-button"
                    onClick={() => deleteTransaction(transaction.id)}
                    aria-label={`Delete ${transaction.title}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Transactions
