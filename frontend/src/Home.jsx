import { useState, useEffect } from 'react'

function Home({ setView, setSelectedProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products')
      if (!response.ok) {
        throw new Error('Failed to fetch inventory items.')
      }
      const resData = await response.json()
      setProducts(resData.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleEdit = (item) => {
    setSelectedProduct(item)
    setView('edit-product')
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProducts(products.filter((item) => item._id !== id))
      } else {
        alert('Failed to delete item.')
      }
    } catch (err) {
      alert('Error connecting to backend.')
    }
  }

  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Sari-Sari Store Inventory</h1>

      {loading && <p>Loading inventory...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ margin: '0 auto 20px auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6">No products available.</td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>₱{Number(item.price).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>{' '}
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <button onClick={() => setView('add-new-product')}>New Product</button>
    </main>
  )
}

export default Home