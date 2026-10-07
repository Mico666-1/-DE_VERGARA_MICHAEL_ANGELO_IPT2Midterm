import express from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 666
app.use(cors())
app.use(express.json())
app.post('/api/form/create', (request, response) =>
{
    const {name, category, price, quantity} = request.body
    if(name.trim() != '' && category.trim() != '' && price.trim() != '')
    {
        console.log(`Product name: ${name}`)
        console.log(`Category: ${category}`)
        console.log(`Price: ${price}`)
        console.log(`Quantity: ${quantity}`)
    }
    response.end()
})
app.listen(port, function(){console.log(`Server is now running at port ${port}`)})