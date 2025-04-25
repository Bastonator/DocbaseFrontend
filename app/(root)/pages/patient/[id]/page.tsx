"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import SearchReports from "@/components/SearchReports";
import { PatientType } from "@/app/(root)/pages/patientList/page";
import Patientdata from "@/components/Patientdata";
import Patientcareplan from "@/components/Patientcareplan";
import { ReportType } from "@/app/(root)/page";
import Patientreports from "@/components/Patientreports";
export type PlanType = {
  id: string;
  user: string;
  patient: string;
  goal_of_plan: number;
  recommendations: string;
  goals: string;
  medications: string;
  relevant_patient_history: string;
  Physical_of_patient: string;
};

const Page = () => {
  const loggedUser = localStorage.getItem("thatUser");

  const [patient, setPatients] = useState<PatientType | null>(null);

  const { id } = useParams();

  const getPatients = async () => {
    const tmpPatients = await fetch(
      `http://127.0.0.1:8000/api/patients/${id}/`,
    );

    const data = await tmpPatients.json();
    setPatients(data);
    console.log(data);
  };

  useEffect(() => {
    getPatients();
  }, [id]);

  ////////////////////////////////////////////////////////////////////

  const [careplan, setcareplan] = useState<PlanType[]>([]);

  const getCareplan = async () => {
    const tmpPatients = await apiService.get("/api/patients/careplan/");

    setcareplan(tmpPatients.data);
  };

  useEffect(() => {
    apiService.get("/api/patients/careplan/");

    getCareplan();
  }, []);

  const patientCarePlan = careplan.filter((plan) => plan.patient === id);
  console.log(patientCarePlan);

  ////////////////////////////////////////////////////////////////////////

  const [report, setreport] = useState<ReportType[]>([]);

  const getReport = async () => {
    const tmpReportss = await apiService.get("/api/patients/reports/");

    setreport(tmpReportss.data);
  };

  useEffect(() => {
    apiService.get("/api/patients/reports/");

    getReport();
  }, []);

  const patientReport = report.filter((plan) => plan.patient === id);
  console.log(patientReport);

  const patientReportByUser = patientReport.filter(
    (report) => report.user === loggedUser,
  );
  console.log(patientReportByUser);

  if (!patient)
    return (
      <div className={"page-container"}>
        <section className={"w-full"}>
          <h1 className={"h1 capitalize"}>Page Is Loading</h1>
        </section>
      </div>
    );

  return (
    <>
      <div className={"page-container"}>
        <Patientdata patient={patient} />

        <section className={"left-0 mt-20 w-full"}>
          <h1 className={"h4 capitalize"}>View Care Plans below:</h1>
          {patientCarePlan.map((careplan) => {
            return <Patientcareplan key={careplan.id} plan={careplan} />;
          })}
        </section>
        <section className={"left-0 mt-20 w-full"}>
          <h1 className={"h4 capitalize"}>View Carer Reports below:</h1>
          <SearchReports result={setreport} />
          {patientReportByUser.map((report) => {
            return <Patientreports key={report.id} report={report} />;
          })}
        </section>
      </div>
    </>
  );
};

export default Page;
