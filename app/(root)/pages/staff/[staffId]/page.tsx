"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import { ReportType } from "@/app/(root)/page";
import Staffreports from "@/components/Staffreports";
import PatientListItem from "@/components/PatientListItem";

const Page = () => {
  const [staff, setstaff] = useState({});

  const { staffId } = useParams();
  console.log(staffId);

  const getStaff = async () => {
    const tmpStaffs = await fetch(
      `http://127.0.0.1:8000/api/patients/staff/${staffId}/`,
    );

    const data = await tmpStaffs.json();
    setstaff(data);
    console.log(data);
  };

  useEffect(() => {
    getStaff();
  }, [staffId]);

  const [report, setreport] = useState<ReportType[]>([]);

  const getReport = async () => {
    const tmpReportss = await apiService.get("/api/patients/reports/");

    setreport(tmpReportss.data);
  };

  useEffect(() => {
    apiService.get("/api/patients/reports/");

    getReport();
  }, []);

  const staffReport = report.filter((plan) => plan.user === staffId);
  console.log(staffReport);

  if (!staff)
    return (
      <div className={"page-container"}>
        <section className={"w-full"}>
          <h1 className={"h1 capitalize"}>Page Is Loading</h1>
        </section>
      </div>
    );

  return (
    <div className={"page-container"}>
      <section className={"w-full"}>
        <h1 className={"h1 capitalize line-clamp-1"}>{staffId} reports</h1>
      </section>

      <section className={"left-0 mt-20 w-full"}>
        <h1 className={"h4 capitalize"}>View Carer Reports below:</h1>

        {staffReport.map((report) => {
          return <Staffreports key={report.id} report={report} />;
        })}
      </section>
    </div>
  );
};

export default Page;
