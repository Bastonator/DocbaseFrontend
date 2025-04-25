"use client";

import React from "react";
import Link from "next/link";
import FormatedDateTime from "@/components/FormatedDateTime";
import ActionsDropdown from "@/components/ActionsDropdown";
import { FileType } from "@/components/FetchDocs";

interface FileProps {
  file: FileType;
}

const Cards: React.FC<FileProps> = ({ file }) => {
  return (
    <Link
      href={`http://127.0.0.1:8000/api/patients${file.file}`}
      target={"_blank"}
      className={"file-card"}
    >
      <div className={"flex justify-between"}>
        <img src={"/Wriber.png"} width={60} height={49} />
        <div className={"flex flex-col items-end justify-between"}>
          <ActionsDropdown file={file} />
          <p className={"body-1"}></p>
        </div>
      </div>
      <div className={"file-card-details"}>
        <p className={"subtitle-2 line-clamp-1"}>{file.file}</p>
        <p className={"subtitle-2 line-clamp-1"}>by {file.user}</p>
        uploaded on{" "}
        <FormatedDateTime
          date={file.created}
          className={"body-2 text-white-100"}
        />
      </div>
    </Link>
  );
};

export default Cards;
