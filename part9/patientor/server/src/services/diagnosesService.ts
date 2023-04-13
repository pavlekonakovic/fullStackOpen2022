import diagnosisData from "../../data/diagnoses";
import { DiagnoseEntry } from "../types";

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnosisData;
};

export default {
  getDiagnoses,
};
