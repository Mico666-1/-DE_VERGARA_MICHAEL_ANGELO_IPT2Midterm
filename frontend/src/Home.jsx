function Home({setView})
{
    return(
		<main>
            <h1>Sari-Sari Store Inventory</h1>
			<table>
				<tr>
					<th>Product ID</th>
					<th>Product Name</th>
					<th>Category</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Action</th>
				</tr>
			</table>
			<button onClick={() => setView('add-new-product')}>New</button>
		</main>
	)
}
export default Home