import patientData from "../../data/patients";
import { PatientEntry, NonSensitivePatientEntry } from "../types";

const getPatients = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitivePatientsData = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getNonSensitivePatientsData,
};
