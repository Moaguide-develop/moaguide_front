import React from "react";
import Navbar from "../common/Navbar";
import Guide from "./Guide";
import RealtimeRank from "./RealtimeRank";

const HomeIndex = () => {
  return (
    <div>
      <section className="max-w-[1000px] mx-auto flex items-center desk:min-w-[400px] gap-[28px] mt-[29px]">
        <Guide />
        <RealtimeRank />
      </section>
    </div>
  );
};

export default HomeIndex;
