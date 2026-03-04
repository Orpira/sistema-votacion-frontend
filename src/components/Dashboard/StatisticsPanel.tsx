import React, { useMemo } from "react";
import { EstadisticasSimpatizantes, EstadisticaCiudad } from "../../types/index";

interface StatisticsPanelProps {
  stats: EstadisticasSimpatizantes;
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const getColorForIndex = (index: number): string => COLORS[index % COLORS.length];

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ stats }) => {
  const cityStats = useMemo<EstadisticaCiudad[]>(() => {
    if (!stats.distribucion_por_ciudad) return [];

    const total = Object.values(stats.distribucion_por_ciudad).reduce((sum, cantidad) => sum + cantidad, 0);

    return Object.entries(stats.distribucion_por_ciudad)
      .map(([ciudad, cantidad]) => ({
        ciudad,
        cantidad,
        porcentaje: total > 0 ? ((cantidad / total) * 100).toFixed(2) : "0",
      }))
      .sort((a, b) => b.cantidad - a.cantidad);
  }, [stats.distribucion_por_ciudad]);

  const ageStats = useMemo(() => {
    if (!stats.distribucion_por_edad) return [];
    const total = Object.values(stats.distribucion_por_edad).reduce((sum, cantidad) => sum + cantidad, 0);
    return Object.entries(stats.distribucion_por_edad)
      .map(([rango, cantidad]) => ({
        rango,
        cantidad,
        porcentaje: total > 0 ? ((cantidad / total) * 100).toFixed(2) : "0",
      }))
      .sort((a, b) => {
        const order = ["18-25", "26-35", "36-45", "46-55", "56+"];
        return order.indexOf(a.rango) - order.indexOf(b.rango);
      });
  }, [stats.distribucion_por_edad]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl">👥</div>
          <div>
            <h4 className="text-sm text-gray-500">Total Simpatizantes</h4>
            <div className="text-xl font-semibold">{stats.total_simpatizantes.toLocaleString("es-CO")}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl">🏙️</div>
          <div>
            <h4 className="text-sm text-gray-500">Ciudades</h4>
            <div className="text-xl font-semibold">{Object.keys(stats.distribucion_por_ciudad || {}).length}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl">📊</div>
          <div>
            <h4 className="text-sm text-gray-500">Rangos de Edad</h4>
            <div className="text-xl font-semibold">{Object.keys(stats.distribucion_por_edad || {}).length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Simpatizantes por Ciudad</h3>
          <div className="space-y-3">
            {cityStats.length > 0 ? (
              cityStats.map((city, index) => (
                <div key={city.ciudad} className="flex items-center gap-4">
                  <div className="w-8 text-sm text-gray-600">{index + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium capitalize">{city.ciudad.replace("-", " ")}</div>
                      <div className="text-sm text-gray-600">{city.cantidad} simpatizantes</div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded mt-2 overflow-hidden">
                      <div style={{ width: `${city.porcentaje}%`, backgroundColor: getColorForIndex(index) }} className="h-full"></div>
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm text-gray-600">{city.porcentaje}%</div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Sin datos disponibles</p>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Distribución por Edad</h3>
          <div className="space-y-3">
            {ageStats.length > 0 ? (
              ageStats.map((age, index) => (
                <div key={age.rango} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600">{age.rango} años</div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded overflow-hidden">
                      <div style={{ width: `${age.porcentaje}%`, backgroundColor: getColorForIndex(index) }} className="h-full"></div>
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm text-gray-600">{age.cantidad} ({age.porcentaje}%)</div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Sin datos disponibles</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
