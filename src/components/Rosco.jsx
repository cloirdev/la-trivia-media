import React, { useState, useEffect } from "react";
import questionsRosco from "../data/rosco.json";

const Rosco = ({ user, onEndQuiz }) => {
  const letters = Object.keys(questionsRosco);

  const [roscoQuestions, setRoscoQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const randomQuestions = letters.map((letter) => {
      const options = questionsRosco[letter];
      const randomIndex = Math.floor(Math.random() * options.length);
      return { letter, ...options[randomIndex] };
    });

    const initialAnswers = {};
    letters.forEach((l) => (initialAnswers[l] = "pending"));

    setRoscoQuestions(randomQuestions);
    setAnswers(initialAnswers);
  }, []);

  const currentQuestion = roscoQuestions[currentIndex];

  const nextQuestion = () => {
    let next = currentIndex + 1;

    while (
      next < roscoQuestions.length &&
      answers[roscoQuestions[next].letter] !== "pending" &&
      answers[roscoQuestions[next].letter] !== "pass"
    ) {
      next++;
    }

    if (next >= roscoQuestions.length) {
      const remaining = roscoQuestions.filter(
        (q) => answers[q.letter] === "pass"
      );

      if (remaining.length > 0) {
        const firstPassIndex = roscoQuestions.findIndex(
          (q) => answers[q.letter] === "pass"
        );
        setCurrentIndex(firstPassIndex);
      } else {
        finishRosco();
      }
    } else {
      setCurrentIndex(next);
    }
  };

  const handleAnswer = () => {
    if (!currentQuestion) return;

    const isCorrect = currentQuestion.answer.some(
      (ans) => ans.toLowerCase() === userInput.trim().toLowerCase()
    );

    if (isCorrect) {
      setAnswers({
        ...answers,
        [currentQuestion.letter]: "correct",
      });
      setScore(score + 1);
      setFeedback(null);
      setUserInput("");
      nextQuestion();
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.letter]: "wrong",
      });
      setFeedback(
        `❌ Respuesta incorrecta. La correcta era: ${currentQuestion.answer[0]}`
      );
      setUserInput("");
      setTimeout(() => {
        setFeedback(null);
        nextQuestion();
      }, 2000);
    }
  };

  const handlePass = () => {
    if (!currentQuestion) return;

    setAnswers({
      ...answers,
      [currentQuestion.letter]: "pass",
    });

    setUserInput("");
    nextQuestion();
  };

  const finishRosco = () => {
    if (onEndQuiz) {
      onEndQuiz(score, "rosco");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {currentQuestion && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Letra: {currentQuestion.letter}
          </h2>
          <p className="mb-4">{currentQuestion.question}</p>

          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (userInput.trim() === "") {
                  handlePass();
                } else {
                  handleAnswer();
                }
              }
            }}
            className="border rounded p-2 mb-4 text-white"
            disabled={feedback !== null}
            placeholder="Escribe tu respuesta o pulsa Enter vacío para pasar"
          />

          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAnswer}
              className="bg-green-600 text-white px-4 py-2 rounded"
              disabled={feedback !== null}
            >
              Responder
            </button>
            <button
              onClick={handlePass}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              disabled={feedback !== null}
            >
              Pasar
            </button>
          </div>

          {feedback && (
            <p className="text-red-500 font-bold mb-4">{feedback}</p>
          )}
        </>
      )}

      <div className="relative w-80 h-80 mx-auto my-6">
        {roscoQuestions.map((q, index) => {
          const total = roscoQuestions.length;
          const angle = (2 * Math.PI * index) / total - Math.PI / 2;
          const radius = 170;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              key={q.letter}
              className={`absolute w-10 h-10 flex items-center justify-center rounded-full font-bold border
          ${
            answers[q.letter] === "correct"
              ? "bg-green-600 text-white"
              : answers[q.letter] === "wrong"
              ? "bg-red-600 text-white"
              : answers[q.letter] === "pass"
              ? "bg-yellow-500 text-white"
              : "bg-gray-300 text-black"
          }
        `}
              style={{
                left: `calc(50% + ${x}px - 20px)`,
                top: `calc(50% + ${y}px - 20px)`,
              }}
            >
              {q.letter}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rosco;
