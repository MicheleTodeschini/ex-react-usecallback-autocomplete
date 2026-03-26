import { useCallback, useEffect, useState } from 'react'


function App() {

  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        callback(value)
      }, delay)
    }
  }

  async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
  }
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])


  const eseguiFetch = debounce(async (query) => {
    if (query === '') {
      setProducts([])
      return
    }
    try {
      const data = await fetchJson(`http://localhost:3333/products?search=${query}`)
      console.log(query);

      setProducts(data)
    } catch (error) {
      console.error('Non sono risucito a recuperare i prodotti')
    }


  }, 300)

  const eseguiFetchCallback = useCallback(eseguiFetch, [])

  useEffect(() => {
    eseguiFetchCallback(query)
  }, [query])



  return (
    <>
      <h1>Cerca tra i nostri prodotti!</h1>

      <input
        type='text'
        placeholder='cerca qui i prodotti'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
          </li>
        ))}
      </ul>

    </>
  )
}

export default App

