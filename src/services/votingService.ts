import { Candidato, Voto, RespuestaAPI } from "../types/index";
import authService from "./authService";
import localDbService from "./localDbService";

const API_BASE_URL =
	process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const USE_LOCAL_DB = true;

class VotingService {
	/**
	 * Obtiene la lista de candidatos disponibles
	 */
	async getCandidatos(): Promise<RespuestaAPI<Candidato[]>> {
		if (USE_LOCAL_DB) {
			return localDbService.getCandidatos();
		}

		try {
			const response = await fetch(`${API_BASE_URL}/candidates`, {
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
				message: "Error al obtener candidatos",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene un candidato específico por ID
	 */
	async getCandidatoById(id: string): Promise<RespuestaAPI<Candidato>> {
		try {
			const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
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
				message: "Error al obtener candidato",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Registra un voto para un candidato
	 */
	async submitVote(candidatoId: string): Promise<RespuestaAPI<Voto>> {
		if (USE_LOCAL_DB) {
			return localDbService.submitVote(candidatoId, {
				navegador: navigator.userAgent,
				dispositivo: this.getDeviceInfo(),
			});
		}

		try {
			const response = await fetch(`${API_BASE_URL}/votes`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authService.getToken()}`,
				},
				body: JSON.stringify({
					candidato_id: candidatoId,
					metadata: {
						navegador: navigator.userAgent,
						dispositivo: this.getDeviceInfo(),
					},
				}),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			return {
				success: false,
				message: "Error al registrar voto",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Verifica si el usuario actual ya ha votado
	 */
	async checkUserVoteStatus(): Promise<RespuestaAPI<{ hasVoted: boolean }>> {
		if (USE_LOCAL_DB) {
			return localDbService.checkUserVoteStatus();
		}

		try {
			const response = await fetch(`${API_BASE_URL}/votes/status`, {
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
				message: "Error al verificar estado del voto",
				error: error instanceof Error ? error.message : "Error desconocido",
			};
		}
	}

	/**
	 * Obtiene información del dispositivo
	 */
	private getDeviceInfo(): string {
		const userAgent = navigator.userAgent;
		let device = "Desconocido";

		if (/mobile/i.test(userAgent)) {
			device = "Móvil";
		} else if (/tablet/i.test(userAgent)) {
			device = "Tablet";
		} else {
			device = "Escritorio";
		}

		return device;
	}
}

export default new VotingService();
