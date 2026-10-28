import React from 'react'
import { useNavigate } from 'react-router';

function NotFoundPage() {



  const navigate = useNavigate()

  return (
    <div>
        <h2>Page not found...</h2>
        <p className='back-button' onClick={() => navigate("/")}><em>Back</em></p>
    </div>
  )
}

export default NotFoundPage