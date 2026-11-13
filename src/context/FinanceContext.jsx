
import { useState } from 'react'
import { FinanceContext } from './FinanceContext'

const initialTransactions = [
  {
    id: '1',
    title: 'Monthly Salary',
    category: 'Income',
    amount: 5200,
    type: 'income',
    date: '2026-11-01',
  },
  {
    id: '2',
    title: 'Rent Payment',
    category: 'Housing',
    amount: 1200,
    type: 'expense',
    date: '2026-11-03',
  },
  {
    id: '3',
    title: 'Groceries',
    category: 'Food',
    amount: 250,
    type: 'expense',
    date: '2026-11-05',
  },
  {
    id: '4',
    title: 'Electric Bill',
    category: 'Utilities',
    amount: 150,
    type: 'expense',
    date: '2026-11-07',
  },
]

const initialBudgets = [
  { id: '1', category: 'Food', limit: 500, spent: 250 },
  { id: '2', category: 'Housing', limit: 1400, spent: 1200 },
  { id: '3', category: 'Transportation', limit: 300, spent: 100 },
]

const initialGoals = [
  { id: '1', name: 'New Laptop', target: 1500, saved: 600 },
  { id: '2', name: 'Emergency Fund', target: 5000, saved: 1800 },
]

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [budgets, setBudgets] = useState(initialBudgets)
  const [goals, setGoals] = useState(initialGoals)

  const addTransaction = (transaction) => {
    setTransactions((current) => [
      {
        ...transaction,
        id: crypto.randomUUID(),
      },
      ...current,
    ])
  }

  const deleteTransaction = (id) => {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id)
    )
  }

  const addGoal = (goal) => {
    setGoals((current) => [
      ...current,
      {
        ...goal,
        id: crypto.randomUUID(),
      },
    ])
  }

  const value = {
    transactions,
    budgets,
    goals,
    setBudgets,
    setGoals,
    addTransaction,
    deleteTransaction,
    addGoal,
  }

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  )
}
