import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import { useAuth } from "../context/AuthContext";
import { CredencialesLogin } from "../types/index";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();
    const [localError, setLocalError] = useState<string | null>(null);

    const handleLogin = async (credenciales: CredencialesLogin) => {
        setLocalError(null);
        try {
            await login(credenciales);
            navigate("/voting");
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : "Error al iniciar sesión");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-red-50 to-amber-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border-t-4 border-red-600">
                <div className="mb-8 text-center">
                    <div className="text-4xl mb-4">🗳️</div>
                    <h1 className="font-playfair text-3xl font-bold text-slate-900">Plataforma Electoral</h1>
                    <p className="text-slate-600 mt-2">Proceso democrático 2026</p>
                </div>

                {(error || localError) && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 rounded">
                        <p className="text-red-900 font-semibold">⚠️ Error</p>
                        <p className="text-red-800 text-sm mt-1">{error || localError}</p>
                    </div>
                )}

                <LoginForm onSubmit={handleLogin} loading={loading} />

                <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">
                    ¿Eres nuevo en la plataforma?{' '}
                    <a href="/register" className="text-red-600 font-bold hover:text-red-700 transition">
                        Regístrate aquí
                    </a>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-600 text-center leading-relaxed">
                        🔐 Tu información es completamente segura y protegida bajo los estándares de privacidad electoral.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
