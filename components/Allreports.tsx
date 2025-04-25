"use client";
import Link from "next/link";
import React from "react";
import { ReportType } from "@/app/(root)/page";

interface ReportProps {
  report: ReportType;
}

const Allpatients: React.FC<ReportProps> = ({ report }) => {
  return (
    <>
      <div className={"flex-col"}>
        <h2 className={"h2 capitalize"}>Recent reports:</h2>
        <div className={"w-full ml-2"}>
          <div
            className={
              "w-full transition-all h-[64px] px-8 items-center justify-center border-4 border-b-blue rounded-2xl  hover:bg-slate-300 mt-6"
            }
          >
            <div className={"w-full flex justify-between "}>
              <Link href={"/"}>
                <p className={"mt-5 line-clamp-1 font-bold"}>
                  Report Info: {report.id}
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
