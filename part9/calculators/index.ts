import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if(!height || !weight) {
    res.status(400).send({
      error: 'not enough parameters, please input height and weight'
    })
  }

  if(isNaN(Number(height)) || isNaN(Number(weight))){
    res.status(400).send({
      error: 'malformatted parameters'
    })
  }

  const bmi = calculateBmi(Number(height), Number(weight))

  res.send({ height, weight, bmi})
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
