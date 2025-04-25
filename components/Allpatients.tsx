"use client";
import Link from "next/link";
import React from "react";
import { PatientType } from "@/app/(root)/pages/patientList/page";

interface PatientProps {
  patient: PatientType;
}

const Allpatients: React.FC<PatientProps> = ({ patient }) => {
  return (
    <>
      <div className={"flex-col"}>
        <h2 className={"h2 capitalize"}>Recently registered:</h2>
        <div className={"w-full mr-2"}>
          <div
            className={
              "w-full transition-all h-[64px] px-8 items-center justify-center border-4 border-t-amber-800 rounded-2xl  hover:bg-slate-300 mt-6"
            }
          >
            <div className={"w-full flex justify-between "}>
              <Link href={"/"}>
                <p className={"mt-5 line-clamp-1 font-bold"}>
                  Patient Info: {patient.id}, {patient.first_name}{" "}
                  {patient.last_name}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allpatients;
