import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseValues } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if(!height || !weight) {
    res.status(400).send({
      error: 'not enough parameters, please input height and weight'
    });
  }

  if(isNaN(Number(height)) || isNaN(Number(weight))){
    res.status(400).send({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  res.send({ height, weight, bmi});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body as ExerciseValues;

  if(!daily_exercises || !target){
    res.status(400).send({
      error: 'parameters missing'
    });
  }

  if(isNaN(Number(target)) || !daily_exercises.every((element) => !isNaN(Number(element)))){
    res.status(400).send({
      error: 'malformatted parameters'
    });
  }

  res.json(calculateExercises(Number(target), daily_exercises.map((element) => Number(element))));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
