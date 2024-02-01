import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function Contests() {
  return(
    <div className="text-white">
        <p>
            <NavLink to="1">contest 1</NavLink>
        </p>
        <p>
            <NavLink to="2">contest 2</NavLink>
        </p>
        <p>
            <NavLink to="3">contest 3</NavLink>
        </p>


    </div>
  )
}

export default Contests;
