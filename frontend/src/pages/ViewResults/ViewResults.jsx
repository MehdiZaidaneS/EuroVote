
import { useState } from 'react'
import './ViewResults.css'

function ViewResults() {


  const [generalScore, setGeneralScore] = useState(0)
  const [perfectGuess, setPerfectGuess] = useState(0)
  const [furthestGuess, setFurthestGuess] = useState(0)
  const [closestGuess, setClosestGuess] = useState(0)


  return (
    <div className='view-results-container'>
      <h1>this is working view results</h1>
    </div>
  )
}

export default ViewResults
