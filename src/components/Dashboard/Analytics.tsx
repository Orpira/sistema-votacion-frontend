import React, { useMemo } from "react";
import { EstadisticasSimpatizantes } from "../../types/index";

interface AnalyticsProps {
	stats: EstadisticasSimpatizantes;
}

interface AnalysisItem {
	label: string;
	value: string | number;
	icon: string;
	color: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ stats }) => {
	const analysis = useMemo<AnalysisItem[]>(() => {
		if (!stats.distribucion_por_ciudad) return [];

		const ciudades = Object.entries(stats.distribucion_por_ciudad);
		
		// Ciudad con mayor apoyo
		const ciudadMayorApoyo = ciudades.reduce(
			(max, [ciudad, cantidad]) => (cantidad > max.cantidad ? { ciudad, cantidad } : max),
			{ ciudad: "", cantidad: 0 },
		);

		// Ciudad con menor apoyo (oportunidad de crecimiento)
		const ciudadMenorApoyo = ciudades.reduce(
			(min, [ciudad, cantidad]) => (cantidad < min.cantidad || min.cantidad === 0 ? { ciudad, cantidad } : min),
			{ ciudad: "", cantidad: Infinity },
		);

		// Rango de edad predominante
		const edades = Object.entries(stats.distribucion_por_edad || {});
		const edadPredominante = edades.reduce(
			(max, [rango, cantidad]) => (cantidad > max.cantidad ? { rango, cantidad } : max),
			{ rango: "", cantidad: 0 },
		);

		return [
			{
				label: "Ciudad con más apoyo",
				value: ciudadMayorApoyo.ciudad ? ciudadMayorApoyo.ciudad.replace("-", " ") : "N/A",
				icon: "🏆",
				color: "#FFD700",
			},
			{
				label: "Simpatizantes en ciudad líder",
				value: ciudadMayorApoyo.cantidad.toLocaleString("es-CO"),
				icon: "👥",
				color: "#4ECDC4",
			},
			{
				label: "Oportunidad de crecimiento",
				value: ciudadMenorApoyo.ciudad ? ciudadMenorApoyo.ciudad.replace("-", " ") : "N/A",
				icon: "📈",
				color: "#FF6B6B",
			},
			{
				label: "Edad predominante",
				value: edadPredominante.rango ? `${edadPredominante.rango} años` : "N/A",
				icon: "🎯",
				color: "#45B7D1",
			},
			{
				label: "Total de ciudades",
				value: ciudades.length,
				icon: "🗺️",
				color: "#95E1D3",
			},
		];
	}, [stats]);

	// Análisis de oportunidades
	const oportunidades = useMemo(() => {
		const ciudades = Object.entries(stats.distribucion_por_ciudad || {});
		const ordenadas = [...ciudades].sort((a, b) => a[1] - b[1]);
		const ciudadesBajas = ordenadas.slice(0, 3);
		
		return ciudadesBajas.map(([ciudad, cantidad]) => ({
			ciudad: ciudad.replace("-", " "),
			cantidad,
		}));
	}, [stats.distribucion_por_ciudad]);

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
				{analysis.map((item, index) => (
					<div key={index} className="bg-white p-4 rounded shadow border-l-4" style={{ borderLeftColor: item.color }}>
						<div className="text-3xl mb-2">{item.icon}</div>
						<p className="text-xs text-gray-600 mb-1">{item.label}</p>
						<p className="text-lg font-semibold capitalize">{item.value}</p>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white p-6 rounded shadow">
					<h3 className="text-lg font-semibold mb-4">📊 Resumen de la Campaña</h3>
					<div className="space-y-4">
						<div>
							<h4 className="font-medium mb-2">Datos Generales</h4>
							<ul className="space-y-2 text-sm text-gray-700">
								<li>• Total de simpatizantes: <strong>{stats.total_simpatizantes.toLocaleString("es-CO")}</strong></li>
								<li>• Ciudades con presencia: <strong>{Object.keys(stats.distribucion_por_ciudad || {}).length}</strong></li>
								<li>• Rangos de edad: <strong>{Object.keys(stats.distribucion_por_edad || {}).length}</strong></li>
							</ul>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded shadow">
					<h3 className="text-lg font-semibold mb-4">🎯 Oportunidades de Crecimiento</h3>
					<p className="text-sm text-gray-600 mb-4">
						Ciudades donde se puede fortalecer la base de apoyo:
					</p>
					{oportunidades.length > 0 ? (
						<ul className="space-y-2 text-sm text-gray-700">
							{oportunidades.map((op, index) => (
								<li key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
									<span className="capitalize font-medium">{op.ciudad}</span>
									<span className="text-red-600 font-bold">{op.cantidad} simpatizantes</span>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500">No hay suficientes datos para el análisis</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Analytics;
