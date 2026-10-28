
import { useState } from 'react';
import { createRoom } from "../../api/roomApi";
import './CreateRoom.css'
import { useRoom } from '../../RoomContext';
import { useNavigate } from 'react-router';

function CreateRoom() {

    const [selectedYear, setSelectedYear] = useState("2026");
    const [loading, setLoading] = useState(false)
    const { setRoom } = useRoom();
    const navigate = useNavigate();
    const [loadingMessage, setLoadingMessage] = useState("");



    const handleCreateRoom = async () => {
        if (loading) return;

        setLoading(true);


        const messages = [
            "",
            "This might take a little while. Please wait...",
            `Fetching ${selectedYear} contestants...`,
            "Creating your Eurovision room..."
        ];

        let messageIndex = 0;
        setLoadingMessage(messages[messageIndex]);

        const interval = setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            setLoadingMessage(messages[messageIndex]);
        }, 5000);

        try {
            const room = await createRoom(selectedYear);
            setRoom(room);

            clearInterval(interval);

            navigate("/enter-username");
        } catch (error) {
            console.error(error);
            clearInterval(interval);
            setLoadingMessage("Something went wrong. Please try again.");

        } finally {
            clearInterval(interval);
            setLoading(false);
        }
    };





    return (
        <div className='create-room-container'>
            <h1 className='logo' onClick={() => navigate("/")}>Eurovote</h1>
            <h3>Select a year:</h3>
            <div className='eurovision-selection'>
                <select name="eurovisions" id="eurovisions"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)} size="3"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleCreateRoom()
                        }
                    }}>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                </select>


                {
                    loading &&
                    <p>{loadingMessage}</p>
                }

                <button
                    className="action-button"
                    onClick={handleCreateRoom}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                        </>
                    ) : (
                        "Create Room"
                    )}
                </button>

                <p className='back-button' onClick={() => navigate("/")}><em>Back</em></p>
            </div>

        </div>
    )
}

export default CreateRoom
