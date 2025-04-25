"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password1, setPasword1] = useState("");
  const [password2, setPasword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitSignup = async () => {
    const formData = {
      email: email,
      phonenumber: phonenumber,
      password1: password1,
      password2: password2,
    };

    const response = await apiService.post(
      "/api/auth/register/",
      JSON.stringify(formData),
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      localStorage.setItem("token", response.access);
      localStorage.setItem("thatUser", response.user.pk);

      router.push("/");
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      });
      setErrors(tmpErrors);
    }
  };

  return (
    <>
      <div className="flex-col">
        <form action={submitSignup} className="space-y-4">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Email"
          ></input>
          <input
            type="text"
            onChange={(e) => setPhonenumber(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Phone number"
          ></input>
          <input
            type="password"
            onChange={(e) => setPasword1(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Pasword"
          ></input>
          <input
            type="password"
            onChange={(e) => setPasword2(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Confirm Password"
          ></input>

          {errors.map((error, index) => {
            return (
              <p key={`error_${index}`} className="p-5">
                {error}
              </p>
            );
          })}

          <button type="submit" onClick={submitSignup}>
            Create account
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
