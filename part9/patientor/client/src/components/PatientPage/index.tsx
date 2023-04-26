import patientService from "../../services/patients";
import { useState, useEffect } from "react";
import { Patient, Gender } from "../../types";
import { useParams } from "react-router-dom";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import Entry from "./Entry";

const PatientPage = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState<Patient>();
  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getSingle(id);
      setPatient(patient);
    };
    void fetchPatient();
  });

  const genderIcon = (gender: Gender | undefined) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return <LocalHospitalIcon />;
    }
  };

  return (
    <div>
      <h2>
        {patient?.name}
        {genderIcon(patient?.gender)}
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      {patient?.entries && patient.entries.length > 0 && <h3>entries</h3>}
      {patient?.entries.map((entry) => (
        <Entry entry={entry} key={entry.id} />
      ))}
    </div>
  );
};

export default PatientPage;
