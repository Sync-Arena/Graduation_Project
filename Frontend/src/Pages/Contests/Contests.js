import React, { useRef, useState } from "react";
import PastContests from "./PastContests";
import UpcomingContests from "./UpcomingContests";
import CurrentContests from "./CurrentContests";

function Contests() {
  return(
    <div className="text-white">
        <CurrentContests />
        <UpcomingContests />
        <PastContests />
    </div>
  )
}

export default Contests;
