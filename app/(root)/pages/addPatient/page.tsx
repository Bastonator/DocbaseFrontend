"use client";
import React, { useEffect } from "react";
import apiService from "@/app/services/apiService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StaffType } from "@/app/(root)/pages/staffList/page";

{
  /*
THE FORM SUBMISSION WORKS BUT THE GENDER ISN'T SAVED IN THE DATABASE AND ALSO TWO PATIENTS ARE CREATED UPON CREATING THE PATIENT INSTEAD OF ONE
*/
}

const AddPatients = () => {
  const router = useRouter();
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [staff, setStaff] = useState({});
  const [staffList, setStaffList] = useState<StaffType[]>([]);
  const [isUpload, setisupload] = useState(false);

  const getStaff = async () => {
    const tmpPatients = await apiService.get("/api/patients/staff/");

    setStaffList(tmpPatients.data);
  };

  useEffect(() => {
    apiService.get("/api/patients/staff/");

    getStaff();
  }, []);

  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStaff = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setStaff(selectedStaff);
  };

  const createPatient = async () => {
    setisupload(true);

    const formData = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      address: address,
      age: age,
      gender: gender,
      attending_staff: staff,
    };
    console.log(formData);

    const response = await apiService.postWithToken(
      "/api/patients/add_patient/",
      JSON.stringify(formData),
    );

    console.log(response);
    alert("Patient created!");
    router.push(`/pages/patient/${response.id}`);

    if (response.access) {
      router.push(`/pages/patient/${response.id}`);
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
      <div className="flex-col transition">
        <form className="space-y-4 transition">
          <input
            type="text"
            onChange={(e) => setfirst_name(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="First Name"
          ></input>
          <input
            type="text"
            onChange={(e) => setlast_name(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Last Name"
          ></input>
          <input
            type="text"
            onChange={(e) => setphone(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Phone number"
          ></input>
          <input
            type="text"
            onChange={(e) => setaddress(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Address"
          ></input>
          <input
            type="text"
            onChange={(e) => setage(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Age"
          ></input>
          <input
            type="text"
            onChange={(e) => setgender(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Gender"
          ></input>
          <label>Select Attending Staff:</label>
          <select
            multiple
            name={"attending_staff"}
            onChange={handleStaffChange}
          >
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.email}
              </option>
            ))}
          </select>
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
            onClick={createPatient}
            disabled={isUpload}
            className={
              "w-full h-[34px] mt-3 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
            }
          >
            Register Patient
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPatients;
