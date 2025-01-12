import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-md mx-auto rounded px-8 pt-6 pb-8 mb-4 space-y-6"
    >
      <FormInput
        label="Nombre de usuario o Email"
        id="identifier"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=" "
      />

      <FormInput
        label="Contraseña"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=" "
      />

      <div className="text-left">
        <Link
          to="/recover-password"
          className="text-sm hover:text-orange-500 underline"
        >
          He olvidado mi contraseña
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Iniciar Sesión
      </button>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </form>
  );
};
