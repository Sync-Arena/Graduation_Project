import React, { useRef, useState } from "react";
import PastContests from "./PastContests";
import UpcomingContests from "./UpcomingContests";

function Contests() {
  return(
    <div className="text-white">
        <UpcomingContests />
        <PastContests />
    </div>
  )
}

export default Contests;
