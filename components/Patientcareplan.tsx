"use client";
import Link from "next/link";
import React, { useState } from "react";
import { PlanType } from "@/app/(root)/pages/patient/[id]/page";
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

interface PlanProps {
  plan: PlanType;
}

const Plandata: React.FC<PlanProps> = ({ plan }) => {
  const loggedUser = localStorage.getItem("thatUser");
  const shiftState = localStorage.getItem("shift");
  const { id } = useParams();

  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleDeleteCareplan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axiosInstance
      .delete("delete_careplan/" + plan.id + "/")
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

  const renderDeleteCareplanDialogContent = () => {
    return (
      <>
        <DialogContent className={"shad-dialog button"}>
          <DialogHeader className={"flex flex-col gap-3"}>
            <DialogTitle className={"text-center text-red-200"}>
              Delete Careplan?!
            </DialogTitle>
            <DialogDescription>{plan.id}</DialogDescription>
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
              onClick={handleDeleteCareplan}
              type={"button"}
              className={"uploader-button text-red"}
            >
              Delete Careplan
            </button>
          </DialogFooter>
        </DialogContent>
      </>
    );
  };

  const renderPlanClicks = () => {
    const renderPlanDelete = () => {
      if (loggedUser === "01a12d23-b6b0-45b4-961a-86054e0e4bab")
        return (
          <>
            <p
              onClick={() => setOpenDialog("delete-careplan")}
              className={"mt-5 line-clamp-1"}
            >
              Delete Plan
            </p>
          </>
        );
    };
    if (shiftState === "ON")
      return (
        <>
          <Link href={`/pages/${id}/careplan/`} className={"transition w-2/6"}>
            <button
              className={
                "w-full h-[34px] mt-4 font-bold border rounded-2xl border-black bg-white hover:bg-black hover:text-white transition line-clamp-1"
              }
            >
              Add Care Plan
            </button>
          </Link>
          {renderPlanDelete()}
        </>
      );
  };

  const renderAllPlans = () => {
    return (
      <>
        <div
          className={
            "w-full transition-all h-[64px] px-8 items-center justify-center border-4 border-b-dark-100 rounded  hover:bg-slate-300 mt-6"
          }
          key={plan.id}
        >
          <div className={"w-full flex justify-between "}>
            <Link href={`/pages/${id}/careplan/${plan.id}`} key={plan.id}>
              <p key={plan.id} className={"mt-5 line-clamp-1 font-bold"}>
                Care Plan Info: {plan.id}{" "}
              </p>
            </Link>
            {renderPlanClicks()}
          </div>
        </div>
        <Dialog open={openDialog === "delete-careplan"}>
          {renderDeleteCareplanDialogContent()}
        </Dialog>
      </>
    );
  };

  return <>{renderAllPlans()}</>;
};

export default Plandata;
