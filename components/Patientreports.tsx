"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ReportType } from "@/app/(root)/page";
import { useParams } from "next/navigation";
import axiosInstance from "@/components/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReportProps {
  report: ReportType;
}

const Reportdata: React.FC<ReportProps> = ({ report }) => {
  const loggedUser = localStorage.getItem("thatUser");
  const shiftState = localStorage.getItem("shift");
  const { id } = useParams();

  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleDeletereport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axiosInstance
      .delete("delete_report/" + report.id + "/")
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
              Delete Report?!
            </DialogTitle>
            <DialogDescription>{report.id}</DialogDescription>
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
              onClick={handleDeletereport}
              type={"button"}
              className={"uploader-button text-red"}
            >
              Delete Report
            </button>
          </DialogFooter>
        </DialogContent>
      </>
    );
  };

  const renderClicks = () => {
    const renderDelete = () => {
      if (loggedUser === "01a12d23-b6b0-45b4-961a-86054e0e4bab")
        return (
          <>
            <p
              onClick={() => setOpenDialog("delete-report")}
              className={"mt-5 line-clamp-1"}
            >
              Delete Report
            </p>
          </>
        );
    };

    if (shiftState === "ON")
      return (
        <>
          <Link href={`/pages/${id}/reports/`} className={"transition w-2/6"}>
            <button
              className={
                "w-full h-[34px] mt-4 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
              }
            >
              Add Report
            </button>
          </Link>
          {renderDelete()}
        </>
      );
  };

  const renderAllreports = () => {
    return (
      <>
        <div
          className={
            "w-full transition-all h-[64px] px-8 items-center justify-center border-4 rounded border-b-dark-200  hover:bg-slate-300 mt-6"
          }
          key={report.id}
        >
          <div className={"w-full flex justify-between "}>
            <Link href={`/pages/${id}/reports/${report.id}`} key={report.id}>
              <p key={report.id} className={"mt-5 line-clamp-1 font-bold"}>
                Report Info: {report.id}{" "}
              </p>
            </Link>
            {renderClicks()}
          </div>
        </div>
        <Dialog open={openDialog === "delete-report"}>
          {renderDeleteReportDialogContent()}
        </Dialog>
      </>
    );
  };

  return <>{renderAllreports()}</>;
};

export default Reportdata;
