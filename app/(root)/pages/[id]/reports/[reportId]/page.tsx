"use client";
import React, { useEffect } from "react";
import axiosInstance from "@/components/axios";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EditReport = () => {
  const { id, reportId } = useParams();
  const router = useRouter();

  const loggedUser = localStorage.getItem("thatUser");

  console.log(id);
  console.log(reportId);

  const [report, setreport] = useState("");

  const initialFormData = Object.freeze({
    report: "",
    patient: id,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    axiosInstance.get("report/" + reportId).then((res) => {
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
    axiosInstance.put("edit_report/" + reportId + "/", {
      report: report || formData.report,
      patient: id,
    });
    alert("It should have worked check network tab");
    router.push(`/pages/patient/${id}`);
  };

  const [patients, setPatients] = useState<PatientType | null>(null);

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

  if (loggedUser === "01a12d23-b6b0-45b4-961a-86054e0e4bab")
    return (
      <>
        <div className="flex-col transition">
          <form className="space-y-4 transition">
            <textarea
              defaultValue={formData.report}
              onChange={(e) => setreport(e.target.value)}
              className="w-full h-[124px] px-4 border border-gray-300 rounded-xl"
              placeholder="What is the genral goal of the plan we are creating for the patient"
            ></textarea>
            {errors.map((error, index) => {
              return (
                <p key={`error_${index}`} className="p-5">
                  {error}
                </p>
              );
            })}
            <br />
            <button
              type="submit"
              onClick={handleSubmit}
              className={
                "w-full h-[34px] mt-3 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
              }
            >
              Save Report
            </button>
          </form>
        </div>
      </>
    );

  return (
    <>
      <div className="flex-col transition">
        <form className="space-y-4 transition">
          <textarea
            defaultValue={formData.report}
            onChange={(e) => setreport(e.target.value)}
            className="w-full h-[124px] px-4 border border-gray-300 rounded-xl"
            placeholder="What is the genral goal of the plan we are creating for the patient"
          ></textarea>
          {errors.map((error, index) => {
            return (
              <p key={`error_${index}`} className="p-5">
                {error}
              </p>
            );
          })}
          <br />
        </form>
      </div>
    </>
  );
};

export default EditReport;
