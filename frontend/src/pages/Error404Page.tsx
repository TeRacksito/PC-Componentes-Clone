import { Link } from "react-router-dom";

export function Error404Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-center transform translate-y-2 rotate-1 shadow-lg bg-white p-8 rounded-lg animate-fade-in">
        <h1 className="text-6xl font-bold text-orange-500">404</h1>
        <p className="mt-4 text-xl text-gray-600">
          Ohh... parece que nuestros expertos en tecnología no han podido
          encontrar lo que buscas.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-y-0 md:space-x-4 animate-slide-in">
        <div className="bg-gray-100 rounded-full w-min flex transform rotate-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 62 62"
            fill="none"
            className="p-5 w-24 h-24"
          >
            <g id="Group">
              <g id="Vector">
                <path
                  d="M45.136 38.0649L60.125 53.0539L53.054 60.1249L38.064 45.1349"
                  fill="white"
                ></path>
                <path
                  d="M45.136 38.0649L60.125 53.0539L53.054 60.1249L38.064 45.1349"
                  stroke="#333333"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                ></path>
              </g>
              <path
                id="Vector_2"
                d="M25 49C38.2548 49 49 38.2548 49 25C49 11.7452 38.2548 1 25 1C11.7452 1 1 11.7452 1 25C1 38.2548 11.7452 49 25 49Z"
                fill="white"
                stroke="#333333"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
              ></path>
              <path
                id="Vector_3"
                d="M30.6567 19.3433L19.343 30.657"
                stroke="#333333"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
              ></path>
              <path
                id="Vector_4"
                d="M30.657 30.657L19.3433 19.3433"
                stroke="#333333"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
              ></path>
            </g>
          </svg>
        </div>
        <div className="text-center md:text-left transform -rotate-1">
          <p className="text-lg text-gray-700">
            Tal vez quieras probar lo siguiente:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>Verificar la URL</li>
            <li>Utilizar el menú de navegación</li>
            <li>Volver al inicio</li>
          </ul>
        </div>
      </div>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition transform hover:scale-110 rotate-1"
      >
        Volver al Inicio
      </Link>
      <div className="mt-8 text-center">
        <p className="text-gray-500">Si el problema persiste, contáctanos.</p>
        <Link to="/contact" className="text-orange-500 underline">
          Soporte
        </Link>
      </div>
    </div>
  );
}
