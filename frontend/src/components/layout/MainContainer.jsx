import React from "react";
import Header from "./Header";
import Dashboard from "../../router/dashboard/Dashboard";

const MainContainer = () => {
  return (
    <div className="flex flex-col w-0 min-w-0 max-w-full flex-1 items-stretch p-0 min-h-[1px]">
      <Header />
      <div className="flex items-stretch flex-grow flex-shrink basis-auto flex-col justify-between  lg:p-5 p-4">
        <div className="min-h-[1px] !flex-grow block">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
