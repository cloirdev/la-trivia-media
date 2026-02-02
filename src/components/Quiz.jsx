import React, { useState, useEffect } from "react";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Quiz = ({ shuffledQuizData, onEndQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [delayTime, setDelayTime] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (shuffledQuizData.length > 0) {
      setShuffledOptions(
        shuffleArray(shuffledQuizData[currentQuestionIndex].options)
      );
    }
  }, [currentQuestionIndex, shuffledQuizData]);

  useEffect(() => {
    if (answered || delayTime > 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answered, delayTime]);

  useEffect(() => {
    if (delayTime > 0) {
      const delayTimer = setInterval(() => {
        setDelayTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(delayTimer);
    } else if (delayTime === 0 && answered) {
      showNextQuestion();
    }
  }, [delayTime, answered]);

  const checkAnswer = (selectedOption) => {
    if (answered) return;

    setAnswered(true);
    setSelectedAnswer(selectedOption);
    const currentQuestion = shuffledQuizData[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 100 + timeLeft);
    }
    setDelayTime(5);
  };

  const handleTimeout = () => {
    setAnswered(true);
    setDelayTime(3);
  };

  const showNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < shuffledQuizData.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(30);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      onEndQuiz(score);
    }
  };

  const currentQuestion = shuffledQuizData[currentQuestionIndex];
  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col  items-center">
      <p
        className={`text-lg font-bold text-right ${
          timeLeft === 0
            ? "text-gray-300"
            : timeLeft > 5
            ? "text-gray-300"
            : "text-red-500 text-xl animate-blink"
        }`}
        style={{ minWidth: "120px" }} // Ajusta según lo que necesites
      >
        ⌛ {timeLeft > 0 ? timeLeft : "¡Tiempo agotado!"}
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
        {currentQuestion.question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {shuffledOptions.map((option, index) => {
          // Determinar el estado visual del botón
          let buttonClass = "option-button bg-gray-800 text-white py-3 px-4 rounded-lg font-medium";
          
          if (answered) {
            // Mostrar en verde la respuesta correcta
            if (option === currentQuestion.correctAnswer) {
              buttonClass += " correct";
            }
            // Mostrar en rojo SOLO la respuesta que seleccionó el usuario (si fue incorrecta)
            else if (option === selectedAnswer) {
              buttonClass += " incorrect";
            }
            // Las demás opciones quedan normales pero deshabilitadas
            else {
              buttonClass += " opacity-60";
            }
            buttonClass += " cursor-not-allowed";
          } else {
            buttonClass += " hover:bg-gray-700";
          }

          return (
            <button
              key={index}
              onClick={() => checkAnswer(option)}
              className={buttonClass}
              disabled={answered}
            >
              {option}
            </button>
          );
        })}
      </div>

      {answered && delayTime > 0 && (
        <p className="text-sm text-gray-400 mt-4">
          Siguiente pregunta en {delayTime} segundos...
        </p>
      )}
    </div>
  );
};

export default Quiz;
