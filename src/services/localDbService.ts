import {
	Candidato,
	CredencialesLogin,
	EstadisticasVoto,
	FiltrosDashboard,
	RegistroVotante,
	RespuestaAPI,
	Votante,
	Voto,
} from "../types/index";

const STORAGE_KEYS = {
	users: "sv_users",
	votes: "sv_votes",
	candidates: "sv_candidates",
	authUserIdLocal: "sv_auth_user_id_local",
	authUserIdSession: "sv_auth_user_id_session",
	authTokenLocal: "authToken",
	authTokenSession: "authToken",
};

type StoredVotante = Omit<
	Votante,
	"fechaNacimiento" | "createdAt" | "updatedAt"
> & {
	fechaNacimiento: string;
	createdAt: string;
	updatedAt: string;
};

type StoredVoto = Omit<Voto, "timestamp"> & {
	timestamp: string;
};

class LocalDbService {
	private ensureSeedData(): void {
		const candidates = this.readJSON<Candidato[] | null>(
			STORAGE_KEYS.candidates,
			null,
		);
		if (!candidates || candidates.length === 0) {
			const now = new Date().toISOString();
			const defaultCandidates: Candidato[] = [
				{
					id: "camilo-torres",
					nombre: "Camilo",
					apellido: "Torres",
					partido: "Pacto Histórico",
					plataforma:
						"Justicia social, transparencia pública y desarrollo territorial para Santander.",
					photo: "/images/camilo-portrait.png",
					website: "https://example.com/camilo",
					twitter: "https://x.com/",
					createdAt: new Date(now),
					updatedAt: new Date(now),
				},
				{
					id: "andrea-ruiz",
					nombre: "Andrea",
					apellido: "Ruiz",
					partido: "Movimiento Ciudadano",
					plataforma:
						"Empleo joven, educación digital y seguridad ciudadana con enfoque preventivo.",
					createdAt: new Date(now),
					updatedAt: new Date(now),
				},
				{
					id: "jorge-perez",
					nombre: "Jorge",
					apellido: "Pérez",
					partido: "Alianza Regional",
					plataforma:
						"Infraestructura, salud rural y fortalecimiento de la economía local.",
					createdAt: new Date(now),
					updatedAt: new Date(now),
				},
			];

			this.writeJSON(STORAGE_KEYS.candidates, defaultCandidates);
		}

		const users = this.readJSON<StoredVotante[] | null>(
			STORAGE_KEYS.users,
			null,
		);
		if (!users) {
			this.writeJSON(STORAGE_KEYS.users, []);
		}

		const votes = this.readJSON<StoredVoto[] | null>(STORAGE_KEYS.votes, null);
		if (!votes) {
			this.writeJSON(STORAGE_KEYS.votes, []);
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

	private toVotante(stored: StoredVotante): Votante {
		return {
			...stored,
			fechaNacimiento: new Date(stored.fechaNacimiento),
			createdAt: new Date(stored.createdAt),
			updatedAt: new Date(stored.updatedAt),
		};
	}

	private toStoredVotante(votante: Votante): StoredVotante {
		return {
			...votante,
			fechaNacimiento: votante.fechaNacimiento.toISOString(),
			createdAt: votante.createdAt.toISOString(),
			updatedAt: votante.updatedAt.toISOString(),
		};
	}

	private toVoto(stored: StoredVoto): Voto {
		return {
			...stored,
			timestamp: new Date(stored.timestamp),
		};
	}

	private getUsersStored(): StoredVotante[] {
		this.ensureSeedData();
		return this.readJSON<StoredVotante[]>(STORAGE_KEYS.users, []);
	}

	private getVotesStored(): StoredVoto[] {
		this.ensureSeedData();
		return this.readJSON<StoredVoto[]>(STORAGE_KEYS.votes, []);
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

	async register(datos: RegistroVotante): Promise<RespuestaAPI<Votante>> {
		this.ensureSeedData();
		const users = this.getUsersStored();

		const cedulaExists = users.some((user) => user.cedula === datos.cedula);
		if (cedulaExists) {
			return {
				success: false,
				message: "Registro fallido",
				error: "Ya existe un usuario con esa cédula",
			};
		}

		const emailExists = users.some((user) => user.email === datos.email);
		if (emailExists) {
			return {
				success: false,
				message: "Registro fallido",
				error: "Ya existe un usuario con ese correo",
			};
		}

		const now = new Date();
		const newUser: Votante = {
			id: `votante-${Date.now()}`,
			nombre: datos.nombre,
			apellido: datos.apellido,
			cedula: datos.cedula,
			email: datos.email,
			fechaNacimiento: new Date(datos.fechaNacimiento),
			genero: datos.genero,
			municipio: datos.municipio,
			password: datos.password,
			hasVoted: false,
			createdAt: now,
			updatedAt: now,
		};

		users.push(this.toStoredVotante(newUser));
		this.writeJSON(STORAGE_KEYS.users, users);

		return {
			success: true,
			message: "Usuario registrado correctamente",
			data: newUser,
		};
	}

	async login(
		credenciales: CredencialesLogin,
	): Promise<RespuestaAPI<{ token: string; user: Votante }>> {
		this.ensureSeedData();
		const users = this.getUsersStored();
		const votes = this.getVotesStored();

		const found = users.find(
			(user) =>
				user.cedula === credenciales.cedula &&
				user.password === credenciales.password,
		);

		if (!found) {
			return {
				success: false,
				message: "Inicio de sesión fallido",
				error: "Cédula o contraseña incorrecta",
			};
		}

		found.hasVoted = votes.some((vote) => vote.votante_id === found.id);
		found.updatedAt = new Date().toISOString();
		this.writeJSON(STORAGE_KEYS.users, users);

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
				user: this.toVotante(found),
			},
		};
	}

	async getCurrentUser(): Promise<RespuestaAPI<Votante>> {
		this.ensureSeedData();
		const userId = this.getCurrentUserId();
		if (!userId) {
			return {
				success: false,
				message: "No autenticado",
				error: "No hay usuario autenticado",
			};
		}

		const users = this.getUsersStored();
		const found = users.find((user) => user.id === userId);
		if (!found) {
			return {
				success: false,
				message: "Usuario no encontrado",
				error: "No se encontró el usuario en la base local",
			};
		}

		return {
			success: true,
			message: "Usuario actual obtenido",
			data: this.toVotante(found),
		};
	}

	async getCandidatos(): Promise<RespuestaAPI<Candidato[]>> {
		this.ensureSeedData();
		const candidates = this.readJSON<Candidato[]>(STORAGE_KEYS.candidates, []);
		return {
			success: true,
			message: "Candidatos obtenidos",
			data: candidates,
		};
	}

	async checkUserVoteStatus(): Promise<RespuestaAPI<{ hasVoted: boolean }>> {
		this.ensureSeedData();
		const userId = this.getCurrentUserId();
		if (!userId) {
			return {
				success: false,
				message: "No autenticado",
				error: "No hay usuario autenticado",
			};
		}

		const votes = this.getVotesStored();
		return {
			success: true,
			message: "Estado de voto consultado",
			data: { hasVoted: votes.some((vote) => vote.votante_id === userId) },
		};
	}

	async submitVote(
		candidatoId: string,
		metadata?: Voto["metadata"],
	): Promise<RespuestaAPI<Voto>> {
		this.ensureSeedData();
		const userId = this.getCurrentUserId();
		if (!userId) {
			return {
				success: false,
				message: "No autenticado",
				error: "Debes iniciar sesión para votar",
			};
		}

		const votes = this.getVotesStored();
		if (votes.some((vote) => vote.votante_id === userId)) {
			return {
				success: false,
				message: "Voto rechazado",
				error: "Este usuario ya votó",
			};
		}

		const candidates = this.readJSON<Candidato[]>(STORAGE_KEYS.candidates, []);
		const candidateExists = candidates.some(
			(candidate) => candidate.id === candidatoId,
		);
		if (!candidateExists) {
			return {
				success: false,
				message: "Voto rechazado",
				error: "El candidato seleccionado no existe",
			};
		}

		const users = this.getUsersStored();
		const user = users.find((item) => item.id === userId);
		if (!user) {
			return {
				success: false,
				message: "Voto rechazado",
				error: "No se encontró el usuario votante",
			};
		}

		const vote: Voto = {
			id: `voto-${Date.now()}`,
			votante_id: userId,
			candidato_id: candidatoId,
			municipio: user.municipio,
			timestamp: new Date(),
			metadata,
		};

		votes.push({ ...vote, timestamp: vote.timestamp.toISOString() });
		this.writeJSON(STORAGE_KEYS.votes, votes);

		user.hasVoted = true;
		user.updatedAt = new Date().toISOString();
		this.writeJSON(STORAGE_KEYS.users, users);

		return {
			success: true,
			message: "Voto registrado correctamente",
			data: vote,
		};
	}

	async getAllVotes(filters?: FiltrosDashboard): Promise<RespuestaAPI<Voto[]>> {
		this.ensureSeedData();
		const votes = this.getVotesStored();
		const users = this.getUsersStored();
		const candidates = this.readJSON<Candidato[]>(STORAGE_KEYS.candidates, []);

		const filtered = votes.filter((vote) => {
			if (!filters) return true;

			const user = users.find((item) => item.id === vote.votante_id);
			const candidate = candidates.find(
				(item) => item.id === vote.candidato_id,
			);

			if (filters.municipio && vote.municipio !== filters.municipio)
				return false;
			if (filters.genero && user && user.genero !== filters.genero)
				return false;
			if (filters.partido && candidate && candidate.partido !== filters.partido)
				return false;

			if (filters.rango_edad && user) {
				const edad = this.calculateAge(new Date(user.fechaNacimiento));
				if (!this.inAgeRange(edad, filters.rango_edad)) return false;
			}

			return true;
		});

		return {
			success: true,
			message: "Votos obtenidos",
			data: filtered.map((vote) => this.toVoto(vote)),
		};
	}

	async getStatistics(): Promise<RespuestaAPI<EstadisticasVoto>> {
		const votesResponse = await this.getAllVotes();
		if (!votesResponse.success || !votesResponse.data) {
			return {
				success: false,
				message: "Error al calcular estadísticas",
				error: votesResponse.error || "No se pudieron obtener los votos",
			};
		}

		const votes = votesResponse.data;
		const users = this.getUsersStored();
		const totalVotos = votes.length;

		const votosPorCandidato: Record<string, number> = {};
		const distribucionGeografica: Record<string, number> = {};

		votes.forEach((vote) => {
			votosPorCandidato[vote.candidato_id] =
				(votosPorCandidato[vote.candidato_id] || 0) + 1;
			distribucionGeografica[vote.municipio] =
				(distribucionGeografica[vote.municipio] || 0) + 1;
		});

		const participacion =
			users.length > 0 ? (totalVotos / users.length) * 100 : 0;

		return {
			success: true,
			message: "Estadísticas obtenidas",
			data: {
				total_votos: totalVotos,
				participacion,
				votos_por_candidato: votosPorCandidato,
				distribucion_geografica: distribucionGeografica,
			},
		};
	}

	async getVotesByMunicipios(): Promise<RespuestaAPI<Record<string, number>>> {
		const stats = await this.getStatistics();
		return {
			success: stats.success,
			message: stats.success ? "Distribución por municipio" : "Error",
			data: stats.data?.distribucion_geografica,
			error: stats.error,
		};
	}

	async getVotesByCandidatos(): Promise<RespuestaAPI<Record<string, number>>> {
		const stats = await this.getStatistics();
		return {
			success: stats.success,
			message: stats.success ? "Distribución por candidato" : "Error",
			data: stats.data?.votos_por_candidato,
			error: stats.error,
		};
	}

	async resetSimulationData(): Promise<RespuestaAPI<null>> {
		this.ensureSeedData();

		this.writeJSON(STORAGE_KEYS.votes, []);

		const users = this.getUsersStored().map((user) => ({
			...user,
			hasVoted: false,
			updatedAt: new Date().toISOString(),
		}));
		this.writeJSON(STORAGE_KEYS.users, users);

		return {
			success: true,
			message: "Datos de simulación reiniciados",
			data: null,
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
