import React from 'react'
import "./EnterUsername.css"
import { useNavigate } from 'react-router'
import { useRoom } from '../../RoomContext'


function EnterUsername() {

    const navigate = useNavigate()

    const {room} = useRoom();

    return (
        <div>
            <div>
                <h1>Enter Username</h1>
                <h4> Code: {room.code}</h4> 
                <div className='username-selection'>
                    <input type='textarea'></input>
                    <button>Enter username</button>
                </div>
                <button onClick={() => navigate("/")}>Leave room</button>

            </div>
          

        </div>

    )
}

export default EnterUsername