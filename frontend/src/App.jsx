import {useState} from 'react'
import Home from './Home'
import AddNewProduct from './AddNewProduct'
import './App.css'
function App()
{
	const [view, setView] = useState('home')
	if(view == 'home'){return(<Home setView={setView} />)}
	if(view == 'add-new-product'){return(<AddNewProduct setView={setView} />)}
}
export default App