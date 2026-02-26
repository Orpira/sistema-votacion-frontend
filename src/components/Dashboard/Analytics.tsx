import React, { useMemo } from "react";
import { EstadisticasVoto } from "../../types/index";
//import "../../styles/dashboard.css";

interface AnalyticsProps {
	stats: EstadisticasVoto;
}

interface AnalysisItem {
	label: string;
	value: string | number;
	icon: string;
	color: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ stats }) => {
	const analysis = useMemo<AnalysisItem[]>(() => {
		if (!stats.votos_por_candidato) return [];

		const totalVotos = Object.values(stats.votos_por_candidato).reduce(
			(sum, votos) => sum + votos,
			0,
		);

		const candidatos = Object.entries(stats.votos_por_candidato);
		const ganador = candidatos.reduce(
			(max, [id, votos]) => (votos > max.votos ? { id, votos } : max),
			{ id: "", votos: 0 },
		);

		const promedio =
			totalVotos > 0 ? (totalVotos / candidatos.length).toFixed(0) : 0;
		const distribucionMunicipios = Object.keys(
			stats.distribucion_geografica || {},
		).length;

		const votosMayoritarios = ganador.votos > totalVotos / 2;
		const tendencia = votosMayoritarios
			? "Mayoría clara"
			: "Competencia cerrada";

		return [
			{
				label: "Candidato con más votos",
				value: ganador.id || "N/A",
				icon: "🏆",
				color: "#FFD700",
			},
			{
				label: "Votos del ganador",
				value: ganador.votos.toLocaleString("es-CO"),
				icon: "🎯",
				color: "#4ECDC4",
			},
			{
				label: "Promedio de votos",
				value: promedio.toLocaleString("es-CO"),
				icon: "📊",
				color: "#45B7D1",
			},
			{
				label: "Municipios participantes",
				value: distribucionMunicipios,
				icon: "🗺️",
				color: "#FF6B6B",
			},
			{
				label: "Tendencia electoral",
				value: tendencia,
				icon: "📈",
				color: "#95E1D3",
			},
		];
	}, [stats.votos_por_candidato, stats.distribucion_geografica]);

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
				{analysis.map((item, index) => (
					<div key={index} className="bg-white p-4 rounded shadow border-l-4" style={{ borderLeftColor: item.color }}>
						<div className="text-3xl mb-2">{item.icon}</div>
						<p className="text-xs text-gray-600 mb-1">{item.label}</p>
						<p className="text-lg font-semibold">{item.value}</p>
					</div>
				))}
			</div>

			<div className="bg-white p-6 rounded shadow">
				<h3 className="text-lg font-semibold mb-4">Análisis Detallado</h3>
				<div className="space-y-4">
					<div>
						<h4 className="font-medium mb-2">Conclusiones</h4>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>• El total de votos alcanzó: <strong>{stats.total_votos.toLocaleString("es-CO")}</strong></li>
							<li>• Participación electoral: <strong>{stats.participacion.toFixed(2)}%</strong></li>
							<li>• Se registraron votos en <strong>{Object.keys(stats.distribucion_geografica || {}).length}</strong> municipios</li>
							<li>• Número de candidatos: <strong>{Object.keys(stats.votos_por_candidato || {}).length}</strong></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
