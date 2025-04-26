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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredPatients = patients.filter((patient) => {
    const term = searchTerm.toLowerCase();

    return (
      patient.id.toString().toLowerCase().includes(term) ||
      patient.first_name.toLowerCase().includes(term) ||
      patient.last_name.toLowerCase().includes(term) ||
      patient.age.toString().toLowerCase().includes(term) ||
      patient.user.toLowerCase().includes(term) ||
      patient.package_type.toLowerCase().includes(term) ||
      patient.phone.toString().toLowerCase().includes(term) ||
      patient.address.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <div className={"page-container"}>
        <section className={"w-full"}>
          <h1 className={"h1 capitalize"}>Patients</h1>
        </section>
        <SearchPatients searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Link href={"/pages/addPatient/"} className={"transition"}>
          <button type={"button"} className={"uploader-button"}>
            <p className={"text-white"}>Add Patient</p>
          </button>
        </Link>
      </div>
      {filteredPatients.map((patient) => {
        return <PatientListItem key={patient.id} patient={patient} />;
      })}
    </>
  );
};

export default Page;
