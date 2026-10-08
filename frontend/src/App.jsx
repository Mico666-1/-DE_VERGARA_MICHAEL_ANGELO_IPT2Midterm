import { useState } from 'react'
import Home from './Home'
import AddNewProduct from './AddNewProduct'
import EditProduct from './EditProduct'

export default function App() {
  const [view, setView] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div>
      {view === 'home' && (
        <Home
          setView={setView}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {view === 'add-new-product' && (
        <AddNewProduct
          setView={setView}
        />
      )}

      {view === 'edit-product' && (
        <EditProduct
          product={selectedProduct}
          setView={setView}
        />
      )}
    </div>
  )
}