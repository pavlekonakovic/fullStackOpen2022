interface ExerciseResults {
  periodLenght: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string,
  target: number
  average: number
}

type Rating = 1 | 2 | 3;
type RatingDescription = 'Nice try, increase your exercises' | 'Not too bad but could be better' | 'Great! Keep up the good work!';

export const calculateExercises = (target:number, exerciseHours: number[] ): ExerciseResults => {
  const periodLenght: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter((exercise) => exercise > 0).length;
  const totalHours: number = exerciseHours.reduce((total, currentValue) => total + currentValue, 0);
  const average: number = totalHours / periodLenght;
  const success = average >= target;

  let rating: Rating = 1;
  let ratingDescription: RatingDescription = 'Nice try, increase your exercises';

  if(average < target - 1) {
    rating = 1;
    ratingDescription = 'Nice try, increase your exercises';
  } else if(average > target - 1) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } 
  if (average > target) {
    rating = 3;
    ratingDescription = 'Great! Keep up the good work!';
  }

  return {
    periodLenght,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

export interface ExerciseValues {
  target: number
  daily_exercises: number[]
}

const ExerciseArguments = (args: string[]) : ExerciseValues => {
  if(args.length < 4) throw new Error('Not enough arguments');

  if(isNaN(Number(args[2])) && Number(args[2]) > 0){
    throw new Error('Target needs to be the number and positive value');
  }

  const daily_exercises: number[] = [];

  for (let i = 3; i < args.length; i++) {
    if(!isNaN(Number(args[i]))){
      daily_exercises.push(Number(args[i]));
    } else {
      throw new Error('Provided values are not numbers');
    }
  }

  return {
    target: Number(args[2]),
    daily_exercises
  };
};

try{
  const { target, daily_exercises } = ExerciseArguments(process.argv);
  console.log(calculateExercises(target, daily_exercises));
} catch(error: unknown) {
  let errorMessage = 'Something bad happened.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
