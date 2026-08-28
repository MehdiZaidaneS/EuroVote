
import { useState } from 'react';
import { createRoom } from "../../api/roomApi";
import './CreateRoom.css'
import { useRoom } from '../../RoomContext';
import { useNavigate } from 'react-router';

function CreateRoom() {

    const [selectedYear, setSelectedYear] = useState("2026");
    const {setRoom} = useRoom();
    const navigate = useNavigate();
    


    const handleCreateRoom = async () => {
        try {
            const room = await createRoom(selectedYear);
            setRoom(room);
            
            navigate("/enter-username")
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className='create-room-container'>
            <h1 className='logo' onClick={()=> navigate("/")}>Eurovote</h1>
            <h2>Select a year:</h2> 
            <div className='eurovision-selection'>
                <select name="eurovisions" id="eurovisions"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value) } size="3">
                        
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    
                </select>
                <button className='action-button' onClick={handleCreateRoom}>Create Room</button>   
            </div>

        </div>
    )
}

export default CreateRoom
