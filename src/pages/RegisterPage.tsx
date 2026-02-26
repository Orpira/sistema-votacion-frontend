import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";
import { useAuth } from "../context/AuthContext";
import { RegistroVotante } from "../types/index";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();

    const handleRegister = async (data: RegistroVotante) => {
        try {
            await register(data);
            navigate("/login");
        } catch (err) {
            // error handled inside context or form
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-red-50 to-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl border-t-4 border-red-600">
                <div className="mb-8 text-center">
                    <div className="text-4xl mb-4">✊</div>
                    <h1 className="font-playfair text-3xl font-bold text-slate-900">Únete al Cambio</h1>
                    <p className="text-slate-600 mt-2">Regístrate para participar en el proceso electoral histórico 2026</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 rounded">
                        <p className="text-red-900 font-semibold">⚠️ Error en el registro</p>
                        <p className="text-red-800 text-sm mt-1">{error}</p>
                    </div>
                )}

                <RegisterForm onSubmit={handleRegister} loading={loading} />

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-900 text-center leading-relaxed">
                        ℹ️ Al registrarte, aceptas participar en este importante proceso democrático. 
                        Tu información será protegida bajo los más altos estándares de privacidad electoral.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
