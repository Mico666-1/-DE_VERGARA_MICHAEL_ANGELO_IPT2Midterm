function AddNewProduct({setView})
{
    return(
        <main style={{textAlign: 'left'}}>
            <h2>Add New Product</h2>
            <form>
                <label>Product name</label><br /><input /><br />
                <label>Category</label><br /><input /><br />
                <label>Price</label><br /><input type="number" step=".01" /><br />
                <label>Quantity</label><br /><input type="number" /><br /><br />
                <button>Add</button> <button type="button" onClick={() => setView('home')}>Cancel</button>
            </form>
        </main>
    )
}
export default AddNewProduct