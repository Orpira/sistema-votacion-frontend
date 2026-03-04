// Tipos de Simpatizante (Posible Votante)
export interface Simpatizante {
	id: string;
	nombre: string;
	apellido: string;
	cedula: string;
	email: string;
	telefono?: string;
	fechaNacimiento: Date;
	genero: "masculino" | "femenino" | "otro";
	ciudad: string;
	barrio?: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface RegistroSimpatizante {
	nombre: string;
	apellido: string;
	cedula: string;
	email: string;
	telefono?: string;
	fechaNacimiento: string;
	genero: "masculino" | "femenino" | "otro";
	ciudad: string;
	barrio?: string;
	password: string;
	confirmPassword: string;
}

// Tipos de Estadísticas de Simpatizantes
export interface EstadisticasSimpatizantes {
	total_simpatizantes: number;
	distribucion_por_ciudad: Record<string, number>;
	distribucion_por_edad: Record<string, number>;
	distribucion_por_genero: Record<string, number>;
}

export interface EstadisticaCiudad {
	ciudad: string;
	cantidad: number;
	porcentaje: string;
}

// Tipos de Filtros
export interface FiltrosDashboard {
	ciudad: string;
	genero: "masculino" | "femenino" | "otro" | "";
	rango_edad: string;
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
	user: Simpatizante | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	login: (credenciales: CredencialesLogin) => Promise<void>;
	register: (datos: RegistroSimpatizante) => Promise<void>;
	logout: () => void;
}

export interface SimpatizantesContextType {
	simpatizantes: Simpatizante[];
	loading: boolean;
	error: string | null;
	fetchSimpatizantes: () => Promise<void>;
}

export interface DashboardContextType {
	simpatizantes: Simpatizante[];
	estadisticas: EstadisticasSimpatizantes;
	loading: boolean;
	error: string | null;
	fetchSimpatizantes: (filters?: FiltrosDashboard) => Promise<void>;
}
