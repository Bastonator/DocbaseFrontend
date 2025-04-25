"use client";

import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileType } from "@/components/FetchDocs";

interface FileProps {
  file: FileType;
  setOpenDialog: React.Dispatch<React.SetStateAction<string | null>>;
  handleRemoveuser: () => void;
}
const Share: React.FC<FileProps> = ({ file, setOpenDialog }) => {
  return (
    <>
      <DialogContent className={"shad-dialog button"}>
        <DialogHeader className={"flex flex-col gap-3"}>
          <DialogTitle className={"text-center text-red-200"}>
            Share File
          </DialogTitle>
          <DialogDescription>{file.file}</DialogDescription>
          <div className={"share-wrapper"}>
            <p className={"subtitle-2 pl-1 text-light-100"}>Share file with?</p>
            <input
              type={"email"}
              placeholder={"enter recipient email"}
              className={"share-input-field"}
            />
          </div>
        </DialogHeader>
        <DialogFooter className={"flex flex-col gap-3 md:flex-row"}>
          <button
            onClick={() => setOpenDialog("")}
            type={"button"}
            className={
              "uploader-button text-white border-black border-dashed font-medium"
            }
          >
            Cancel action
          </button>
          <button
            type={"button"}
            className={"uploader-button text-emerald-500"}
          >
            Share file
          </button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default Share;
