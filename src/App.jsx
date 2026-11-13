
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budgets'
import Goals from './pages/Goals'
import { useFinance } from './hooks/useFinance'

import './App.css'

function TransactionDetails() {
  const { transactionId } = useParams()
  const { transactions } = useFinance()

  const transaction = transactions.find(
    (item) => item.id === transactionId
  )

  const formatMoney = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(amount))

  if (!transaction) {
    return (
      <div className="page">
        <h1>Transaction Not Found</h1>
        <p>This transaction does not exist or may have been deleted.</p>
        <Link to="/transactions">Back to Transactions</Link>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Transaction Details</h1>
          <p>View the information for this transaction.</p>
        </div>
      </div>

      <section className="content-card">
        <h2>{transaction.title}</h2>

        <div className="transaction-detail-row">
          <strong>Amount</strong>
          <span
            className={
              transaction.type === 'income'
                ? 'income-text'
                : 'expense-text'
            }
          >
            {transaction.type === 'income' ? '+' : '-'}
            {formatMoney(transaction.amount)}
          </span>
        </div>

        <div className="transaction-detail-row">
          <strong>Category</strong>
          <span>{transaction.category}</span>
        </div>

        <div className="transaction-detail-row">
          <strong>Type</strong>
          <span>{transaction.type}</span>
        </div>

        <div className="transaction-detail-row">
          <strong>Date</strong>
          <span>{transaction.date}</span>
        </div>

        <Link to="/transactions" className="back-link">
          Back to Transactions
        </Link>
      </section>
    </div>
  )
}

function NotFound() {
  return (
    <div className="page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Return to Dashboard</Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route
              path="/transactions/:transactionId"
              element={<TransactionDetails />}
            />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
