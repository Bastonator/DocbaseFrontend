"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiService from "@/app/services/apiService";

export type StaffType = {
  id: string;
  email: string;
};

const Page = () => {
  const [staffs, setStaffs] = useState<StaffType[]>([]);

  const getStaffs = async () => {
    const tmpStaffs = await apiService.get("/api/patients/staff/");

    setStaffs(tmpStaffs.data);
  };

  useEffect(() => {
    apiService.get("/api/patients/staff/");

    getStaffs();
  }, []);

  const getallStaffs = staffs.map((staff) => {
    return (
      <>
        <Link href={`/pages/staff/${staff.id}`} key={staff.id}>
          <div
            className={
              "w-full transition-all h-[64px] px-8 items-center justify-center border-4 border-t-cyan-500 rounded  hover:bg-slate-300 mt-6"
            }
            key={staff.id}
          >
            <div className={"w-full flex justify-between "}>
              <p className={"mt-4 line-clamp-1 font-bold"}>
                Carer Info: {staff.id}
              </p>
              <p key={staff.id} className={"mt-5 line-clamp-1 font-bold"}>
                Carer Role: {staff.email}
              </p>
              <button
                className={
                  "w-1/6 h-[34px] mt-3 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
                }
              >
                <Link href={`/pages/staff/${staff.id}`}>
                  <p className={"mt-1 line-clamp-1"}>View Reports</p>
                </Link>
              </button>
            </div>
          </div>
        </Link>
      </>
    );
  });

  return (
    <div className={"justify-center"}>
      <section className={"w-full"}>
        <h1 className={"h1 capitalize"}>Carers</h1>
      </section>
      {getallStaffs}
    </div>
  );
};

export default Page;
