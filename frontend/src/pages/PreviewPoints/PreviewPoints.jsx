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
    }

  }

  const handleDragStart = (index) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleSubmit = async () => {
    setUpdating(true);

    try {
      await Promise.all(
        pointsGiven.map(async (point, index) => {
          await handleUpdatePoints(
            room.id,
            user.id,
            point.country.id,
            point.points
          );

          await updatePointsPosition(point.id, index + 1);
        })
      );

      setUser({ ...user, submitted: "True" });
      navigate("/result")
    } catch (error) {
      console.error("Failed to update votes:", error);
    } finally {
      setUpdating(false);
      setDraggedIndex(null);
    }
  };

  const handleDrop = async (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex || updating) {
      return;
    }

    const newPoints = [...pointsGiven];
    const [draggedCard] = newPoints.splice(draggedIndex, 1);

    const pointsAtDropPosition = newPoints[dropIndex].points;

    draggedCard.points = pointsAtDropPosition;
    draggedCard.position = newPoints[dropIndex].position

    newPoints.splice(dropIndex, 0, draggedCard);

    setPointsGiven(newPoints)
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
          <h3 className='back-button'>Move or edit your votes before submitting...</h3>
          {updating && (
            <div className="updating-overlay">
              <div className="updating-message">
                <span className="spinner"></span>
                <h2>Calculating your results...</h2>

              </div>
            </div>
          )}
          <div className='all-country-points'>
            {pointsGiven.map((point, index) => {
              return (
                <PreviewCard key={point.id} pointsGiven={pointsGiven} index={index} setPointsGiven={setPointsGiven} point={point} position={index + 1} last={pointsGiven.length} handleGetPointsByUser={handleGetPointsByUser} onDragStart={() => handleDragStart(index)} onDragOver={handleDragOver} onDrop={() => handleDrop(index)} setUpdating={setUpdating} />
              )
            })}
          </div>
          <button className='action-button submit' onClick={() => { handleSubmit() }}>Submit</button>
        </>

      )}

      {/* <p className='back-button' onClick={() => navigate("/voting")}><em>Back to country selections...</em></p> */}

      <button className="leave-button" onClick={() => { navigate("/"); setRoom(null); setUser(null) }}> Leave Room</button>
    </div>
  )
}

export default PreviewPoints