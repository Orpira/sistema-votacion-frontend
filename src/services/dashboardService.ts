import {
	Voto,
	EstadisticasVoto,
	RespuestaAPI,
	FiltrosDashboard,
} from "../types/index";
import authService from "./authService";
import localDbService from "./localDbService";

const API_BASE_URL =
	process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const USE_LOCAL_DB = true;

class DashboardService {
	async resetLocalData(): Promise<RespuestaAPI<null>> {
		if (USE_LOCAL_DB) {
			return localDbService.resetSimulationData();
		}

		return {
			success: false,
			message: "Operación no disponible",
			error: "El reinicio local solo está disponible en modo simulación",
		};
	}

	/**
	 * Obtiene todos los votos (requiere autenticación)
	 */
	async getAllVotes(filters?: FiltrosDashboard): Promise<RespuestaAPI<Voto[]>> {
		if (USE_LOCAL_DB) {
			return localDbService.getAllVotes(filters);
		}

		try {
			const queryParams = new URLSearchParams();

			if (filters) {
				if (filters.municipio)
					queryParams.append("municipio", filters.municipio);
				if (filters.genero) queryParams.append("genero", filters.genero);
				if (filters.rango_edad)
					queryParams.append("rango_edad", filters.rango_edad);
				if (filters.partido) queryParams.append("partido", filters.partido);
			}

			const url = new URL(`${API_BASE_URL}/votes`);
			url.search = queryParams.toString();

			const response = await fetch(url.toString(), {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al obtener votos",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene estadísticas generales de votación
	 */
	async getStatistics(): Promise<RespuestaAPI<EstadisticasVoto>> {
		if (USE_LOCAL_DB) {
			return localDbService.getStatistics();
		}

		try {
			const response = await fetch(`${API_BASE_URL}/votes/statistics`, {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al obtener estadísticas",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene distribución de votos por municipio
	 */
	async getVotesByMunicipios(): Promise<RespuestaAPI<Record<string, number>>> {
		if (USE_LOCAL_DB) {
			return localDbService.getVotesByMunicipios();
		}

		try {
			const response = await fetch(`${API_BASE_URL}/votes/by-municipios`, {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al obtener votos por municipio",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene distribución de votos por candidato
	 */
	async getVotesByCandidatos(): Promise<RespuestaAPI<Record<string, number>>> {
		if (USE_LOCAL_DB) {
			return localDbService.getVotesByCandidatos();
		}

		try {
			const response = await fetch(`${API_BASE_URL}/votes/by-candidatos`, {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al obtener votos por candidato",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene distribución de votos por género
	 */
	async getVotesByGender(): Promise<RespuestaAPI<Record<string, number>>> {
		try {
			const response = await fetch(`${API_BASE_URL}/votes/by-gender`, {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al obtener votos por género",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene distribución de votos por rango de edad
	 */
	async getVotesByAgeRange(): Promise<RespuestaAPI<Record<string, number>>> {
		try {
			const response = await fetch(`${API_BASE_URL}/votes/by-age-range`, {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al obtener votos por rango de edad",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Exporta los datos de votación a CSV
	 */
	async exportVotesAsCSV(): Promise<Blob | null> {
		try {
			const response = await fetch(`${API_BASE_URL}/votes/export/csv`, {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.blob();
		} catch (error) {
			console.error("Error al exportar votos:", error);
			return null;
		}
	}

	/**
	 * Exporta los datos de votación a PDF
	 */
	async exportVotesAsPDF(): Promise<Blob | null> {
		try {
			const response = await fetch(`${API_BASE_URL}/votes/export/pdf`, {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.blob();
		} catch (error) {
			console.error("Error al exportar votos:", error);
			return null;
		}
	}
}

export default new DashboardService();
