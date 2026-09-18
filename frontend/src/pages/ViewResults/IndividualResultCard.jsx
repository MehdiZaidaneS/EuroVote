import React from "react"
import "./IndividualResultCard.css"

function IndividualResultCard({ icon, upper, lower }) {
    return (
        <div className="individualCard-container">

            <div className="individualCard-icon">
                {icon}
            </div>

            <div className="individualCard-content">
                <h2>{upper}</h2>
                <p>{lower}</p>
            </div>

        </div>
    )
}

export default IndividualResultCard