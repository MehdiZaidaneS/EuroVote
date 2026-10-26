import React, { useEffect, useState } from 'react'
import "./EnterUsername.css"
import { useNavigate } from 'react-router'
import { useRoom } from '../../RoomContext'
import { joinRoom } from '../../api/roomApi'
import { useUser } from '../../UserContext'


function EnterUsername() {

    const navigate = useNavigate()

    const { room, setRoom } = useRoom();
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")

    useEffect(() =>{
        if (room && user) {
            navigate("/voting")
        }
    })

    const handleJoinRoom = async (e) => {
        e.preventDefault()

        if (!username.trim()) {
            setError("Please enter a username!")
            return
        }

        if (loading) return;

        setLoading(true);

        try {

            setError("")
            const playerJoinedRoom = await joinRoom(room.code, username.trim())
            setUser({
                ...playerJoinedRoom,
                submitted: "False"
            })




            navigate("/voting")

        } catch (error) {
            console.error(error);

            if (error.message === "USERNAME_EXISTS") {
                setError("This username already exists!");
            }else if(error.message === "PLAYER_EXISTS"){
                setError("Username already in use!")
            } else if (error.message === "JOIN_ROOM_FAILED") {
                setError("Could not join the room. Please try again.");
            } else {
                setError("Could not create user. Please try again.");
            }
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className="username-page">
            <h4 className='code'> Code: <em>{room?.code}</em></h4>

            <h1 className='logo' onClick={() => { navigate("/"); setRoom(null); }}>Eurovote</h1>
            <h2>Enter username:</h2>

            <div className='username-selection'>
                <form onSubmit={handleJoinRoom}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    {error && <p className="error-message">{error}</p>}


                    <button
                    className="action-button"
                    type='submit'
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                        </>
                    ) : (
                        "Join Room"
                    )}
                </button>
                </form>
            </div>
            <button className="leave-button" onClick={() => { navigate("/"); setRoom(null); }}> Leave Room</button>




        </div>

    )
}

export default EnterUsername