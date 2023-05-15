import React from "react";
import ProfileDropdown from "./Profile";
import { MockUser } from "../mock/data";

export default function Heading() {
  return (
    <div style={{ background: 'lightgray', display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
    <h3 style={{flex: 1, 
    display: 'flex', 
    justifyContent: "center", 
    transform: 'translateX(50px)'}}>
        Fx Trading
        </h3>
    <ProfileDropdown user={MockUser}/>
    </div>
  )
}