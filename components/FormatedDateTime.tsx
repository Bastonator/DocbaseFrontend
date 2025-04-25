"use client";

import FilesList from "@/components/FilesList";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const FormatedDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p className={cn("body-1 text-light-200")}>
      {format(new Date(date), "PPP p")};{" "}
    </p>
  );
};

export default FormatedDateTime;
