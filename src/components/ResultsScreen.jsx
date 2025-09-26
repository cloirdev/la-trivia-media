import Scoreboard from "./Scoreboard.jsx";

const ResultsScreen = ({
  score,
  totalQuestions,
  onRestartQuiz,
  user,
  mode,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-center">¡Juego Terminado!</h2>
      <p className="text-xl mb-4 text-center">
        {user}, tu puntuación final es: {score}{" "}
        {totalQuestions ? `de ${totalQuestions}` : ""}.
      </p>

      <Scoreboard mode={mode} />

      <button
        onClick={onRestartQuiz}
        className="bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline transition duration-200 mt-4"
      >
        Volver a Jugar
      </button>
    </div>
  );
};

export default ResultsScreen;
