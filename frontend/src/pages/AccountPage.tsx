import { useAuth } from "../contexts/AuthContext";

export function AccountPage() {
  const { auth, logout } = useAuth();

  return (
    <>
      <div className="container mx-auto p-6 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold mb-6">Mi cuenta</h1>
          <p className="text-lg mb-6">
            Bienvenido, <strong>{auth?.client?.name}</strong>{" "}
            {auth?.client?.surname}
          </p>
        </div>
        <div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-nowrap"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <div className="text-center text-gray-500">
          No hay más contenido implementado.
        </div>
      </div>
    </>
  );
}
