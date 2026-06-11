import React from 'react';

const PredictionCard = ({ prediction }) => {
    return (
        <div className="prediction-card">
            <h3>Health Prediction</h3>
            <p>{prediction ? prediction : "No prediction available."}</p>
        </div>
    );
};

export default PredictionCard;