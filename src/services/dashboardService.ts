import {
	Simpatizante,
	EstadisticasSimpatizantes,
	RespuestaAPI,
	FiltrosDashboard,
} from "../types/index";
import authService from "./authService";
import localDbService from "./localDbService";

const API_BASE_URL =
	process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const USE_LOCAL_DB = true;

class DashboardService {
	/**
	 * Obtiene todos los simpatizantes (requiere autenticación)
	 */
	async getAllSimpatizantes(filters?: FiltrosDashboard): Promise<RespuestaAPI<Simpatizante[]>> {
		if (USE_LOCAL_DB) {
			return localDbService.getAllSimpatizantes(filters);
		}

		try {
			const queryParams = new URLSearchParams();

			if (filters) {
				if (filters.ciudad)
					queryParams.append("ciudad", filters.ciudad);
				if (filters.genero) queryParams.append("genero", filters.genero);
				if (filters.rango_edad)
					queryParams.append("rango_edad", filters.rango_edad);
			}

			const url = new URL(`${API_BASE_URL}/simpatizantes`);
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
				message: "Error al obtener simpatizantes",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene estadísticas generales de simpatizantes
	 */
	async getStatistics(): Promise<RespuestaAPI<EstadisticasSimpatizantes>> {
		if (USE_LOCAL_DB) {
			return localDbService.getStatistics();
		}

		try {
			const response = await fetch(`${API_BASE_URL}/simpatizantes/statistics`, {
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
	 * Obtiene distribución de simpatizantes por ciudad
	 */
	async getSimpatizantesByCiudad(): Promise<RespuestaAPI<Record<string, number>>> {
		if (USE_LOCAL_DB) {
			return localDbService.getSimpatizantesByCiudad();
		}

		try {
			const response = await fetch(`${API_BASE_URL}/simpatizantes/by-ciudad`, {
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
				message: "Error al obtener simpatizantes por ciudad",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene distribución de simpatizantes por rango de edad
	 */
	async getSimpatizantesByEdad(): Promise<RespuestaAPI<Record<string, number>>> {
		if (USE_LOCAL_DB) {
			return localDbService.getSimpatizantesByEdad();
		}

		try {
			const response = await fetch(`${API_BASE_URL}/simpatizantes/by-edad`, {
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
				message: "Error al obtener simpatizantes por rango de edad",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Exporta los datos de simpatizantes a CSV
	 */
	async exportSimpatizantesAsCSV(): Promise<Blob | null> {
		try {
			const response = await fetch(`${API_BASE_URL}/simpatizantes/export/csv`, {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.blob();
		} catch (error) {
			console.error("Error al exportar simpatizantes:", error);
			return null;
		}
	}

	/**
	 * Exporta los datos de simpatizantes a PDF
	 */
	async exportSimpatizantesAsPDF(): Promise<Blob | null> {
		try {
			const response = await fetch(`${API_BASE_URL}/simpatizantes/export/pdf`, {
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.blob();
		} catch (error) {
			console.error("Error al exportar simpatizantes:", error);
			return null;
		}
	}
}

export default new DashboardService();
