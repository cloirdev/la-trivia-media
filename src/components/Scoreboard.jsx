import React, { useEffect, useState } from "react";

const Scoreboard = ({ mode }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const filteredScores = storedScores
      .filter((s) => s.mode === mode)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setScores(filteredScores);
  }, [mode]);

  return (
    <div className="mt-6 w-full max-w-md">
      <h3 className="text-2xl font-bold mb-4">
        🏆 Ranking - {mode === "rosco" ? "Rosco" : "Quiz"}
      </h3>
      <ol className="list-decimal list-inside text-left">
        {scores.map((entry, index) => (
          <li key={index} className="mb-1">
            <span className="font-bold">{entry.username}</span> — {entry.score}{" "}
            <span className="text-gray-400 text-sm">({entry.date})</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Scoreboard;
