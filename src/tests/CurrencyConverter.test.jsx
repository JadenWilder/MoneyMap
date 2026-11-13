
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CurrencyConverter from '../components/CurrencyConverter'

vi.mock('../services/exchangeRateApi', () => ({
  getExchangeRates: vi.fn().mockResolvedValue({
    rates: {
      EUR: 0.9,
      GBP: 0.8,
      CAD: 1.4,
      JPY: 150,
    },
  }),
}))

describe('CurrencyConverter', () => {
  it('loads and displays the converted amount', async () => {
    render(<CurrencyConverter />)

    expect(
      await screen.findByText('€90.00')
    ).toBeInTheDocument()
  })

  it('updates the conversion when the currency changes', async () => {
    render(<CurrencyConverter />)

    await screen.findByText('€90.00')

    fireEvent.change(screen.getByLabelText('Convert to'), {
      target: { value: 'GBP' },
    })

    expect(screen.getByText('£80.00')).toBeInTheDocument()
  })
})
