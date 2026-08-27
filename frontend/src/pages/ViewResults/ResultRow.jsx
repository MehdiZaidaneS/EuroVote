import React from 'react'
import "./ResultRow.css"

function ResultRow({index, result }) {
    return (
        <div key={result.user} className='result-row'>
            <p>{index+1}</p>
            <p>{result.user}</p>
            <p>{result.score}</p>
           
        </div>
    )
}

export default ResultRow