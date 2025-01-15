import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import FormInput from "./FormInput";
import { signUp } from "../../services/signUpService";

interface SignUpFormProps {
  setIsLogin?: (isLogin: boolean) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ setIsLogin }) => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { reloadCart } = useCart();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const signUpStatus = await signUp(name, surname, email, username, password);
      if (!signUpStatus) {
        throw new Error("Sign up failed");
      }

      await login(email, password);
      navigate("/");
      reloadCart();
    } catch (error) {
      setError("Sign up failed. Please check fields and try again.");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md mx-auto rounded px-8 pt-6 pb-8 mb-4 space-y-6"
      >
        <FormInput
          label="Nombre"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" "
        />

        <FormInput
          label="Apellidos"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder=" "
        />

        <FormInput
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" "
        />

        <FormInput
          label="Nombre de usuario"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
        >
          Crear cuenta
        </button>

        {setIsLogin && (
          <button
            className="w-full bg-white border border-gray-900 hover:border-orange-500 text-gray-900 hover:text-orange-500 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            onClick={() => setIsLogin(true)}
          >
            Ya tengo cuenta, iniciar sesión
          </button>
        )}

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    </>
  );
};
