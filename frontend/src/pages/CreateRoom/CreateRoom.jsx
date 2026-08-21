
import { useState } from 'react';
import { createRoom } from "../../api/roomApi";
import './CreateRoom.css'
import { useRoom } from '../../RoomContext';
import { useNavigate } from 'react-router';

function CreateRoom() {

    const [year, setYear] = useState("");
    const {setRoom} = useRoom()
    const navigate = useNavigate()
    
    const handleCreateRoom = async () => {
        try {
            const room = await createRoom(`Eurovision ${year}`);
            setRoom(room);
            
            navigate("/enter-username")
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className='create-room-container'>
            <h1>Select Eurovision Year</h1>
            <div className='eurovision-selection'>
                <select name="eurovisions" id="eurovisions"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    size="3">
                        
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                </select>
                <button onClick={handleCreateRoom}>Create Room</button>
            </div>

        </div>
    )
}

export default CreateRoom
