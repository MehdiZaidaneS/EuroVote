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
        backgroundColor = "#ffa2e9";
    }

    return (
        <div key={result.user} className='result-row' style={{ backgroundColor }}>
            <p style={{fontSize:"17px"}}>{index + 1}°</p>
            <p style={{fontStyle: "italic", fontSize:"20px"}}>{result.user}</p>
            <p >{result.score}pts</p>
        </div>
    )
}

export default ResultRow