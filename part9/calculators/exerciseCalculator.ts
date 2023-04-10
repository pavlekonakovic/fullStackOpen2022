interface ExerciseResults {
  periodLenght: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string,
  target: number
  average: number
}

type Rating = 1 | 2 | 3
type RatingDescription = 'Nice try, increase your exercises' | 'Not too bad but could be better' | 'Great! Keep up the good work!'

const calculateExercises = (exerciseHours: number[], target:number): ExerciseResults => {
  const periodLenght: number = exerciseHours.length
  const trainingDays: number = exerciseHours.filter((exercise) => exercise > 0).length
  const totalHours: number = exerciseHours.reduce((total, currentValue) => total + currentValue, 0)
  const average: number = totalHours / periodLenght
  const success = average >= target

  let rating: Rating
  let ratingDescription: RatingDescription

  if(average < target - 1) {
    rating = 1
    ratingDescription = 'Nice try, increase your exercises'
  } else if(average > target - 1) {
    rating = 2
    ratingDescription = 'Not too bad but could be better'
  } else if (average > target) {
    rating = 3
    ratingDescription = 'Great! Keep up the good work!'
  }

  return {
    periodLenght,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
