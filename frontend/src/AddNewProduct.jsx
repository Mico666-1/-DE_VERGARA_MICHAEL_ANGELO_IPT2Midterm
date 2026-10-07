import {useState} from 'react'
function AddNewProduct({setView})
{
    const [form, setForm] = useState({name: '', category: '', price: '', quantity: ''})
    const handleEdit = function(event)
    {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const handleSubmit = async function(event)
    {
        event.preventDefault()
        await fetch('http://localhost:666/api/form/create', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(form)})
    }
    return(
        <main style={{textAlign: 'left'}}>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <label>Product name</label><br /><input name="name" value={form.name} onChange={handleEdit} /><br />
                <label>Category</label><br /><input name="category" value={form.category} onChange={handleEdit} /><br />
                <label>Price</label><br /><input type="number" step=".01" name="price" value={form.price} onChange={handleEdit} /><br />
                <label>Quantity</label><br /><input type="number" name="quantity" value={form.quantity} onChange={handleEdit} /><br /><br />
                <button>Add</button> <button type="button" onClick={() => setView('home')}>Cancel</button>
            </form>
        </main>
    )
}
export default AddNewProduct