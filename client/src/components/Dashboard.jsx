import { useState } from "react";
import { useSelector } from "react-redux";
import { data } from "react-router-dom";
import React, { useEffect } from "react";
import Upload from "./Upload";
import Profile from "./Profile";

export default function Dashboard() {
  const user = useSelector((state) => state.user.user);
  console.log("Redux user:", user);
  const [u, setUser] = useState(null);




  return (
    <div>
      <h1 className="text-center bg-amber-400">Welcome To AcadRank,</h1>
      

    </div>
  )
}
