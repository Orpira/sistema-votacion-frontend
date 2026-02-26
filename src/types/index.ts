// Tipos de Votante
export interface Votante {
	id: string;
	nombre: string;
	apellido: string;
	cedula: string;
	email: string;
	fechaNacimiento: Date;
	genero: "masculino" | "femenino" | "otro";
	municipio: string;
	password: string;
	hasVoted: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface RegistroVotante {
	nombre: string;
	apellido: string;
	cedula: string;
	email: string;
	fechaNacimiento: string;
	genero: "masculino" | "femenino" | "otro";
	municipio: string;
	password: string;
	confirmPassword: string;
}

// Tipos de Candidato
export interface Candidato {
	id: string;
	nombre: string;
	apellido: string;
	partido: string;
	plataforma: string;
	photo?: string;
	website?: string;
	twitter?: string;
	createdAt: Date;
	updatedAt: Date;
}

// Tipos de Voto
export interface Voto {
	id: string;
	votante_id: string;
	candidato_id: string;
	municipio: string;
	timestamp: Date;
	metadata?: {
		navegador?: string;
		dispositivo?: string;
	};
}

// Tipos de Estadísticas
export interface EstadisticasVoto {
	total_votos: number;
	participacion: number;
	votos_por_candidato: Record<string, number>;
	distribucion_geografica: Record<string, number>;
}

export interface ResultadoCandidato {
	candidatoId: string;
	votos: number;
	porcentaje: string;
}

// Tipos de Filtros
export interface FiltrosDashboard {
	municipio: string;
	genero: "masculino" | "femenino" | "otro" | "";
	rango_edad: string;
	partido: string;
}

// Tipos de Credenciales
export interface CredencialesLogin {
	cedula: string;
	password: string;
	rememberMe?: boolean;
}

// Tipos de Respuesta API
export interface RespuestaAPI<T> {
	success: boolean;
	message: string;
	data?: T;
	error?: string;
}

// Tipos de Contexto
export interface AuthContextType {
	user: Votante | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	login: (credenciales: CredencialesLogin) => Promise<void>;
	register: (datos: RegistroVotante) => Promise<void>;
	logout: () => void;
}

export interface VotingContextType {
	candidatos: Candidato[];
	hasVoted: boolean;
	loading: boolean;
	error: string | null;
	submitVote: (candidatoId: string) => Promise<void>;
	fetchCandidatos: () => Promise<void>;
}

export interface DashboardContextType {
	votingData: Voto[];
	estadisticas: EstadisticasVoto;
	loading: boolean;
	error: string | null;
	fetchVotingData: (filters?: FiltrosDashboard) => Promise<void>;
}
