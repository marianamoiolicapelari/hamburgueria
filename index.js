const express = require('express')
const app = express()




app.get('/users',(request, response) => {
    return response.send('')
})
app.listen(3000)