"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShareInput from "@/components/ShareInput";
import axiosInstance from "@/components/axios";
import { FileType } from "@/components/FetchDocs";

interface FileProps {
  file: FileType;
}

const Dropdown: React.FC<FileProps> = ({ file }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [emails, setEmails] = useState([]);

  const handleRemoveuser = () => {};

  const handleDeletefile = (e) => {
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

  const renderDeleteDialogContent = () => {
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

  const renderShareDialogContent = () => {
    return (
      <>
        <ShareInput
          file={file}
          setOpenDialog={setOpenDialog}
          setEmails={setEmails}
          handleRemoveuser={handleRemoveuser}
        />
      </>
    );
  };

  return (
    <>
      <DropdownMenu open={isDropdown} onOpenChange={setIsDropdown}>
        <DropdownMenuTrigger className={"shad-no-focus"}>
          <img src={"/assets/icons/dots.svg"} height={28} width={26} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className={"max-w-[135px] truncate"}>
            {file.file}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setOpenDialog("share")}>
            Share
          </DropdownMenuItem>
          <Link href={file.file}>
            <DropdownMenuItem>Download</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onSelect={() => setOpenDialog("delete")}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openDialog === "delete"}>
        {renderDeleteDialogContent()}
      </Dialog>
      <Dialog open={openDialog === "share"}>
        {renderShareDialogContent()}
      </Dialog>
    </>
  );
};

export default Dropdown;
