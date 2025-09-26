import React from "react";

const StartScreen = ({ onStartQuiz }) => {
  return (
    <div id="start-screen" className="flex flex-col items-center">
      <p className="text-lg mb-4 text-center">
        ¿Estás preparado para demostrar tu sabiduría sobre el legendario mundo
        de J.R.R. Tolkien?
      </p>
      <button
        onClick={onStartQuiz}
        className="bg-yellow-600 text-white font-bold py-3 px-6 rounded-full hover:bg-yellow-700"
      >
        Comenzar el Quiz
      </button>
    </div>
  );
};

export default StartScreen;
