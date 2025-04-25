"use client";

import apiService from "@/app/services/apiService";
import React, { useEffect, useState } from "react";
import PatientListItem from "@/components/PatientListItem";
import Link from "next/link";
import SearchPatients from "@/components/SearchPatients";

export type PatientType = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  phone: bigint;
  attending_staff: string;
  gender: string;
  user: string;
  package_type: string;
  address: string;
  created: string;
};

const Page = () => {
  const [patients, setPatients] = useState<PatientType[]>([]);

  const getPatients = async () => {
    const tmpPatients = await apiService.get("/api/patients/");

    setPatients(tmpPatients.data);
  };

  useEffect(() => {
    apiService.get("/api/patients/");

    getPatients();
  }, []);

  {
    /*
    const [plans, setplans] = useState<PlanType[]>([]);
    const getPlans = async () => {
      const tmpPlans = await apiService.get("/api/patients/careplan/");

      setplans(tmpPlans.data);
    };

    useEffect(() => {
      apiService.get("/api/patients/careplan/");

      getPlans();
    }, []);

    console.log(plans);*/
  }

  return (
    <>
      <div className={"page-container"}>
        <section className={"w-full"}>
          <h1 className={"h1 capitalize"}>Patients</h1>
        </section>
        <SearchPatients result={setPatients} />
        <Link href={"/pages/addPatient/"} className={"transition"}>
          <button type={"button"} className={"uploader-button"}>
            <p className={"text-white"}>Add Patient</p>
          </button>
        </Link>
      </div>
      {patients.map((patient) => {
        return <PatientListItem key={patient.id} patient={patient} />;
      })}
    </>
  );
};

export default Page;
