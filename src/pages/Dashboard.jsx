
import { useFinance } from '../hooks/useFinance'
import CurrencyConverter from '../components/CurrencyConverter'

function Dashboard() {
  const { transactions, budgets, goals } = useFinance()

  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + Number(item.amount), 0)

  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + Number(item.amount), 0)

  const balance = income - expenses

  const savings = goals.reduce(
    (total, goal) => total + Number(goal.saved),
    0
  )

  const formatMoney = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your financial overview.</p>
        </div>

        <span className="date-label">Personal Finance</span>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <p>Total Balance</p>
          <h2>{formatMoney(balance)}</h2>
          <span>Income minus expenses</span>
        </div>

        <div className="summary-card">
          <p>Total Income</p>
          <h2>{formatMoney(income)}</h2>
          <span>Recorded income</span>
        </div>

        <div className="summary-card">
          <p>Total Expenses</p>
          <h2>{formatMoney(expenses)}</h2>
          <span>Recorded expenses</span>
        </div>

        <div className="summary-card">
          <p>Savings Goals</p>
          <h2>{formatMoney(savings)}</h2>
          <span>Total saved toward goals</span>
        </div>
      </div>

      <div className="dashboard-bottom">
        <section className="content-card">
          <h2>Recent Transactions</h2>

          {transactions.slice(0, 4).map((transaction) => (
            <div key={transaction.id} className="transaction-row">
              <div>
                <strong>{transaction.title}</strong>
                <p>{transaction.category}</p>
              </div>

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
            </div>
          ))}
        </section>

        <section className="content-card">
          <h2>Budget Overview</h2>

          {budgets.map((budget) => {
            const percentage = Math.min(
              (budget.spent / budget.limit) * 100,
              100
            )

            return (
              <div key={budget.id} className="budget-item">
                <div className="budget-heading">
                  <strong>{budget.category}</strong>
                  <span>
                    {formatMoney(budget.spent)} / {formatMoney(budget.limit)}
                  </span>
                </div>

                <div className="budget-track">
                  <div
                    className="budget-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </section>
      </div>

      <CurrencyConverter />
    </div>
  )
}

export default Dashboard
