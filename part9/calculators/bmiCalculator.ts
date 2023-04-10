type centimeters = number
type killograms = number
type BMI = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obesity'

const calculateBmi = (height: centimeters, weight: killograms) : BMI => {
  const bmi: number = weight/ Math.pow(height / 100, 2)

  if(bmi < 18.5) return 'Underweight'
  else if(bmi < 25) return 'Normal (healthy weight)'
  else if(bmi < 30)return 'Overweight'
  else return 'Obesity'
}

console.log(calculateBmi(180, 74))