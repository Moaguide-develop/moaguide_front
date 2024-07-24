"use client";
import { useNavStore } from "@/store/nav.store";
import React from "react";

const Navbar = () => {
  const { currentNav, setCurrentNav } = useNavStore();
  return (
    <div className="shadow-custom-light border-b border-gray100">
      <div className="max-w-[1000px] mx-auto flex items-center ">
        <div
          onClick={() => setCurrentNav("home")}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${currentNav === "home" ? " text-black border-b-[2px] border-black" : "text-gray300"}
        `}
        >
          홈
        </div>
        <div
          onClick={() => setCurrentNav("new_issue")}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${currentNav === "new_issue" ? " text-black border-b-[2px] border-black" : "text-gray300"}
        `}
        >
          최신이슈
        </div>
        <div
          onClick={() => setCurrentNav("item")}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${currentNav === "item" ? " text-black border-b-[2px] border-black" : "text-gray300"}
        `}
        >
          조각투자 상품
        </div>
        <div
          onClick={() => setCurrentNav("report")}
          className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${currentNav === "report" ? " text-black border-b-[2px] border-black" : "text-gray300"}
        `}
        >
          리포트
        </div>
      </div>
    </div>
  );
};

export default Navbar;
