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

    router.push("/pages/staffList");

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      localStorage.setItem("token", response.access);
      localStorage.setItem("thatUser", response.user.pk);

      router.push("/pages/staffList");
    } else {
      setErrors(response.non_field_errors);
    }

    const User = await getUserId();
    console.log(User);
  };

  return (
    <>
      <div className={"flex min-h-screen"}>
        <section className="bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
          <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
            <img
              src="/Passion.jpg"
              alt="Wriber Logo"
              width={124}
              height={80}
              className="h-auto"
            />
            <div className="space-y-5 text-white">
              <h1 className="h1">We care</h1>
              <p className="body-1">We are servants, lets serve you!</p>
            </div>
            <img
              src="/Passion.jpg"
              alt="Logo"
              width={342}
              height={342}
              className="transition-all hover:rotate-12 hover:scale-150"
            />
          </div>
        </section>
        <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
          <div className="mb-16 lg:hidden">
            <img
              src="/Wriber.png"
              alt="logo"
              width={224}
              height={80}
              className="h-auto w-[200px] lg:w-[250px]"
            />
          </div>
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
        </section>
      </div>
    </>
  );
};

export default Page;
