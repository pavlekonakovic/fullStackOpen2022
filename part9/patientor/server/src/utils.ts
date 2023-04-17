import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)){
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseValue = (value: unknown): string => {
  if(!isString(value)){
    throw new Error('Incorrect or missing value ' + value);
  }

  return value;
};

const isGender = (param: string) : param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if( !object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object) {
    const newPatient: NewPatientEntry = {
      name: parseValue(object.name),
      ssn: parseValue(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseValue(object.occupation),
      gender: parseGender(object.gender)
    };
    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewPatientEntry;
