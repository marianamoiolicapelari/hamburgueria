const { request } = require('express')
const express = require('express')
const uuid = require('uuid')

const app = express()
app.use(express.json())
const port = 3000

const orders = []

const checkOrder = (request, response, next) => {
  const { id } = request.params

  const index = orders.findIndex(order => order.id === id)

  if (index < 0){
    return response.status(404).json({error:"User not found" })
  }
  request.orderIndex = index
  request.orderId = id

  next()
}

const method = (request, response, next) => {
  const method = request.method
  const url = request.path
  console.log("Method:", "[", method, "]", "-","URL:", url)

  next()
}

app.get('/order', method, (request, response) => {
  return response.status(200).json(orders)
})

app.get('/order/:id', checkOrder, (request, response) => {
    const index = request.orderIndex
    orderSpecific = orders[index]
    return response.json(orderSpecific)
  })
  
app.post('/order', method, (request, response) => {

  const { list, clientName, price } = request.body;

  const orderList = {
    id: uuid.v4(),
    list,
    clientName,
    price,
    status: "Em preparação"
  }

  orders.push(orderList)

  return response.status(201).json(orderList)
})

app.put('/order/:id', checkOrder, method, (request, response) => {
  const id = request.orderId
  const { list, clientName, price } = request.body;

  const userChange = {
    id,
    list,
    clientName,
    price,
    status:"EM PREPARAÇÃO"
  }

  const index = request.orderIndex

  orders[index] = userChange

  return response.status(200).json(userChange)
})

app.delete('/order/:id', checkOrder, method, (request, response) => {
  const index = request.orderIndex

  orders.splice(index, 1)

  return response.status(204).json()
})

app.patch('/order/:id', checkOrder, method, (request, response) => {
  const index = request.orderIndex
  const { id, list, clientName, price } = orders
  [index]
  const changeOrderStatus = {
    id,
    list,
    clientName,
    price,
    status: "PRONTO"
  }
  orders[index] = changeOrderStatus
  return response.json(changeOrderStatus)
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})