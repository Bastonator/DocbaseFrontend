"use client";
import React from "react";

import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import FilesList from "@/components/FilesList";
import Search from "@/components/Search";

export type FileType = {
  file: string;
  user: string;
  created: string;
  id: number;
};

interface documentProps {
  hiddenChild: React.ReactNode;
}

const Page: React.FC<documentProps> = ({ hiddenChild }) => {
  const [files, setfile] = useState<FileType[]>([]);
  const [fetched, setFetched] = useState(false);
  const [invsible, setinvisible] = useState(true);

  const getFiles = async () => {
    const tmpfiles = await apiService.get("/api/patients/files/");
    setfile(tmpfiles.data);
    setFetched(true);
  };

  useEffect(() => {
    if (fetched) return;

    getFiles();
  }, [fetched]);

  if (!Array.isArray(files)) {
    return <p>The file data is not an array</p>;
  }

  {
    <Search result={setfile} />;
  }

  return (
    <>
      <div className={"page-container"}>
        <section className={"w-full"}>
          <h1 className={"h1 capitalize"}>Documents</h1>
        </section>
        <Search result={setfile} />
        {files.map((file) => {
          return <FilesList key={file.file} file={file} />;
        })}
      </div>
    </>
  );
};

export default Page;
