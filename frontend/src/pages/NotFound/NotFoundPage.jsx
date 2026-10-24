import React from 'react'
import { useNavigate } from 'react-router';

function NotFoundPage() {



  const navigate = useNavigate()

  return (
    <div>
        <h2>Page not found...</h2>
        <button className="leave-button" onClick={() => { navigate("/");}}> Back</button>
    </div>
  )
}

export default NotFoundPage