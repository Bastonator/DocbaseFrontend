import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { getUserId } from "../lib/actions";
import { getAccessToken } from "../lib/actions";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userId = await getUserId();
  console.log(userId);
  const Token = await getAccessToken();
  console.log(Token);

  return (
    <main className="flex h-screen">
      <Sidebar userId={userId}></Sidebar>
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation userId={userId} Token={Token} />{" "}
        <Header Token={Token} />
        <div className="remove-scrollbar no-scrollbar h-full flex-1 overflow-auto bg-light-400 px-5 py-7 sm:mr-7 sm:rounded-[30px] md:mb-7 md:px-9 md:py-10">
          {children}
        </div>
      </section>
    </main>
  );
};

export default Layout;
