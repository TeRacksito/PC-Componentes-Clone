import { useState } from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { SignUpForm } from "../components/LoginForm/SignUpForm";

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex w-full max-w-4xl rounded">
        <div className="hidden md:flex w-1/2 p-8 border-r flex-col justify-center ">
          <h2 className="text-xl font-semibold mb-4">Gestiona tus pedidos</h2>
          <p className="mb-4">
            Ten el control de todos tus pedidos y recibe notificaciones con el
            seguimiento.
          </p>
          <h2 className="text-xl font-semibold mb-4">
            Lista de deseos personalizada
          </h2>
          <p>
            Guarda tus productos favoritos en las listas de deseos
            personalizadas.
          </p>
        </div>

        <div className="md:w-1/2 w-full p-8">
          {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} />
          ) : (
            <SignUpForm setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
}
