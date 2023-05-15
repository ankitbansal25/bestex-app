import React from 'react'
import { RiAccountCircleFill } from 'react-icons/ri'
import User from '../../models/user'
import './Profile.css'

export default function Profile({ user }: ProfileProps) {
    return (
        <div style={{ marginRight: '10px' }}>
            <div className="UserContainer">
                <RiAccountCircleFill size={30} />
                <div>{user.name}</div>
            </div>
        </div>
    )
}

/**
 * @typedef ProfileProps
 */
type ProfileProps = {
    user: User
}
