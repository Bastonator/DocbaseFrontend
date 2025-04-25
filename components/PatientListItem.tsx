"use client";
import React from "react";
import { PatientType } from "@/app/(root)/pages/patientList/page";
import Link from "next/link";

interface PatientProps {
  patient: PatientType;
}

const patientListItem: React.FC<PatientProps> = ({ patient }) => {
  const shiftState = localStorage.getItem("shift");
  const loggedUser = localStorage.getItem("thatUser");

  if (shiftState === "ON")
    return (
      <>
        <div className={"page-container"}>
          <section className={"w-full"}>
            <div
              className={
                "w-full transition-all h-[64px] px-8 items-center justify-center rounded  hover:bg-slate-300 mt-6 border-b-brand border-4"
              }
            >
              <div className={"flex justify-between"}>
                <Link href={`/pages/patient/${patient.id}`} key={patient.id}>
                  <p className={"mt-5 line-clamp-1"}>
                    Patient Info: {patient.id}, {patient.first_name}{" "}
                    {patient.last_name}
                  </p>
                </Link>
                <p className={"mt-5"}> on ---- Package</p>

                <Link
                  href={`/pages/${patient.id}/careplan/`}
                  className={"transition w-1/6"}
                >
                  <button
                    className={
                      "w-full h-[34px] mt-3 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
                    }
                  >
                    Add Care Plan
                  </button>
                </Link>
                <Link href={`/pages/${patient.id}/reports/`}>
                  <p className={"mt-5 text-amber-900"}>Report</p>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </>
    );

  const renderButtons = () => {
    if (loggedUser === "01a12d23-b6b0-45b4-961a-86054e0e4bab")
      return (
        <>
          <Link
            href={`/pages/${patient.id}/careplan/`}
            className={"transition w-1/6"}
          >
            <button
              className={
                "w-full h-[34px] mt-3 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
              }
            >
              Add Care Plan
            </button>
          </Link>
          <Link href={`/pages/${patient.id}/reports/`}>
            <p className={"mt-5 text-amber-900"}>Report</p>
          </Link>
        </>
      );
  };

  return (
    <>
      <div className={"page-container"}>
        <section className={"w-full"}>
          <div
            className={
              "w-full transition-all h-[64px] px-8 items-center justify-center rounded  hover:bg-slate-300 mt-6 border-b-brand border-4"
            }
          >
            <div className={"flex justify-between"}>
              <Link href={`/pages/patient/${patient.id}`} key={patient.id}>
                <p className={"mt-5 line-clamp-1"}>
                  Patient Info: {patient.id}, {patient.first_name}{" "}
                  {patient.last_name}
                </p>
              </Link>
              <p className={"mt-5"}> on ---- Package</p>
              {renderButtons()}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default patientListItem;
