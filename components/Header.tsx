"use client";
import React from "react";
import FileUpload from "@/components/FileUpload";
import { resetAuthCookies } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

type FileUploadProps = {
  Token: string;
};

const Header: React.FC<FileUploadProps> = ({ Token }) => {
  const router = useRouter();

  const submitLogout = async () => {
    resetAuthCookies();
    localStorage.removeItem("token");

    router.push("/LogIn");
  };

  return (
    <header className="header">
      <div className="header-wrapper">
        <FileUpload Token={Token} />
        <button
          type={"submit"}
          className={"sign-out-button"}
          onClick={submitLogout}
        >
          <img
            src={"/assets/icons/logout.svg"}
            alt={"logo"}
            width={24}
            height={24}
            className={"w-6"}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
