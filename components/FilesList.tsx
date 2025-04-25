import React from "react";
import Card from "./Card";
import { FileType } from "@/components/FetchDocs";

interface FileProps {
  file: FileType;
}

const FileListItem: React.FC<FileProps> = ({ file }) => {
  return (
    <>
      <section className={"file-list flex"}>
        <Card file={file} />
      </section>
    </>
  );
};

export default FileListItem;
