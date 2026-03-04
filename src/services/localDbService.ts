import {
	CredencialesLogin,
	EstadisticasSimpatizantes,
	FiltrosDashboard,
	RegistroSimpatizante,
	RespuestaAPI,
	Simpatizante,
} from "../types/index";

const STORAGE_KEYS = {
	simpatizantes: "sv_simpatizantes",
	authUserIdLocal: "sv_auth_user_id_local",
	authUserIdSession: "sv_auth_user_id_session",
	authTokenLocal: "authToken",
	authTokenSession: "authToken",
};

type StoredSimpatizante = Omit<
	Simpatizante,
	"fechaNacimiento" | "createdAt" | "updatedAt"
> & {
	fechaNacimiento: string;
	createdAt: string;
	updatedAt: string;
};

class LocalDbService {
	private ensureSeedData(): void {
		const simpatizantes = this.readJSON<StoredSimpatizante[] | null>(
			STORAGE_KEYS.simpatizantes,
			null,
		);
		if (!simpatizantes) {
			this.writeJSON(STORAGE_KEYS.simpatizantes, []);
		}
	}

	private readJSON<T>(key: string, fallback: T): T {
		try {
			const raw = localStorage.getItem(key);
			if (!raw) return fallback;
			return JSON.parse(raw) as T;
		} catch {
			return fallback;
		}
	}

	private writeJSON<T>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	private toSimpatizante(stored: StoredSimpatizante): Simpatizante {
		return {
			...stored,
			fechaNacimiento: new Date(stored.fechaNacimiento),
			createdAt: new Date(stored.createdAt),
			updatedAt: new Date(stored.updatedAt),
		};
	}

	private toStoredSimpatizante(simpatizante: Simpatizante): StoredSimpatizante {
		return {
			...simpatizante,
			fechaNacimiento: simpatizante.fechaNacimiento.toISOString(),
			createdAt: simpatizante.createdAt.toISOString(),
			updatedAt: simpatizante.updatedAt.toISOString(),
		};
	}

	private getSimpatizantesStored(): StoredSimpatizante[] {
		this.ensureSeedData();
		return this.readJSON<StoredSimpatizante[]>(STORAGE_KEYS.simpatizantes, []);
	}

	private getCurrentUserId(): string | null {
		return (
			localStorage.getItem(STORAGE_KEYS.authUserIdLocal) ||
			sessionStorage.getItem(STORAGE_KEYS.authUserIdSession)
		);
	}

	getToken(): string | null {
		return (
			localStorage.getItem(STORAGE_KEYS.authTokenLocal) ||
			sessionStorage.getItem(STORAGE_KEYS.authTokenSession)
		);
	}

	isAuthenticated(): boolean {
		return !!this.getCurrentUserId();
	}

	logout(): void {
		localStorage.removeItem(STORAGE_KEYS.authUserIdLocal);
		sessionStorage.removeItem(STORAGE_KEYS.authUserIdSession);
		localStorage.removeItem(STORAGE_KEYS.authTokenLocal);
		sessionStorage.removeItem(STORAGE_KEYS.authTokenSession);
	}

	async register(datos: RegistroSimpatizante): Promise<RespuestaAPI<Simpatizante>> {
		this.ensureSeedData();
		const simpatizantes = this.getSimpatizantesStored();

		const cedulaExists = simpatizantes.some((s) => s.cedula === datos.cedula);
		if (cedulaExists) {
			return {
				success: false,
				message: "Registro fallido",
				error: "Ya existe un simpatizante con esa cédula",
			};
		}

		const emailExists = simpatizantes.some((s) => s.email === datos.email);
		if (emailExists) {
			return {
				success: false,
				message: "Registro fallido",
				error: "Ya existe un simpatizante con ese correo",
			};
		}

		const now = new Date();
		const newSimpatizante: Simpatizante = {
			id: `simpatizante-${Date.now()}`,
			nombre: datos.nombre,
			apellido: datos.apellido,
			cedula: datos.cedula,
			email: datos.email,
			telefono: datos.telefono,
			fechaNacimiento: new Date(datos.fechaNacimiento),
			genero: datos.genero,
			ciudad: datos.ciudad,
			barrio: datos.barrio,
			password: datos.password,
			createdAt: now,
			updatedAt: now,
		};

		simpatizantes.push(this.toStoredSimpatizante(newSimpatizante));
		this.writeJSON(STORAGE_KEYS.simpatizantes, simpatizantes);

		return {
			success: true,
			message: "Simpatizante registrado correctamente",
			data: newSimpatizante,
		};
	}

	async login(
		credenciales: CredencialesLogin,
	): Promise<RespuestaAPI<{ token: string; user: Simpatizante }>> {
		this.ensureSeedData();
		const simpatizantes = this.getSimpatizantesStored();

		const found = simpatizantes.find(
			(s) =>
				s.cedula === credenciales.cedula &&
				s.password === credenciales.password,
		);

		if (!found) {
			return {
				success: false,
				message: "Inicio de sesión fallido",
				error: "Cédula o contraseña incorrecta",
			};
		}

		found.updatedAt = new Date().toISOString();
		this.writeJSON(STORAGE_KEYS.simpatizantes, simpatizantes);

		const token = `local-token-${found.id}`;
		if (credenciales.rememberMe) {
			localStorage.setItem(STORAGE_KEYS.authUserIdLocal, found.id);
			localStorage.setItem(STORAGE_KEYS.authTokenLocal, token);
			sessionStorage.removeItem(STORAGE_KEYS.authUserIdSession);
			sessionStorage.removeItem(STORAGE_KEYS.authTokenSession);
		} else {
			sessionStorage.setItem(STORAGE_KEYS.authUserIdSession, found.id);
			sessionStorage.setItem(STORAGE_KEYS.authTokenSession, token);
			localStorage.removeItem(STORAGE_KEYS.authUserIdLocal);
			localStorage.removeItem(STORAGE_KEYS.authTokenLocal);
		}

		return {
			success: true,
			message: "Inicio de sesión exitoso",
			data: {
				token,
				user: this.toSimpatizante(found),
			},
		};
	}

	async getCurrentUser(): Promise<RespuestaAPI<Simpatizante>> {
		this.ensureSeedData();
		const userId = this.getCurrentUserId();
		if (!userId) {
			return {
				success: false,
				message: "No autenticado",
				error: "No hay usuario autenticado",
			};
		}

		const simpatizantes = this.getSimpatizantesStored();
		const found = simpatizantes.find((s) => s.id === userId);
		if (!found) {
			return {
				success: false,
				message: "Usuario no encontrado",
				error: "No se encontró el simpatizante en la base local",
			};
		}

		return {
			success: true,
			message: "Usuario actual obtenido",
			data: this.toSimpatizante(found),
		};
	}

	async getAllSimpatizantes(filters?: FiltrosDashboard): Promise<RespuestaAPI<Simpatizante[]>> {
		this.ensureSeedData();
		const simpatizantes = this.getSimpatizantesStored();

		const filtered = simpatizantes.filter((s) => {
			if (!filters) return true;

			if (filters.ciudad && s.ciudad !== filters.ciudad)
				return false;
			if (filters.genero && s.genero !== filters.genero)
				return false;

			if (filters.rango_edad) {
				const edad = this.calculateAge(new Date(s.fechaNacimiento));
				if (!this.inAgeRange(edad, filters.rango_edad)) return false;
			}

			return true;
		});

		return {
			success: true,
			message: "Simpatizantes obtenidos",
			data: filtered.map((s) => this.toSimpatizante(s)),
		};
	}

	async getStatistics(): Promise<RespuestaAPI<EstadisticasSimpatizantes>> {
		const simpatizantesResponse = await this.getAllSimpatizantes();
		if (!simpatizantesResponse.success || !simpatizantesResponse.data) {
			return {
				success: false,
				message: "Error al calcular estadísticas",
				error: simpatizantesResponse.error || "No se pudieron obtener los simpatizantes",
			};
		}

		const simpatizantes = simpatizantesResponse.data;
		const totalSimpatizantes = simpatizantes.length;

		const distribucionPorCiudad: Record<string, number> = {};
		const distribucionPorEdad: Record<string, number> = {};
		const distribucionPorGenero: Record<string, number> = {};

		simpatizantes.forEach((s) => {
			// Por ciudad
			distribucionPorCiudad[s.ciudad] =
				(distribucionPorCiudad[s.ciudad] || 0) + 1;

			// Por género
			distribucionPorGenero[s.genero] =
				(distribucionPorGenero[s.genero] || 0) + 1;

			// Por rango de edad
			const edad = this.calculateAge(s.fechaNacimiento);
			const rangoEdad = this.getAgeRange(edad);
			distribucionPorEdad[rangoEdad] =
				(distribucionPorEdad[rangoEdad] || 0) + 1;
		});

		return {
			success: true,
			message: "Estadísticas obtenidas",
			data: {
				total_simpatizantes: totalSimpatizantes,
				distribucion_por_ciudad: distribucionPorCiudad,
				distribucion_por_edad: distribucionPorEdad,
				distribucion_por_genero: distribucionPorGenero,
			},
		};
	}

	async getSimpatizantesByCiudad(): Promise<RespuestaAPI<Record<string, number>>> {
		const stats = await this.getStatistics();
		return {
			success: stats.success,
			message: stats.success ? "Distribución por ciudad" : "Error",
			data: stats.data?.distribucion_por_ciudad,
			error: stats.error,
		};
	}

	async getSimpatizantesByEdad(): Promise<RespuestaAPI<Record<string, number>>> {
		const stats = await this.getStatistics();
		return {
			success: stats.success,
			message: stats.success ? "Distribución por edad" : "Error",
			data: stats.data?.distribucion_por_edad,
			error: stats.error,
		};
	}

	private calculateAge(fechaNacimiento: Date): number {
		const now = new Date();
		let age = now.getFullYear() - fechaNacimiento.getFullYear();
		const m = now.getMonth() - fechaNacimiento.getMonth();
		if (m < 0 || (m === 0 && now.getDate() < fechaNacimiento.getDate())) {
			age--;
		}
		return age;
	}

	private getAgeRange(age: number): string {
		if (age >= 18 && age <= 25) return "18-25";
		if (age >= 26 && age <= 35) return "26-35";
		if (age >= 36 && age <= 45) return "36-45";
		if (age >= 46 && age <= 55) return "46-55";
		return "56+";
	}

	private inAgeRange(age: number, range: string): boolean {
		switch (range) {
			case "18-25":
				return age >= 18 && age <= 25;
			case "26-35":
				return age >= 26 && age <= 35;
			case "36-45":
				return age >= 36 && age <= 45;
			case "46-55":
				return age >= 46 && age <= 55;
			case "56+":
				return age >= 56;
			default:
				return true;
		}
	}
}

export default new LocalDbService();
