"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUpload from "@/components/FileUpload";
import { resetAuthCookies } from "@/app/lib/actions";

const MobileNavigation = ({ userId, Token }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const submitLogout = async () => {
    resetAuthCookies();
    localStorage.removeItem("token");

    router.push("/LogIn");
  };

  const shiftState = localStorage.getItem("shift");

  if (shiftState === "ON")
    return (
      <header className={"mobile-header"}>
        <img
          src={"/Passion.jpg"}
          alt={"logo"}
          width={120}
          height={68}
          className={"h-auto"}
        />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <img
              src={"/assets/icons/menu.svg"}
              alt={"Search"}
              width={30}
              height={30}
            />
          </SheetTrigger>
          <SheetContent className={"shad-sheet h-screen px-3"}>
            <SheetTitle>
              <div className={"header-user"}>
                <img
                  src={"/next.svg"}
                  alt={"profile"}
                  width={44}
                  height={44}
                  className={"header-user-avatar"}
                />
                <div className={"sm:hidden lg:block"}>
                  <p className={"subtitle-2 capitalize"}>{userId}</p>
                </div>
              </div>
              <Separator className={"mb-4 bg-light-200/20"} />
            </SheetTitle>
            <nav className={"mobile-nav"}>
              <ul className={"mobile-nav-list"}>
                {navItems.map((item) => (
                  <Link key={item.name} href={item.url} className={"lg:w-full"}>
                    <li
                      className={cn(
                        "mobile-nav-item",
                        pathname === item.url && "shad-active",
                      )}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        className={cn(
                          "nav-icon",
                          pathname === item.url && "nav-icon-active",
                        )}
                      />
                      <p>{item.name}</p>
                    </li>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    localStorage.setItem("shift", "OFF");
                    window.location.reload();
                  }}
                  className={"lg:w-full"}
                >
                  <li className={cn("mobile-nav-item")}>
                    <img
                      src={"/assets/icons/edit.svg"}
                      alt={"Logo"}
                      width={24}
                      height={24}
                      className={cn("nav-icon")}
                    />
                    <p>Start Shift</p>
                  </li>
                </button>
              </ul>
            </nav>
            <Separator className={"my-5 bg-light-200/20"} />
            <div className={"flex flex-col justify-between gap-5 pb-5"}>
              <FileUpload Token={Token} />
              <button
                type={"submit"}
                className={"mobile-sign-out-button"}
                onClick={submitLogout}
              >
                <img
                  src={"/assets/icons/logout.svg"}
                  alt={"logo"}
                  width={24}
                  height={24}
                />
                <p>Logout</p>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    );

  return (
    <header className={"mobile-header"}>
      <img
        src={"/Passion.jpg"}
        alt={"logo"}
        width={120}
        height={68}
        className={"h-auto"}
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <img
            src={"/assets/icons/menu.svg"}
            alt={"Search"}
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className={"shad-sheet h-screen px-3"}>
          <SheetTitle>
            <div className={"header-user"}>
              <img
                src={"/next.svg"}
                alt={"profile"}
                width={44}
                height={44}
                className={"header-user-avatar"}
              />
              <div className={"sm:hidden lg:block"}>
                <p className={"subtitle-2 capitalize"}>{userId}</p>
              </div>
            </div>
            <Separator className={"mb-4 bg-light-200/20"} />
          </SheetTitle>
          <nav className={"mobile-nav"}>
            <ul className={"mobile-nav-list"}>
              {navItems.map((item) => (
                <Link key={item.name} href={item.url} className={"lg:w-full"}>
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === item.url && "shad-active",
                    )}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === item.url && "nav-icon-active",
                      )}
                    />
                    <p>{item.name}</p>
                  </li>
                </Link>
              ))}
              <button
                onClick={() => {
                  localStorage.setItem("shift", "ON");
                  window.location.reload();
                }}
                className={"lg:w-full"}
              >
                <li className={cn("mobile-nav-item")}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt={"Logo"}
                    width={24}
                    height={24}
                    className={cn("nav-icon")}
                  />
                  <p>Start Shift</p>
                </li>
              </button>
            </ul>
          </nav>
          <Separator className={"my-5 bg-light-200/20"} />
          <div className={"flex flex-col justify-between gap-5 pb-5"}>
            <FileUpload Token={Token} />
            <button
              type={"submit"}
              className={"mobile-sign-out-button"}
              onClick={submitLogout}
            >
              <img
                src={"/assets/icons/logout.svg"}
                alt={"logo"}
                width={24}
                height={24}
              />
              <p>Logout</p>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
