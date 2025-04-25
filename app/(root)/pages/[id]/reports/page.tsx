"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const CreateReport = () => {
  const { id } = useParams();

  const router = useRouter();
  const [report, setreport] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const [isUpload, setisupload] = useState(false);

  const createReport = async () => {
    setisupload(true);

    const formData = {
      report: report,
      patient: id,
    };

    const response = await apiService.postWithToken(
      "/api/patients/create_report/",
      JSON.stringify(formData),
    );

    console.log(response);
    router.push(`/pages/patient/${id}`);

    if (response.access) {
      router.push(`/pages/patient/${id}`);
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      });
      setErrors(tmpErrors);
      setisupload(false);
    }
  };

  return (
    <>
      <h1>Report</h1>
      <p>{id}</p>
      <div className="flex-col transition">
        <form className="space-y-4 transition">
          <textarea
            onChange={(e) => setreport(e.target.value)}
            className="w-full h-[134px] px-4 border border-gray-300 rounded-xl"
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
            onClick={createReport}
            disabled={isUpload}
            className={
              "w-full h-[34px] mt-3 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
            }
          >
            Create Report
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateReport;
