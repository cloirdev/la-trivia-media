import React from "react";
import "../App.css";

const LandingPage = ({ onStart }) => {
  const ringText =
    "Un Anillo para gobernarlos a todos. Un Anillo para encontrarlos. Un Anillo para atraerlos a todos y atarlos en las tinieblas".split(
      ""
    );

  return (
    <div className="landing-container">
      <div className="background-overlay"></div>
      <div className="content">
        <h1 className="main-title">La Trivia Media</h1>

        <div className="ring-wrapper">
          <div className="ring-band"></div>
          <p className="ring-text">
            {ringText.map((char, index) => (
              <span
                key={index}
                style={{
                  "--char-rotation": `${index * (360 / ringText.length)}deg`,
                }}
              >
                {char}
              </span>
            ))}
          </p>
          <button onClick={onStart} className="cta-button">
            Comenzar el Desafío
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
