"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import { getUserId } from "@/app/lib/actions";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin = async () => {
    const formData = {
      email: email,
      password: password,
    };

    const response = await apiService.post(
      "/api/auth/login/",
      JSON.stringify(formData),
    );

    router.push("/");

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      localStorage.setItem("token", response.access);
      localStorage.setItem("thatUser", response.user.pk);

      router.push("/");
    } else {
      setErrors(response.non_field_errors);
    }
    router.push("/");
    const User = await getUserId();
    console.log(User);
  };

  return (
    <>
      <div className="flex-col">
        <form action={submitLogin} className="space-y-4">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Email"
          ></input>
          <input
            type="password"
            onChange={(e) => setPasword(e.target.value)}
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
            placeholder="Pasword"
          ></input>

          {errors.map((error, index) => {
            return (
              <p key={`error_${index}`} className="p-5">
                {error}
              </p>
            );
          })}

          <button type="submit" onClick={submitLogin}>
            Log in to account
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
