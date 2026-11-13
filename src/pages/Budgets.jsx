
import { useState } from 'react'
import { useFinance } from '../hooks/useFinance'

function Budgets() {
  const { budgets, setBudgets } = useFinance()
  const [editingId, setEditingId] = useState(null)
  const [newLimit, setNewLimit] = useState('')

  const formatMoney = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)

  function saveBudget(id) {
    if (Number(newLimit) <= 0) {
      alert('Please enter a valid budget amount.')
      return
    }

    setBudgets((current) =>
      current.map((budget) =>
        budget.id === id
          ? { ...budget, limit: Number(newLimit) }
          : budget
      )
    )

    setEditingId(null)
    setNewLimit('')
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Budgets</h1>
          <p>Monitor your spending and manage your budget limits.</p>
        </div>
      </div>

      <div className="budget-grid">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100
          const remaining = budget.limit - budget.spent

          return (
            <section className="content-card budget-card" key={budget.id}>
              <h2>{budget.category}</h2>

              <div className="budget-heading">
                <strong>{formatMoney(budget.spent)}</strong>
                <span>of {formatMoney(budget.limit)}</span>
              </div>

              <div className="budget-track">
                <div
                  className="budget-fill"
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    background: percentage >= 100 ? '#e05252' : '#20c997',
                  }}
                />
              </div>

              <p>
                {remaining >= 0
                  ? `${formatMoney(remaining)} remaining`
                  : `${formatMoney(Math.abs(remaining))} over budget`}
              </p>

              {editingId === budget.id ? (
                <div className="budget-edit">
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={newLimit}
                    onChange={(event) => setNewLimit(event.target.value)}
                    placeholder="New budget limit"
                  />

                  <button onClick={() => saveBudget(budget.id)}>
                    Save
                  </button>

                  <button onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingId(budget.id)
                    setNewLimit(String(budget.limit))
                  }}
                >
                  Edit Budget
                </button>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default Budgets
