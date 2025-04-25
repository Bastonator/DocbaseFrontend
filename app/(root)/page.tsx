"use client";
import React, { useEffect, useState } from "react";
import Allpatients from "@/components/Allpatients";
import apiService from "@/app/services/apiService";
import Allreports from "@/components/Allreports";
import { PatientType } from "@/app/(root)/pages/patientList/page";

export type ReportType = {
  id: string;
  user: string;
  patient: string;
  created_at: string;
  report: string;
};

export default function Home() {
  const [patients, setPatients] = useState<PatientType[]>([]);

  const getPatients = async () => {
    const tmpPatients = await apiService.get("/api/patients/");

    setPatients(tmpPatients.data);
  };

  useEffect(() => {
    apiService.get("/api/patients/");

    getPatients();
  }, []);

  const [reports, setReports] = useState<ReportType[]>([]);

  const getReports = async () => {
    const tmpReports = await apiService.get("/api/patients/reports/");

    setReports(tmpReports.data);
  };

  useEffect(() => {
    apiService.get("/api/patients/reports/");

    getReports();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-extrabold text-brand-100">
        Plus Database - A database system made proprietary for Passion Plus
      </h1>
      <br />
      <br />
      <br />

      <div className={"flex justify-between"}>
        {patients.map((patient) => {
          return <Allpatients key={patient.id} patient={patient} />;
        })}

        {reports.map((report) => {
          return <Allreports key={report.id} report={report} />;
        })}
      </div>
    </>
  );
}
