"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/components/axios";

import { FileType } from "@/components/FetchDocs";

interface FileProps {
  file: FileType;
}

const Dropdown: React.FC<FileProps> = ({ file }) => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleDeletefile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axiosInstance
      .delete("delete/" + file.id + "/")
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(function () {
        window.location.reload();
      });
  };

  const renderDeleteReportDialogContent = () => {
    return (
      <>
        <DialogContent className={"shad-dialog button"}>
          <DialogHeader className={"flex flex-col gap-3"}>
            <DialogTitle className={"text-center text-red-200"}>
              Delete File?!
            </DialogTitle>
            <DialogDescription>{file.file}</DialogDescription>
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
              onClick={handleDeletefile}
              type={"button"}
              className={"uploader-button text-red"}
            >
              Delete file
            </button>
          </DialogFooter>
        </DialogContent>
      </>
    );
  };

  const renderDeleteCareplanDialogContent = () => {
    return (
      <>
        <DialogContent className={"shad-dialog button"}>
          <DialogHeader className={"flex flex-col gap-3"}>
            <DialogTitle className={"text-center text-red-200"}>
              Delete File?!
            </DialogTitle>
            <DialogDescription>{file.file}</DialogDescription>
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
              onClick={handleDeletefile}
              type={"button"}
              className={"uploader-button text-red"}
            >
              Delete file
            </button>
          </DialogFooter>
        </DialogContent>
      </>
    );
  };

  return (
    <>
      <Dialog open={openDialog === "delete-report"}>
        {renderDeleteReportDialogContent()}
      </Dialog>
      <Dialog open={openDialog === "delete-careplan"}>
        {renderDeleteCareplanDialogContent()}
      </Dialog>
    </>
  );
};

export default Dropdown;
