import React, { useState, useEffect } from "react";
import LoginScreen from "./components/LoginScreen.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Quiz from "./components/Quiz.jsx";
import Rosco from "./components/Rosco.jsx";
import ResultsScreen from "./components/ResultsScreen.jsx";
import LandingPage from "./components/LandingPage.jsx"; // Importa el nuevo componente
import originalQuizData from "./data/questions.json";
import "./App.css";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("quizUser") || null);
  const [gameState, setGameState] = useState("start");
  const [gameMode, setGameMode] = useState(null);
  const [shuffledQuizData, setShuffledQuizData] = useState([]);
  const [score, setScore] = useState(0);

  // Nuevo estado para controlar la visualización de la landing page
  const [showLanding, setShowLanding] = useState(true);

  // Usar import.meta.env.BASE_URL para compatibilidad con GitHub Pages
  const BASE_URL = import.meta.env.BASE_URL || '/';
  const backgroundImages = [
    `${BASE_URL}images/bg1.jpg`,
    `${BASE_URL}images/bg2.jpg`,
    `${BASE_URL}images/bg3.jpg`,
    `${BASE_URL}images/bg4.jpg`,
  ];

  const [currentBg, setCurrentBg] = useState(0);
  useEffect(() => {
    if (!showLanding) {
      const interval = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [showLanding, backgroundImages.length]);

  const startQuiz = () => {
    const shuffled = shuffleArray(originalQuizData).slice(0, 10);
    setShuffledQuizData(shuffled);
    setScore(0);
    setGameState("playing");
  };

  const saveScore = (username, score, mode) => {
    let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const newScore = {
      username,
      score,
      date: new Date().toLocaleString(),
      mode,
    };
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    localStorage.setItem("quizScores", JSON.stringify(scores));
  };

  const endQuiz = (finalScore, mode = gameMode) => {
    setScore(finalScore);
    saveScore(user, finalScore, mode);
    setGameState("results");
  };

  const restartQuiz = () => {
    setGameState("start");
    setGameMode(null);
  };

  const renderStartScreen = () => (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-xl mb-4">Selecciona un modo de juego</h2>
      <button
        onClick={() => {
          setGameMode("quiz");
          startQuiz();
        }}
        className="bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Modo Quiz
      </button>
      <button
        onClick={() => {
          setGameMode("rosco");
          setGameState("playing");
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Modo Rosco
      </button>
    </div>
  );

  const renderScreen = () => {
    if (!user) return <LoginScreen onLogin={(u) => setUser(u)} />;
    if (gameState === "start") return renderStartScreen();
    if (gameState === "playing") {
      if (gameMode === "quiz") {
        return <Quiz shuffledQuizData={shuffledQuizData} onEndQuiz={endQuiz} />;
      } else if (gameMode === "rosco") {
        return <Rosco user={user} onEndQuiz={endQuiz} />;
      }
    }
    if (gameState === "results") {
      return (
        <ResultsScreen
          score={score}
          totalQuestions={
            gameMode === "quiz" ? shuffledQuizData.length : undefined
          }
          user={user}
          onRestartQuiz={restartQuiz}
          mode={gameMode}
        />
      );
    }
    return null;
  };

  // Lógica principal para mostrar la landing page o la aplicación
  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {backgroundImages.map((bg, index) => (
        <div
          key={index}
          className={`absolute w-full h-full bg-cover bg-center transition-opacity-slow ${
            index === currentBg ? "bg-zoom opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 ">
        <div className="container mx-auto p-8 rounded-lg shadow-xl text-center border border-gray-700 bg-lime-900/50 backdrop-blur-xs">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Quiz de la Tierra Media
          </h1>
          {renderScreen()}
        </div>
      </div>
    </div>
  );
};

export default App;
