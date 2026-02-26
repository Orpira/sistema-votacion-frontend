import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import {
	AuthContextType,
	Votante,
	CredencialesLogin,
	RegistroVotante,
} from "../types/index";
import authService from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<Votante | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Verificar si el usuario ya está autenticado al cargar
	useEffect(() => {
		const checkAuth = async () => {
			if (authService.isAuthenticated()) {
				const response = await authService.getCurrentUser();
				if (response.success && response.data) {
					setUser(response.data);
				} else {
					setError(response.error || "Error al obtener usuario");
				}
			}
			setLoading(false);
		};

		checkAuth();
	}, []);

	const login = async (credenciales: CredencialesLogin) => {
		setLoading(true);
		setError(null);
		try {
			const response = await authService.login(credenciales);
			if (response.success && response.data) {
				setUser(response.data.user);
			} else {
				setError(response.error || "Error al iniciar sesión");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error desconocido");
		} finally {
			setLoading(false);
		}
	};

	const register = async (datos: RegistroVotante) => {
		setLoading(true);
		setError(null);
		try {
			const response = await authService.register(datos);
			if (response.success && response.data) {
				setUser(response.data);
			} else {
				setError(response.error || "Error al registrarse");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error desconocido");
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		authService.logout();
		setUser(null);
		setError(null);
	};

	const value: AuthContextType = {
		user,
		isAuthenticated: !!user,
		loading,
		error,
		login,
		register,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth debe ser usado dentro de AuthProvider");
	}
	return context;
};
