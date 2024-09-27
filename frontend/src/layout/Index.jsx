import React from "react";
import SideMenu from "../components/layout/SideMenu";
import MainContainer from "../components/layout/MainContainer";

const Index = () => {
  return (
    <div className=" w-full flex items-stretch">
      <div className="w-full min-h-[100vh] flex flex-grow flex-shrink basis-auto items-stretch ">
        <SideMenu />
        <MainContainer />
      </div>
    </div>
  );
};

export default Index;
