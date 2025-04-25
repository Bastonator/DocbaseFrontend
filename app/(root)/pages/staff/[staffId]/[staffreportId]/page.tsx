"use client";
import React, { useEffect } from "react";
import axiosInstance from "@/components/axios";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

function ViewReport() {
  const { staffId, staffreportId } = useParams();
  const router = useRouter();

  console.log(staffId);
  console.log(staffreportId);

  const [report, setreport] = useState("");

  const initialFormData = Object.freeze({
    report: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    axiosInstance.get("report/" + staffreportId).then((res) => {
      updateFormData({
        ...formData,
        ["report"]: res.data.report,
      });
      console.log(res.data);
    });
  }, [updateFormData]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    console.log(updateFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axiosInstance.put("edit_staffreport/" + staffreportId + "/", {
      report: report || formData.report,
    });
    alert("It should have worked check network tab");
    router.push(`/pages/staff/${staffId}/`);
  };

  const [staff, setstaff] = useState({});

  const getStaffs = async () => {
    const tmpPatients = await fetch(
      `http://127.0.0.1:8000/api/patients/staff/${staffId}/`,
    );

    const data = await tmpPatients.json();
    setstaff(data);
    console.log(data);
  };

  useEffect(() => {
    getStaffs();
  }, [staffId]);

  return (
    <>
      <h1 className={"font-bold"}>{staffId}</h1>
      <div className="flex-col transition">
        <div
          className={
            "w-full transition-all h-[64px] px-8 items-center justify-center border rounded  hover:bg-slate-300 mt-6"
          }
        >
          <div className={"w-full flex justify-between "}>
            <p className={"mt-5 line-clamp-1 font-bold"}>{formData.report}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewReport;
