import { useEffect, useState } from 'react'


function App() {

  async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
  }
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {

    async function getProducts() {


      try {
        const data = await fetchJson(`http://localhost:3333/products?search=${query}`)
        console.log(data);

        setProducts(data)
      } catch (error) {
        console.error('Non sono riuscito a recuperare i prodotti')
      }

    }
    getProducts()
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
