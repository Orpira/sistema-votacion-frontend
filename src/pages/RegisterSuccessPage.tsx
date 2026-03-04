import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-red-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full text-center border-t-4 border-green-600">
        <div className="relative mb-6">
          <div className="text-7xl mb-4 animate-pulse">🎉</div>
          <div className="absolute inset-0 flex justify-center items-center opacity-10">
            <div className="text-9xl">✓</div>
          </div>
        </div>

        <h1 className="font-playfair text-3xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-2">
          ¡Registro Exitoso!
        </h1>

        <p className="text-slate-600 mb-6 text-lg">
          Bienvenido a la campaña, <span className="font-bold text-red-600">{user?.nombre}</span>.
          Ya eres parte de nuestro movimiento.
        </p>

        <div className="bg-gradient-to-r from-red-50 to-amber-50 p-6 rounded-lg mb-6 text-left border border-red-200">
          <h2 className="font-playfair text-xl font-bold text-slate-900 mb-4">Tu información de registro</h2>
          <div className="space-y-3">
            <p className="text-sm text-slate-700">
              <span className="font-bold text-red-600">Simpatizante:</span> {user?.nombre} {user?.apellido}
            </p>
            <p className="text-sm text-slate-700">
              <span className="font-bold text-red-600">Cédula:</span> {user?.cedula}
            </p>
            <p className="text-sm text-slate-700">
              <span className="font-bold text-red-600">Ciudad:</span> {user?.ciudad}
            </p>
            <p className="text-sm text-slate-700">
              <span className="font-bold text-red-600">Fecha de registro:</span> {new Date().toLocaleDateString("es-CO")}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg mb-6 text-left border border-blue-200">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-xl">✊</span> ¿Qué sigue?
          </h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Tu registro está guardado de forma segura</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Puedes ver las estadísticas de la campaña en el dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Comparte la campaña con tus amigos y familiares</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Tu apoyo es fundamental para el cambio en Santander</span>
            </li>
          </ul>
        </div>

        <p className="text-slate-600 mb-6 font-semibold">
          Serás redirigido en <span className="text-red-600 text-lg font-bold">{countdown}</span> segundos...
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="btn-primary w-full py-4 text-lg mb-4"
        >
          Ver Dashboard de Campaña →
        </button>

        <p className="text-xs text-slate-500 mt-6 leading-relaxed">
          Gracias por unirte a la campaña de Camilo Torres. 
          Juntos construiremos el Santander que todos merecemos.
        </p>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
