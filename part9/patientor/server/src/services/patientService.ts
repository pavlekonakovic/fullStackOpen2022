import { v4 as uuid } from 'uuid';
import patientData from "../../data/patients";
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from "../types";

const patients: PatientEntry[] = patientData;

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientsData = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatientEntry : PatientEntry = {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
    id: uuid(),
    ...patient
  };
  
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatientsData,
  addPatient
};
