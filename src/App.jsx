import { useState } from 'react'


function App() {

  async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
  }
  const [query, setQuery] = useState('')

  const url = `http://localhost:3333/products?search=[query]`

  return (
    <>
      <h1>Cerca tra i nostri prodotti!</h1>

    </>
  )
}

export default App
