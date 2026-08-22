import React from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext';

function Voting() {

    const { room } = useRoom();
    const {user} = useUser();
    return (
        <div>
            <h2>{room.code}</h2>
            <h3>{user.name}</h3>
        </div>
    )
}

export default Voting