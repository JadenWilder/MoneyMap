
import { useEffect, useState } from 'react'
import { getExchangeRates } from '../services/exchangeRateApi'

function CurrencyConverter() {
  const [rates, setRates] = useState(null)
  const [amount, setAmount] = useState('100')
  const [currency, setCurrency] = useState('EUR')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadRates() {
      try {
        const data = await getExchangeRates()
        setRates(data.rates)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRates()
  }, [])

  const convertedAmount = rates
    ? (Number(amount || 0) * rates[currency]).toFixed(2)
    : '0.00'

  return (
    <section className="content-card currency-card">
      <h2>Currency Converter</h2>
      <p>Convert US dollars into another currency.</p>

      <label>
        Amount in USD
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>

      <label>
        Convert to
        <select
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        >
          <option value="EUR">Euro (EUR)</option>
          <option value="GBP">British Pound (GBP)</option>
          <option value="CAD">Canadian Dollar (CAD)</option>
          <option value="JPY">Japanese Yen (JPY)</option>
        </select>
      </label>

      {loading && <p>Loading exchange rates...</p>}
      {error && <p className="error-text">{error}</p>}

      {rates && !error && (
        <div className="conversion-result">
          <span>Converted Amount</span>
          <h3>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency,
            }).format(Number(convertedAmount))}
          </h3>
          <p>Based on an amount of ${Number(amount || 0).toFixed(2)} USD</p>
        </div>
      )}

      <small>Exchange rates provided by ExchangeRate-API.</small>
    </section>
  )
}

export default CurrencyConverter
