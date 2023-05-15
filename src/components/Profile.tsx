import React from "react";
import { RiAccountCircleFill} from "react-icons/ri";
import User from "../models/user";

export default function ProfileDropdown({user}: ProfileDropdownProps) {
  return (
    <div style={{marginRight: '10px'}}>
      <div style={{display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
    <RiAccountCircleFill size={30} />
    <div>{user.name}</div>
     </div>
    </div>
  )
}

// define type of props
type ProfileDropdownProps = {
    user: User
}