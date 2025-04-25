"use client";

import FilesList from "@/components/FilesList";
import React from "react";
import Link from "next/link";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Share = ({ file, setOpenDialog, setEmails, handleRemoveuser }) => {
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
              onChange={(e) => setEmails(e.target.value.trim().split(","))}
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
