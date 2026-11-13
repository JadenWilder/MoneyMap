
const API_URL = 'https://open.er-api.com/v6/latest/USD'

export async function getExchangeRates() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Unable to retrieve exchange rates.')
  }

  const data = await response.json()

  if (data.result !== 'success') {
    throw new Error('The exchange rate service returned an error.')
  }

  return data
}
