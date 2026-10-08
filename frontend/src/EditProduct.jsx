import { useState, useEffect } from 'react'

function EditProduct({ product, setView }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    quantity: product?.quantity || ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Populate form if product prop updates
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        quantity: product.quantity || ''
      })
    }
  }, [product])

  const handleEdit = function (event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async function (event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
          quantity: parseInt(form.quantity, 10) || 0
        })
      })

      const resData = await response.json()

      if (!response.ok) {
        throw new Error(resData.message || 'Failed to update product.')
      }

      setView('home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ textAlign: 'left', maxWidth: '400px', margin: '20px auto' }}>
      <h2>Edit Product</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Product name</label><br />
        <input name="name" value={form.name} onChange={handleEdit} required /><br />

        <label>Category</label><br />
        <input name="category" value={form.category} onChange={handleEdit} required /><br />

        <label>Price</label><br />
        <input type="number" step=".01" name="price" value={form.price} onChange={handleEdit} required /><br />

        <label>Quantity</label><br />
        <input type="number" name="quantity" value={form.quantity} onChange={handleEdit} required /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>{' '}
        <button type="button" onClick={() => setView('home')}>Cancel</button>
      </form>
    </main>
  )
}

export default EditProduct