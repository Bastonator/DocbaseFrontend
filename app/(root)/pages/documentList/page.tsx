"use client";
import React from "react";
import FetchDocs from "@/components/FetchDocs";

const Page = () => {
  return (
    <>
      <FetchDocs hiddenChild={<search />} />
    </>
  );
};

export default Page;
