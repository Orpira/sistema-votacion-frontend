import {
	CredencialesLogin,
	RegistroVotante,
	Votante,
	RespuestaAPI,
} from "../types/index";
import localDbService from "./localDbService";

// URL base de la API (configurar según environment)
const API_BASE_URL =
	process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const USE_LOCAL_DB = true;

class AuthService {
	/**
	 * Registra un nuevo votante
	 */
	async register(datos: RegistroVotante): Promise<RespuestaAPI<Votante>> {
		if (USE_LOCAL_DB) {
			return localDbService.register(datos);
		}

		try {
			const response = await fetch(`${API_BASE_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(datos),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al registrar",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Inicia sesión con credenciales
	 */
	async login(
		credenciales: CredencialesLogin,
	): Promise<RespuestaAPI<{ token: string; user: Votante }>> {
		if (USE_LOCAL_DB) {
			return localDbService.login(credenciales);
		}

		try {
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					cedula: credenciales.cedula,
					password: credenciales.password,
				}),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();

			// Guardar el token en localStorage si la opción "Recuérdame" está activa
			if (credenciales.rememberMe && data.data?.token) {
				localStorage.setItem("authToken", data.data.token);
			}

			// Siempre guardar el token en sessionStorage
			if (data.data?.token) {
				sessionStorage.setItem("authToken", data.data.token);
			}

			return data;
		} catch (error) {
			return {
				success: false,
				message: "Error al iniciar sesión",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Cierra la sesión actual
	 */
	async logout(): Promise<void> {
		if (USE_LOCAL_DB) {
			localDbService.logout();
			return;
		}

		try {
			await fetch(`${API_BASE_URL}/auth/logout`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${this.getToken()}`,
				},
			});
		} finally {
			localStorage.removeItem("authToken");
			sessionStorage.removeItem("authToken");
		}
	}

	/**
	 * Obtiene el usuario actual
	 */
	async getCurrentUser(): Promise<RespuestaAPI<Votante>> {
		if (USE_LOCAL_DB) {
			return localDbService.getCurrentUser();
		}

		try {
			const response = await fetch(`${API_BASE_URL}/auth/me`, {
				headers: {
					Authorization: `Bearer ${this.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al obtener usuario",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene el token almacenado
	 */
	getToken(): string | null {
		if (USE_LOCAL_DB) {
			return localDbService.getToken();
		}

		return (
			localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
		);
	}

	/**
	 * Verifica si el usuario está autenticado
	 */
	isAuthenticated(): boolean {
		if (USE_LOCAL_DB) {
			return localDbService.isAuthenticated();
		}

		return !!this.getToken();
	}

	/**
	 * Solicita cambio de contraseña
	 */
	async requestPasswordReset(email: string): Promise<RespuestaAPI<null>> {
		try {
			const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al solicitar cambio de contraseña",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}
}

export default new AuthService();
