import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types";

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

const getSinglePatient = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatientEntry: PatientEntry = {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
    id: uuid(),
    ...patient,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatientsData,
  getSinglePatient,
  addPatient,
};
