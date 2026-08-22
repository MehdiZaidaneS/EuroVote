import React, { useState } from 'react'
import "./EnterUsername.css"
import { useNavigate } from 'react-router'
import { useRoom } from '../../RoomContext'
import { joinRoom } from '../../api/roomApi'
import { useUser } from '../../UserContext'


function EnterUsername() {

    const navigate = useNavigate()

    const { room } = useRoom();
    const { setUser } = useUser();
    const [username, setUsername] = useState("")

    const handleJoinRoom = async () => {
        try {
            const playerJoinedRoom = await joinRoom(room.code, username)
            setUser(playerJoinedRoom)

            navigate("/voting")

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>
                <h1>Enter Username</h1>
                <h4> Code: {room.code}</h4>
                <div className='username-selection'>
                    <input type='textarea' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <button onClick={handleJoinRoom}>Enter username</button>
                </div>
                <button onClick={() => navigate("/")}>Leave room</button>

            </div>


        </div>

    )
}

export default EnterUsername