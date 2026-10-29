
import { useEffect, useState } from 'react'
import './ViewResults.css'
import { getParticipatingCountries, getRoom } from '../../api/roomApi'
import { getPointsGivenByUser } from '../../api/pointsApi'
import { compareIndividualResult, compareRoomResult } from "../../api/results"
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import ResultRow from './ResultRow'
import { useNavigate } from 'react-router'
import IndividualResultCard from './IndividualResultCard'

function ViewResults() {

  const [code, setCode] = useState("")
  const { room, setRoom } = useRoom()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [loadingMessage, setLoadingMessage] = useState("");


  const navigate = useNavigate()
  const [roomResults, setRoomResults] = useState({
    individualResults: [],
    perfect: {
      user: [],
      amount: 0
    },
    furthest: {
      user: "None",
      country: "None",
      distance: 0
    },
    guessedWinner: [],
    guessedBottom5: {
      user: [],
      guessedAmount: 0
    },
    guessedLooser: [],
    guessedTop5: {
      user: [],
      guessedAmount: 0
    },
    playersDone: 0
  })

  useEffect(() => {
    if (room) {
      handleCompareRoomResult()
    }
  }, [room])

  const handleCompareRoomResult = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const room_results = await compareRoomResult(room);

      setRoomResults(room_results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleJoinRoom = async () => {
    if (loading) return;

    if (!code.trim()) {
      setError("Please enter a room code!");
      return;
    }

    setLoading(true);

    const messages = [
      "Searching for your Eurovision room...",
      "Verifying your room code...",
      "Connecting you to the Eurovision party...",
      "Almost there! Getting your room ready...",
      "Welcome! Your Eurovision room is ready!"
    ];


    let messageIndex = 0;
    setLoadingMessage(messages[messageIndex]);

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 10000);

    try {
      setError("");
      const room = await getRoom(code.trim().toUpperCase());

      clearInterval(interval)

      setRoom(room);
    } catch (error) {
      console.error(error);
      clearInterval(interval)
      setError("Room not found, try again!");
    } finally {
      setLoading(false);
      clearInterval(interval)
    }
  };




  return (
    <div className='view-results-container'>
      {
        !room &&
        <div className='join-room-container'>
          <h1 className='logo' onClick={() => navigate("/")}>Eurovote</h1>
          <h3>Room code:</h3>
          <div className='code-selection'>
            <input type='text' value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off" name="view-results-room" data-form-type="other"
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
                "Get Results"
              )}
            </button>

            <p className='back-button' onClick={() => navigate("/")}><em>Back</em></p>

          </div>
        </div>
      }
      {
        room &&
        <div className='results-container'>
          <h4 className='code'> Code: <em>{room?.code}</em></h4>

          {loading ? (
            <div className="calculating-results">
              <span className="spinner"></span>
              <h2>Calculating results...</h2>
            </div>
          ) : (
            <>
              <h1 className='logo'>Results</h1>
              {
                roomResults.playersDone == 0 ? (
                  <p>Votes not available, submit your votes first...</p>
                ) :
                  (
                    <div className='results'>
                      <div className='scoreboard'>

                        {
                          roomResults.individualResults
                            .sort((a, b) => b.score - a.score)
                            .map((result, index) => {
                              return (
                                <ResultRow
                                  key={result.user}
                                  index={index}
                                  result={result}
                                />
                              )
                            })
                        }
                      </div>



                      <div className='other-results'>

                        {
                          roomResults.guessedWinner.length > 0 &&
                          <IndividualResultCard
                            icon="🥇"
                            upper={roomResults.guessedWinner.join(" & ")}
                            lower={`guessed the winner performance!`}
                          />

                        }
                        {
                          roomResults.guessedLooser.length > 0 &&
                          <IndividualResultCard
                            icon="😵‍💫"
                            upper={roomResults.guessedLooser.join(" & ")}
                            lower={`guessed the worst performance!`}
                          />
                        }
                        {
                          roomResults.perfect.user != "None" &&
                          <IndividualResultCard
                            icon="⭐"
                            upper={`${roomResults.perfect.user}`}
                            lower={`guessed ${roomResults.perfect.amount} ${roomResults.perfect.amount === 1 ? "position" : "positions"} correct!`}
                          />
                        }

                        {
                          roomResults.guessedTop5.user.length > 0 &&
                          <IndividualResultCard
                            icon="🔝"
                            upper={`${roomResults.guessedTop5.user.join(" & ")}`}
                            lower={`guessed ${roomResults.guessedTop5.guessedAmount} ${roomResults.guessedTop5.guessedAmount === 1 ? "country" : "countries"} from TOP 5`}
                          />
                        }

                        {
                          roomResults.guessedBottom5.user.length > 0 &&
                          <IndividualResultCard
                            icon="💯"
                            upper={`${roomResults.guessedBottom5.user.join(" & ")}`}
                            lower={`guessed ${roomResults.guessedBottom5.guessedAmount} ${roomResults.guessedBottom5.guessedAmount === 1 ? "country" : "countries"} from LAST 5`}
                          />
                        }
                        {
                          roomResults.furthest.user != "None" &&
                          <IndividualResultCard
                            icon="💩"
                            upper={`${roomResults.furthest.user}, had the worst guess`}
                            lower={`${roomResults.furthest.country} was ${roomResults.furthest.distance} positions away`}
                          />
                        }


                      </div>
                    </div>

                  )
              }
            </>
          )}
          <button className="leave-button" onClick={() => { navigate("/"); setRoom(null); }}> Leave Results</button>

        </div>

      }
    </div>
  )
}

export default ViewResults
