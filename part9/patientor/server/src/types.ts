export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export type NewPatientEntry = Omit<PatientEntry, "id">;

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;
