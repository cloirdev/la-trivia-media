import React, { useState } from "react";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim() !== "") {
      localStorage.setItem("quizUser", username);
      onLogin(username);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <input
        type="text"
        placeholder="Escribe tu nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded p-2 mb-4 text-black"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Entrar
      </button>
    </div>
  );
};

export default LoginScreen;
