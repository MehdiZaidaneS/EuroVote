
import './JoinRoom.css'
import { getRoom } from '../../api/roomApi'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useRoom } from '../../RoomContext'

function JoinRoom() {

  const [code, setCode] = useState("")
  const { setRoom } = useRoom()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [loadingMessage, setLoadingMessage] = useState("");



  const handleJoinRoom = async () => {
    if (loading) return;

    if (!code.trim()) {
      setError("Please enter a room code!");
      return;
    }

    setLoading(true);
    setError("");

    const messages = [
      "Searching for your Eurovision room...",
      "Checking your room code...",
      "Connecting you to the Eurovision party...",
      "Almost there! Getting your room ready...",
      "Preparing your Eurovision experience..."
    ];

    let messageIndex = 0;

    setLoadingMessage(messages[messageIndex]);

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 10000);

    try {
      const room = await getRoom(code.trim().toUpperCase());

      setRoom(room);

      navigate("/enter-username");

    } catch (error) {
      console.error(error);

      setError("Room not found. Please check the code and try again!");

    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };



  return (
    <div className='join-room-container'>
      <h1 className='logo' onClick={() => navigate("/")}>Eurovote</h1>
      <h3>Enter room code:</h3>
      <div className='code-selection'>
        <input type='text' value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off" name="join-room-code" data-form-type="other"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleJoinRoom()
            }
          }}></input>
        {error && <p className="error-message">{error}</p>}

        {
          loading && loadingMessage != "" &&
          <p className='loadingMsg'>{loadingMessage}</p>
        }



        <button
          className="action-button"
          onClick={handleJoinRoom}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
            </>
          ) : (
            "Enter code"
          )}
        </button>

        <p className='back-button' onClick={() => navigate("/")}><em>Back</em></p>
      </div>
    </div>
  )
}

export default JoinRoom
