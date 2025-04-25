"use client";
import Link from "next/link";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

interface SidebarProps {
  userId?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userId }) => {
  const pathname = usePathname();

  const shiftState = localStorage.getItem("shift");

  if (shiftState === "ON")
    return (
      <>
        <aside
          className={
            "no-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px]"
          }
        >
          <Link href={"/"}>
            <img
              src={"/Passion.jpg"}
              alt={"Pic"}
              width={160}
              height={50}
              className={"hidden h-auto lg:block"}
            />

            <img
              src={"/Passion.jpg"}
              alt={"alternative"}
              width={52}
              height={52}
              className={"lg:hidden"}
            />
          </Link>
          <nav className={"sidebar-nav"}>
            <ul className={"flex flex-1 flex-col gap-6"}>
              {navItems.map((item) => (
                <Link key={item.name} href={item.url} className={"lg:w-full"}>
                  <li
                    className={cn(
                      "sidebar-nav-item",
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
                    <p className={"hidden lg:block"}>{item.name}</p>
                  </li>
                </Link>
              ))}
              <button
                onClick={() => {
                  localStorage.setItem("shift", "OFF");
                  window.location.reload();
                }}
                className={
                  "lg:w-full mt-3 border-b-brand rounded-full bg-white text-dark-100 hover:bg-brand hover:text-white transition"
                }
              >
                <li className={cn("sidebar-nav-item")}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt={"Logo"}
                    width={24}
                    height={24}
                    className={cn("nav-icon")}
                  />
                  <p className={"hidden lg:block"}>End Shift</p>
                </li>
              </button>
            </ul>
          </nav>

          <img
            src={"/Passion.jpg"}
            alt={"logo"}
            height={418}
            width={506}
            className={"w-full"}
          />
          <div className={"sidebar-user-info"}>
            <img
              src={"/next.svg"}
              alt={"photo"}
              width={44}
              height={44}
              className={"sidebar-user-avatar"}
            />
            <div className={"hidden lg:block"}>
              <p className={"subtitle-2 capitalize"}>{userId}</p>
            </div>
          </div>
        </aside>
      </>
    );

  return (
    <>
      <aside
        className={
          "no-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px]"
        }
      >
        <Link href={"/"}>
          <img
            src={"/Passion.jpg"}
            alt={"Pic"}
            width={160}
            height={50}
            className={"hidden h-auto lg:block"}
          />

          <img
            src={"Passion.jpg"}
            alt={"alternative"}
            width={52}
            height={52}
            className={"lg:hidden"}
          />
        </Link>
        <nav className={"sidebar-nav"}>
          <ul className={"flex flex-1 flex-col gap-6"}>
            {navItems.map((item) => (
              <Link key={item.name} href={item.url} className={"lg:w-full"}>
                <li
                  className={cn(
                    "sidebar-nav-item",
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
                  <p className={"hidden lg:block"}>{item.name}</p>
                </li>
              </Link>
            ))}
            <button
              onClick={() => {
                localStorage.setItem("shift", "ON");
                window.location.reload();
              }}
              className={
                "lg:w-full mt-3 border-b-brand rounded-full bg-white text-dark-100 hover:bg-brand hover:text-white transition"
              }
            >
              <li className={cn("sidebar-nav-item")}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt={"Logo"}
                  width={24}
                  height={24}
                  className={cn("nav-icon")}
                />
                <p className={"hidden lg:block"}>Start Shift</p>
              </li>
            </button>
          </ul>
        </nav>

        <img
          src={"/Passion.jpg"}
          alt={"logo"}
          height={418}
          width={506}
          className={"w-full"}
        />
        <div className={"sidebar-user-info"}>
          <img
            src={"/next.svg"}
            alt={"photo"}
            width={44}
            height={44}
            className={"sidebar-user-avatar"}
          />
          <div className={"hidden lg:block"}>
            <p className={"subtitle-2 capitalize"}>{userId}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
