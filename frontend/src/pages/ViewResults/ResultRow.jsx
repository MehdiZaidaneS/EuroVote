import React from 'react'
import "./ResultRow.css"

function ResultRow({ index, result }) {


    let backgroundColor;

    if (index === 0) {
        backgroundColor = "gold";
    } else if (index === 1) {
        backgroundColor = "silver";
    } else if (index === 2) {
        backgroundColor = "#CD7F32";
    } else {
        backgroundColor = "white";
    }

    return (
        <div key={result.user} className='result-row' style={{ backgroundColor }}>
            <p>{index + 1}°</p>
            <p>{result.user}</p>
            <p>{result.score}</p>
        </div>
    )
}

export default ResultRow