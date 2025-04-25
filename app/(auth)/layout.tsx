import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"flex min-h-screen"}>
      <section className="bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <img
            src="/Passion.jpg"
            alt="Wriber Logo"
            width={124}
            height={80}
            className="h-auto"
          />
          <div className="space-y-5 text-white">
            <h1 className="h1">We care</h1>
            <p className="body-1">We are servants, lets serve you!</p>
          </div>
          <img
            src="/Passion.jpg"
            alt="Logo"
            width={342}
            height={342}
            className="transition-all hover:rotate-12 hover:scale-150"
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <img
            src="/Wriber.png"
            alt="logo"
            width={224}
            height={80}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
