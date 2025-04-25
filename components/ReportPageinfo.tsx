"use client";
import React from "react";
import { PatientType } from "@/app/(root)/pages/patientList/page";

interface PatientProps {
  patient: PatientType;
}

const ReportPageinfo: React.FC<PatientProps> = ({ patient }) => {
  return (
    <>
      <div>
        <h1 className={"font-bold"}>
          {patient.first_name} {patient.last_name}
        </h1>
      </div>
    </>
  );
};
export default ReportPageinfo;
