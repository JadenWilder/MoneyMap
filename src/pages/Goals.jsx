
import { useState } from 'react'
import { useFinance } from '../hooks/useFinance'

function Goals() {
  const { goals, addGoal, setGoals } = useFinance()

  const [name, setName] = useState('')
  const [target, setTarget] = useState('')
  const [saved, setSaved] = useState('')

  const formatMoney = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !name.trim() ||
      Number(target) <= 0 ||
      Number(saved) < 0 ||
      Number(saved) > Number(target)
    ) {
      alert('Please enter valid savings goal information.')
      return
    }

    addGoal({
      name: name.trim(),
      target: Number(target),
      saved: Number(saved),
    })

    setName('')
    setTarget('')
    setSaved('')
  }

  function addSavings(id) {
    const amount = Number(
      prompt('How much would you like to add to this goal?')
    )

    if (!Number.isFinite(amount) || amount <= 0) return

    setGoals((current) =>
      current.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              saved: Math.min(goal.saved + amount, goal.target),
            }
          : goal
      )
    )
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Savings Goals</h1>
          <p>Set goals and watch your savings grow.</p>
        </div>
      </div>

      <section className="content-card goal-form-card">
        <h2>Create a Savings Goal</h2>

        <form className="goal-form" onSubmit={handleSubmit}>
          <label>
            Goal Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: New Car"
              required
            />
          </label>

          <label>
            Target Amount ($)
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              placeholder="5000"
              required
            />
          </label>

          <label>
            Already Saved ($)
            <input
              type="number"
              min="0"
              step="0.01"
              value={saved}
              onChange={(event) => setSaved(event.target.value)}
              placeholder="0"
              required
            />
          </label>

          <button className="add-button" type="submit">
            Create Goal
          </button>
        </form>
      </section>

      <div className="goal-grid">
        {goals.map((goal) => {
          const percentage = Math.min(
            (goal.saved / goal.target) * 100,
            100
          )

          return (
            <section className="content-card goal-card" key={goal.id}>
              <h2>{goal.name}</h2>

              <div className="goal-percentage">
                {percentage.toFixed(1)}%
              </div>

              <div className="budget-track">
                <div
                  className="budget-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p>
                {formatMoney(goal.saved)} saved of{' '}
                {formatMoney(goal.target)}
              </p>

              <p>
                {formatMoney(Math.max(goal.target - goal.saved, 0))} left
                to reach your goal
              </p>

              <button
                className="edit-button"
                onClick={() => addSavings(goal.id)}
                disabled={goal.saved >= goal.target}
              >
                {goal.saved >= goal.target ? 'Goal Completed' : 'Add Savings'}
              </button>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default Goals
