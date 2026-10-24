import React, { useEffect, useState } from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { getPointsGivenByUser, updatePointsPosition, updatePointstoCountry } from '../../api/pointsApi'
import "./PreviewPoints.css"
import PreviewCard from './PreviewCard'
import { useNavigate } from 'react-router'
import { getCountryFlag } from '../../api/restCountries'


function PreviewPoints() {

  const { room, setRoom } = useRoom()
  const { user, setUser } = useUser()

  const [pointsGiven, setPointsGiven] = useState([])
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);


  useEffect(() => {

    if (!room || !user) {
      navigate("/");
      return;
    }

    if (user.submitted === "True") {
      navigate("/result")
    }

    setLoading(true);

    handleGetPointsByUser()


  }, [])

  const handleUpdatePoints = async (roomId, userId, pointCountryId, points) => {
    try {
      await updatePointstoCountry(
        roomId,
        userId,
        pointCountryId,
        points
      )


    } catch (error) {
      console.log(error)
    }
  }


  const handleGetPointsByUser = async () => {

    setUpdating(true)

    try {

      const points_obtained = await getPointsGivenByUser(room.id, user.id)

      const resultsWithFlags = await Promise.all(
        points_obtained.map(async (result) => {
          const flag = await getCountryFlag(result.country.country_name)

          return {
            ...result,
            flag
          }
        })
      )

      resultsWithFlags.sort((a, b) => a.position - b.position)


      setPointsGiven(resultsWithFlags);

      return points_obtained

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      setUpdating(false);
    }

  }

  const handleDragStart = (index) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = async (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex || updating) {
      return;
    }

    const newPoints = [...pointsGiven];
    const [draggedCard] = newPoints.splice(draggedIndex, 1);

    const pointsAtDropPosition = newPoints[dropIndex].points;

    draggedCard.points = pointsAtDropPosition;
    newPoints.splice(dropIndex, 0, draggedCard);

    setUpdating(true);

    try {
      await handleUpdatePoints(
        draggedCard.room_id,
        draggedCard.player_id,
        draggedCard.country.id,
        pointsAtDropPosition
      );

      const start = Math.min(draggedIndex, dropIndex);
      const end = Math.max(draggedIndex, dropIndex);

      await Promise.all(
        newPoints.slice(start, end + 1).map((point, index) => {
          const newPosition = start + index + 1;

          return updatePointsPosition(point.id, newPosition);
        })
      );


      setPointsGiven(newPoints);
    } catch (error) {
      console.error("Failed to update votes:", error);
    } finally {
      setUpdating(false);
      setDraggedIndex(null);
    }
  };

  const navigate = useNavigate()

  return (
    <div className='preview-points'>
      <h4 className='code'> Code: <em>{room?.code}</em></h4>
      <h4 className='username'>Welcome, {user?.name}</h4>

      {loading ? (
        <div className="preview-loading">
          <span className="spinner"></span>
          <h2>Loading your votes...</h2>
        </div>
      ) : (
        <>
          {updating && (
            <div className="updating-overlay">
              <div className="updating-message">
                <span className="spinner"></span>
              </div>
            </div>
          )}
          <div className='all-country-points'>
            {pointsGiven.map((point, index) => {
              return (
                <PreviewCard key={point.id} pointsGiven={pointsGiven} point={point} position={index + 1} last={pointsGiven.length} handleGetPointsByUser={handleGetPointsByUser} onDragStart={() => handleDragStart(index)} onDragOver={handleDragOver} onDrop={() => handleDrop(index)} />
              )
            })}
          </div>
          <button className='action-button submit' onClick={() => {
            setUser({ ...user, submitted: "True" });
            navigate("/result");
          }}>Submit</button>
        </>

      )}

      {/* <p className='back-button' onClick={() => navigate("/voting")}><em>Back to country selections...</em></p> */}

      <button className="leave-button" onClick={() => { navigate("/"); setRoom(null); setUser(null) }}> Leave Room</button>
    </div>
  )
}

export default PreviewPoints