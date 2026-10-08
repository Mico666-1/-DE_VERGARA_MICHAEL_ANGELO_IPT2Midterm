import { useState } from 'react'

function AddNewProduct({ setView }) {
  const [form, setForm] = useState({ name: '', category: '', price: '', quantity: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEdit = function (event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async function (event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
          quantity: parseInt(form.quantity, 10) || 0
        })
      })

      const resData = await response.json()

      if (!response.ok) {
        throw new Error(resData.message || 'Failed to create product.')
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
      <h2>Add New Product</h2>

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
          {loading ? 'Adding...' : 'Add'}
        </button>{' '}
        <button type="button" onClick={() => setView('home')}>Cancel</button>
      </form>
    </main>
  )
}

export default AddNewProduct