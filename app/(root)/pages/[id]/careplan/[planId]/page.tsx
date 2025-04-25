"use client";
import React, { useEffect } from "react";
import axiosInstance from "@/components/axios";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

function EditCarePlan() {
  const { id, planId } = useParams();
  const router = useRouter();

  const loggedUser = localStorage.getItem("thatUser");

  console.log(id);
  console.log(planId);

  const [goalofplan, setgoal_of_plan] = useState("");
  const [recommendation, setrecommendations] = useState("");
  const [goal, setgoals] = useState("");
  const [medication, setmedications] = useState("");
  const [relevant_history, setrelevant_patient_history] = useState("");
  const [Physicofpatient, setPhysical_of_patient] = useState("");

  const initialFormData = Object.freeze({
    goal_of_plan: "",
    recommendations: "",
    goals: "",
    medications: "",
    relevant_patient_history: "",
    Physical_of_patient: "",
    patient: id,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    axiosInstance.get("care_plan/" + planId).then((res) => {
      updateFormData({
        ...formData,
        ["goal_of_plan"]: res.data.goal_of_plan,
        ["recommendations"]: res.data.recommendations,
        ["goals"]: res.data.goals,
        ["medications"]: res.data.medications,
        ["relevant_patient_history"]: res.data.relevant_patient_history,
        ["Physical_of_patient"]: res.data.Physical_of_patient,
      });
      console.log(res.data);
    });
  }, [updateFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    console.log(updateFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axiosInstance.patch("edit_careplan/" + planId + "/", {
      goal_of_plan: goalofplan || formData.goal_of_plan,
      recommendations: recommendation || formData.recommendations,
      goals: goal || formData.goals,
      medications: medication || formData.medications,
      relevant_patient_history:
        relevant_history || formData.relevant_patient_history,
      Physical_of_patient: Physicofpatient || formData.Physical_of_patient,
      patient: id,
    });
    alert("It should have worked check network tab");
    router.push(`/pages/patient/${id}`);
  };

  if (loggedUser === "01a12d23-b6b0-45b4-961a-86054e0e4bab")
    return (
      <>
        <div className="flex-col transition">
          <form className="space-y-4 transition">
            <textarea
              defaultValue={formData.goal_of_plan}
              onChange={(e) => setgoal_of_plan(e.target.value)}
              className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
              placeholder="What is the genral goal of the plan we are creating for the patient"
            ></textarea>
            <textarea
              defaultValue={formData.recommendations}
              onChange={(e) => setrecommendations(e.target.value)}
              className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
              placeholder="Any more recommendations for patient"
            ></textarea>
            <textarea
              defaultValue={formData.medications}
              onChange={(e) => setmedications(e.target.value)}
              className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
              placeholder="Medications and respective doasges the patient is on"
            ></textarea>
            <textarea
              defaultValue={formData.goals}
              onChange={(e) => setgoals(e.target.value)}
              className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
              placeholder="Specific goals we wish the patiet to reach"
            ></textarea>
            <textarea
              defaultValue={formData.relevant_patient_history}
              onChange={(e) => setrelevant_patient_history(e.target.value)}
              className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
              placeholder="Relevant Patient History"
            ></textarea>
            <textarea
              defaultValue={formData.Physical_of_patient}
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
              onClick={handleSubmit}
              className={
                "w-full h-[34px] mt-3 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
              }
            >
              Save Care Plan
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
            defaultValue={formData.goal_of_plan}
            onChange={(e) => setgoal_of_plan(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="What is the genral goal of the plan we are creating for the patient"
          ></textarea>
          <textarea
            defaultValue={formData.recommendations}
            onChange={(e) => setrecommendations(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="Any more recommendations for patient"
          ></textarea>
          <textarea
            defaultValue={formData.medications}
            onChange={(e) => setmedications(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="Medications and respective doasges the patient is on"
          ></textarea>
          <textarea
            defaultValue={formData.goals}
            onChange={(e) => setgoals(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="Specific goals we wish the patiet to reach"
          ></textarea>
          <textarea
            defaultValue={formData.relevant_patient_history}
            onChange={(e) => setrelevant_patient_history(e.target.value)}
            className="w-full h-[104px] px-4 border border-gray-300 rounded-xl"
            placeholder="Relevant Patient History"
          ></textarea>
          <textarea
            defaultValue={formData.Physical_of_patient}
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
        </form>
      </div>
    </>
  );
}

export default EditCarePlan;
