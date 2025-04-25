"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const CreateCarePlan = () => {
  const { id } = useParams();

  const router = useRouter();
  const [goal_of_plan, setgoal_of_plan] = useState("");
  const [recommendations, setrecommendations] = useState("");
  const [goals, setgoals] = useState("");
  const [medications, setmedications] = useState("");
  const [relevant_patient_history, setrelevant_patient_history] = useState("");
  const [Physical_of_patient, setPhysical_of_patient] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const [isUpload, setisupload] = useState(false);

  const createCareplan = async () => {
    setisupload(true);

    const formData = {
      goal_of_plan: goal_of_plan,
      recommendations: recommendations,
      goals: goals,
      medications: medications,
      relevant_patient_history: relevant_patient_history,
      Physical_of_patient: Physical_of_patient,
      patient: id,
    };

    const response = await apiService.postWithToken(
      "/api/patients/create_careplan/",
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
      <h1>CarePlan</h1>
      <p>{id}</p>

      <div className="flex-col transition">
        <form className="space-y-4 transition">
          <textarea
            onChange={(e) => setgoal_of_plan(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="What is the genral goal of the plan we are creating for the patient"
          ></textarea>
          <textarea
            onChange={(e) => setrecommendations(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="Any more recommendations for patient"
          ></textarea>
          <textarea
            onChange={(e) => setmedications(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="Medications and respective doasges the patient is on"
          ></textarea>
          <textarea
            onChange={(e) => setgoals(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="Specific goals we wish the patiet to reach"
          ></textarea>
          <textarea
            onChange={(e) => setrelevant_patient_history(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="Relevant Patient History"
          ></textarea>
          <textarea
            onChange={(e) => setPhysical_of_patient(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="Patients Physical State"
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
            onClick={createCareplan}
            disabled={isUpload}
            className={
              "w-full h-[34px] mt-3 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
            }
          >
            Create Care Plan
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCarePlan;
