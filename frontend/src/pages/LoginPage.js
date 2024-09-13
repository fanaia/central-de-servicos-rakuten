import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUsuario } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";

import ErrorMessage from "../components/common/ErrorMessage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUsuario(email, senha);
      login(userData);
      navigate("/home");
    } catch (error) {
      setError({ message: "Falha ao fazer login", details: error.message });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 dark:bg-gray-900 text-gray-100">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <ErrorMessage message={error.message} details={error.details} />}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-gray-200"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
