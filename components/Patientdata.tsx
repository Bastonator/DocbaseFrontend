"use client";
import Link from "next/link";
import React from "react";
import { PatientType } from "@/app/(root)/pages/patientList/page";
import { useParams } from "next/navigation";

interface PatientProps {
  patient: PatientType;
}

const Patientdata: React.FC<PatientProps> = ({ patient }) => {
  const { id } = useParams();

  return (
    <>
      <section className={"w-full"}>
        <h1 className={"h1 capitalize"}>
          {patient.first_name} {patient.last_name} Info
        </h1>
      </section>
      <div className={"flex"}>
        <Link href={`/pages/${id}/careplan/`} className={"transition"}>
          <button type={"button"} className={"uploader-button mr-2.5"}>
            <p className={"text-white"}>Care Plan</p>
          </button>
        </Link>
        <Link href={`/pages/${id}/reports/`} className={"transition"}>
          <button type={"button"} className={"uploader-button ml-2"}>
            <p className={"text-white"}>Report</p>
          </button>
        </Link>
      </div>

      <section className={"w-full"}>
        <div className={"w-full h-[64px]  px-8 items-center justify-center"}>
          <div className={"flex justify-between"}>
            <p className={"mt-5 line-clamp-1 font-bold"}>ID: {patient.id}</p>
            <p className={"mt-5 line-clamp-1 font-bold"}>
              Name: {patient.first_name} {patient.last_name}
            </p>
            <p className={"mt-5 line-clamp-1 font-bold"}>
              Age and Sex: {patient.age} and {patient.gender}
            </p>
          </div>
          <div className={"flex justify-between"}>
            <p className={"mt-5 line-clamp-1 font-bold"}>
              Dial: {patient.phone}
            </p>
            <p className={"mt-5 line-clamp-1 font-bold"}>
              Address: {patient.address}
            </p>
            <p className={"mt-5 line-clamp-1 font-bold"}>On: --- Package</p>
          </div>
          <div className={"flex justify-between"}>
            <p className={"mt-5 line-clamp-1 font-bold"}>
              Attended by: {patient.attending_staff}
            </p>
            <p className={"mt-5 line-clamp-1 font-bold"}>
              Date registered: {patient.created}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Patientdata;
